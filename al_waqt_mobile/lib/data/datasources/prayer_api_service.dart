import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/prayer_schedule_model.dart';
import '../models/city_model.dart';

class PrayerApiService {
  static const String baseUrl = 'https://api.myquran.com/v2';

  static Future<List<CityModel>> fetchAllCities() async {
    try {
      final response = await http.get(Uri.parse('$baseUrl/sholat/kota/semua')).timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['status'] == true && data['data'] is List) {
          return (data['data'] as List).map((c) => CityModel.fromJson(c)).toList();
        }
      }
    } catch (e) {
      // Fallback
    }
    return [];
  }

  static Future<PrayerScheduleModel?> fetchPrayerSchedule(String cityId, DateTime date) async {
    try {
      final y = date.year;
      final m = date.month.toString().padLeft(2, '0');
      final d = date.day.toString().padLeft(2, '0');
      final url = '$baseUrl/sholat/jadwal/$cityId/$y/$m/$d';

      final response = await http.get(Uri.parse(url)).timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['status'] == true && data['data'] != null && data['data']['jadwal'] != null) {
          return PrayerScheduleModel.fromJson(data['data']['jadwal']);
        }
      }
    } catch (e) {
      // Fallback
    }
    return null;
  }

  static Future<Map<String, dynamic>?> fetchHijriDate(DateTime date) async {
    try {
      final y = date.year;
      final m = date.month.toString().padLeft(2, '0');
      final d = date.day.toString().padLeft(2, '0');
      final url = '$baseUrl/cal/hijr/?adj=-1&date=$y-$m-$d';

      final response = await http.get(Uri.parse(url)).timeout(const Duration(seconds: 10));
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        if (data['status'] == true && data['data'] != null && data['data']['date'] is List && data['data']['date'].length >= 2) {
          final hijriStr = data['data']['date'][1]; // e.g. "16-02-1448"
          final parts = hijriStr.split('-');
          if (parts.length >= 3) {
            return {
              'day': int.tryParse(parts[0]) ?? 16,
              'month': int.tryParse(parts[1]) ?? 2,
              'year': int.tryParse(parts[2]) ?? 1448,
              'formatted': '$hijriStr H',
            };
          }
        }
      }
    } catch (e) {
      // Fallback
    }
    return null;
  }
}

