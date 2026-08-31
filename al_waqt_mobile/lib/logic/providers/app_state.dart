import 'dart:async';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/utils/qibla_calculator.dart';
import '../../data/models/city_model.dart';
import '../../data/models/prayer_schedule_model.dart';
import '../../data/models/quran_verse_model.dart';
import '../../data/datasources/prayer_api_service.dart';
import '../../data/datasources/quran_verses_data.dart';
import '../services/audio_service.dart';

class AppState extends ChangeNotifier {
  DateTime _currentTime = DateTime.now();
  bool _is24Hour = true;
  bool _isArabicNumerals = false;
  bool _isSmooth = true;
  bool _audioEnabled = true;
  bool _isDarkMode = false;
  String _selectedAdzanId = 'makkah';

  CityModel _selectedCity = CityModel.defaultCity;
  List<CityModel> _allCities = [];
  PrayerScheduleModel? _prayerSchedule;
  Map<String, dynamic>? _hijriData;
  QuranVerseModel? _currentVerse;

  String _nextPrayerName = '-';
  String _nextPrayerTimeRemaining = '--:--:--';
  double _qiblaBearing = 295.14;
  int _distanceToKaaba = 7925;
  bool _isPlayingAdzan = false;
  String _adzanBannerTitle = '';

  Timer? _clockTimer;
  Timer? _prayerCheckTimer;

  // Getters
  DateTime get currentTime => _currentTime;
  bool get is24Hour => _is24Hour;
  bool get isArabicNumerals => _isArabicNumerals;
  bool get isSmooth => _isSmooth;
  bool get audioEnabled => _audioEnabled;
  bool get isDarkMode => _isDarkMode;
  String get selectedAdzanId => _selectedAdzanId;
  CityModel get selectedCity => _selectedCity;
  List<CityModel> get allCities => _allCities;
  PrayerScheduleModel? get prayerSchedule => _prayerSchedule;
  Map<String, dynamic>? get hijriData => _hijriData;
  QuranVerseModel? get currentVerse => _currentVerse;
  String get nextPrayerName => _nextPrayerName;
  String get nextPrayerTimeRemaining => _nextPrayerTimeRemaining;
  double get qiblaBearing => _qiblaBearing;
  int get distanceToKaaba => _distanceToKaaba;
  bool get isPlayingAdzan => _isPlayingAdzan;
  String get adzanBannerTitle => _adzanBannerTitle;

  AdzanOption get currentAdzanOption =>
      AudioService.adzanOptions.firstWhere(
        (a) => a.id == _selectedAdzanId,
        orElse: () => AudioService.adzanOptions.first,
      );

  AppState() {
    _init();
  }

  Future<void> _init() async {
    await _loadPreferences();
    _currentVerse = QuranVersesData.getDailyVerse(DateTime.now());
    _updateQiblaCalculations();

    _clockTimer = Timer.periodic(const Duration(milliseconds: 50), (_) {
      _currentTime = DateTime.now();
      _calculateNextPrayer();
      notifyListeners();
    });

    _prayerCheckTimer = Timer.periodic(const Duration(seconds: 1), (_) {
      _checkAdzanTrigger();
    });

    await fetchPrayerData();
  }

  Future<void> _loadPreferences() async {
    final prefs = await SharedPreferences.getInstance();
    _is24Hour = prefs.getBool('clock_format_24') ?? true;
    _isArabicNumerals = prefs.getBool('clock_arabic_num') ?? false;
    _isSmooth = prefs.getBool('clock_smooth') ?? true;
    _audioEnabled = prefs.getBool('clock_audio') ?? true;
    _isDarkMode = prefs.getBool('clock_dark_mode') ?? false;
    _selectedAdzanId = prefs.getString('clock_adzan_choice') ?? 'makkah';

    final savedCity = prefs.getString('clock_city');
    if (savedCity != null) {
      try {
        _selectedCity = CityModel.fromJson(json.decode(savedCity));
      } catch (_) {}
    }
    notifyListeners();
  }

  Future<void> fetchPrayerData() async {
    _prayerSchedule = await PrayerApiService.fetchPrayerSchedule(_selectedCity.id, DateTime.now());
    _hijriData = await PrayerApiService.fetchHijriDate(DateTime.now());
    _allCities = await PrayerApiService.fetchAllCities();
    _calculateNextPrayer();
    notifyListeners();
  }

  void _updateQiblaCalculations() {
    final lat = _selectedCity.latitude ?? -6.2088;
    final lng = _selectedCity.longitude ?? 106.8456;
    _qiblaBearing = QiblaCalculator.calculateQiblaBearing(lat, lng);
    _distanceToKaaba = QiblaCalculator.calculateDistanceToKaaba(lat, lng);
  }

  void setCustomCoordinates(double lat, double lng, String locationName) {
    _qiblaBearing = QiblaCalculator.calculateQiblaBearing(lat, lng);
    _distanceToKaaba = QiblaCalculator.calculateDistanceToKaaba(lat, lng);
    notifyListeners();
  }

  void toggleTheme() {
    _isDarkMode = !_isDarkMode;
    SharedPreferences.getInstance().then((p) => p.setBool('clock_dark_mode', _isDarkMode));
    notifyListeners();
  }

