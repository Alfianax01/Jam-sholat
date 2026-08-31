import 'package:audioplayers/audioplayers.dart';

class AdzanOption {
  final String id;
  final String name;
  final String muazzin;
  final String assetPath;
  final String tag;

  AdzanOption({
    required this.id,
    required this.name,
    required this.muazzin,
    required this.assetPath,
    required this.tag,
  });
}

class AudioService {
  static final AudioPlayer _player = AudioPlayer();
  static bool _isPlaying = false;

  static final List<AdzanOption> adzanOptions = [
    AdzanOption(
      id: 'makkah',
      name: 'Adzan Makkah Al-Mukarramah',
      muazzin: 'Syaikh Ali Ahmad Mulla',
      assetPath: 'audio/adzan-makkah.mp3',
      tag: 'Makkah',
    ),
    AdzanOption(
      id: 'madinah',
      name: 'Adzan Madinah Al-Munawwarah',
      muazzin: 'Syaikh Abdul Majeed Surayhi',
      assetPath: 'audio/adzan-madinah.mp3',
      tag: 'Madinah',
    ),
    AdzanOption(
      id: 'mesir',
      name: 'Adzan Mesir (Maqam Bayati)',
      muazzin: 'Syaikh Muhammad Rifat',
      assetPath: 'audio/adzan-mesir.mp3',
      tag: 'Mesir',
    ),
    AdzanOption(
      id: 'turki',
      name: 'Adzan Istanbul Turki (Ussak)',
      muazzin: 'Muazin Masjid Biru (Sultanahmet)',
      assetPath: 'audio/adzan-turki.mp3',
      tag: 'Turki',
    ),
  ];

  static final AdzanOption subuhSpecialAdzan = AdzanOption(
    id: 'subuh',
    name: 'Adzan Khusus Subuh (Tatswib)',
    muazzin: 'Syaikh Mishary Rashid Alafasy',
    assetPath: 'audio/adzan-subuh.mp3',
    tag: 'Tatswib Subuh (الصلاة خير من النوم)',
  );

  static bool get isPlaying => _isPlaying;

  static Future<void> playAdzan(String assetPath, {Function()? onComplete}) async {
    try {
      await _player.stop();
      _isPlaying = true;
      await _player.play(AssetSource(assetPath));
      _player.onPlayerComplete.listen((_) {
        _isPlaying = false;
        if (onComplete != null) onComplete();
      });
    } catch (e) {
      _isPlaying = false;
    }
  }

  static Future<void> stopAdzan() async {
    try {
      await _player.stop();
      _isPlaying = false;
    } catch (_) {}
  }
}