  void set24HourFormat(bool val) {
    _is24Hour = val;
    SharedPreferences.getInstance().then((p) => p.setBool('clock_format_24', val));
    notifyListeners();
  }

  void setArabicNumerals(bool val) {
    _isArabicNumerals = val;
    SharedPreferences.getInstance().then((p) => p.setBool('clock_arabic_num', val));
    notifyListeners();
  }

  void setSmoothHands(bool val) {
    _isSmooth = val;
    SharedPreferences.getInstance().then((p) => p.setBool('clock_smooth', val));
    notifyListeners();
  }

  void toggleAudio() {
    _audioEnabled = !_audioEnabled;
    if (!_audioEnabled) stopAdzan();
    SharedPreferences.getInstance().then((p) => p.setBool('clock_audio', _audioEnabled));
    notifyListeners();
  }

  void setAdzanOption(String id) {
    _selectedAdzanId = id;
    SharedPreferences.getInstance().then((p) => p.setString('clock_adzan_choice', id));
    notifyListeners();
  }

  void selectCity(CityModel city) {
    _selectedCity = city;
    _updateQiblaCalculations();
    SharedPreferences.getInstance().then((p) => p.setString('clock_city', json.encode(city.toJson())));
    fetchPrayerData();
    notifyListeners();
  }

  void shuffleVerse() {
    final curIdx = QuranVersesData.dailyVerses.indexOf(_currentVerse ?? QuranVersesData.dailyVerses.first);
    final nextIdx = (curIdx + 1) % QuranVersesData.dailyVerses.length;
    _currentVerse = QuranVersesData.dailyVerses[nextIdx];
    notifyListeners();
  }

  void _calculateNextPrayer() {
    if (_prayerSchedule == null) return;
    final now = _currentTime;
    final times = _prayerSchedule!.prayerTimesMap;

    final prayerOrder = ['imsak', 'subuh', 'terbit', 'dhuha', 'dzuhur', 'ashar', 'maghrib', 'isya'];
    final prayerNamesDisplay = {
      'imsak': 'Imsak',
      'subuh': 'Subuh',
      'terbit': 'Terbit',
      'dhuha': 'Dhuha',
      'dzuhur': 'Dzuhur',
      'ashar': 'Ashar',
      'maghrib': 'Maghrib',
      'isya': 'Isya',
    };

    DateTime? nextTime;
    String nextName = '';

    for (final p in prayerOrder) {
      final timeStr = times[p];
      if (timeStr == null || !timeStr.contains(':')) continue;
      final parts = timeStr.split(':');
      final h = int.tryParse(parts[0]) ?? 0;
      final m = int.tryParse(parts[1]) ?? 0;
      final pDate = DateTime(now.year, now.month, now.day, h, m);

      if (pDate.isAfter(now)) {
        nextTime = pDate;
        nextName = prayerNamesDisplay[p] ?? p;
        break;
      }
    }

    if (nextTime == null) {
      // Next day Imsak
      final imsakStr = times['imsak'] ?? '04:30';
      final parts = imsakStr.split(':');
      final h = int.tryParse(parts[0]) ?? 4;
      final m = int.tryParse(parts[1]) ?? 30;
      nextTime = DateTime(now.year, now.month, now.day + 1, h, m);
      nextName = 'Imsak Besok';
    }

    final diff = nextTime.difference(now);
    final hours = diff.inHours.toString().padLeft(2, '0');
    final mins = (diff.inMinutes % 60).toString().padLeft(2, '0');
    final secs = (diff.inSeconds % 60).toString().padLeft(2, '0');

    _nextPrayerName = nextName;
    _nextPrayerTimeRemaining = '$hours:$mins:$secs';
  }

  String _lastTriggeredPrayer = '';

  void _checkAdzanTrigger() {
    if (!_audioEnabled || _prayerSchedule == null) return;
    final now = _currentTime;
    final currentH = now.hour.toString().padLeft(2, '0');
    final currentM = now.minute.toString().padLeft(2, '0');
    final currentTimeStr = '$currentH:$currentM';

    final prayers = {
      'Subuh': _prayerSchedule!.subuh,
      'Dzuhur': _prayerSchedule!.dzuhur,
      'Ashar': _prayerSchedule!.ashar,
      'Maghrib': _prayerSchedule!.maghrib,
      'Isya': _prayerSchedule!.isya,
    };

    prayers.forEach((name, time) {
      if (time == currentTimeStr && now.second == 0 && _lastTriggeredPrayer != '$name-$currentTimeStr') {
        _lastTriggeredPrayer = '$name-$currentTimeStr';
        playAdzan(name);
      }
    });
  }

  void playAdzan(String prayerName) {
    _isPlayingAdzan = true;
    _adzanBannerTitle = 'Adzan $prayerName';
    notifyListeners();

    String asset = currentAdzanOption.assetPath;
    if (prayerName.toLowerCase().contains('subuh')) {
      asset = AudioService.subuhSpecialAdzan.assetPath;
    }

    AudioService.playAdzan(asset, onComplete: () {
      _isPlayingAdzan = false;
      notifyListeners();
    });
  }

  void stopAdzan() {
    AudioService.stopAdzan();
    _isPlayingAdzan = false;
    notifyListeners();
  }

  @override
  void dispose() {
    _clockTimer?.cancel();
    _prayerCheckTimer?.cancel();
    super.dispose();
  }
}
