import '../constants/arabic_constants.dart';

class HijriCalculator {
  static const List<String> indonesianMonths = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  static Map<String, dynamic> calculateEventsCountdown({
    required int currentHijriDay,
    required int currentHijriMonth,
    required int currentHijriYear,
    DateTime? now,
  }) {
    final nowDate = now ?? DateTime.now();

    int getDaysUntil(int targetMonth, int targetDay) {
      int total = 0;
      int curM = currentHijriMonth;
      int curD = currentHijriDay;

      if (curM == targetMonth && curD <= targetDay) {
        return targetDay - curD;
      }

      final daysInCurMonth = ArabicConstants.hijriMonthDays[curM - 1];
      total += (daysInCurMonth - curD).clamp(0, 30);

      curM = (curM % 12) + 1;

      while (curM != targetMonth) {
        total += ArabicConstants.hijriMonthDays[curM - 1];
        curM = (curM % 12) + 1;
      }

      total += targetDay;
      return total;
    }

    final daysToRamadhan = getDaysUntil(9, 1);
    final daysToIdulFitri = getDaysUntil(10, 1);

    final targetRamadhanDate = nowDate.add(Duration(days: daysToRamadhan));
    final targetIdulFitriDate = nowDate.add(Duration(days: daysToIdulFitri));

    final ramadhanMasehiStr =
        '${targetRamadhanDate.day} ${indonesianMonths[targetRamadhanDate.month - 1]} ${targetRamadhanDate.year} M';
    final idulFitriMasehiStr =
        '${targetIdulFitriDate.day} ${indonesianMonths[targetIdulFitriDate.month - 1]} ${targetIdulFitriDate.year} M';

    return {
      'daysToRamadhan': daysToRamadhan,
      'ramadhanMasehi': ramadhanMasehiStr,
      'daysToIdulFitri': daysToIdulFitri,
      'idulFitriMasehi': idulFitriMasehiStr,
      'hijriYear': currentHijriYear,
    };
  }

  static const List<String> indonesianDays = [
    'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'
  ];

  static String formatMasehiDate(DateTime date) {
    final dayName = indonesianDays[date.weekday - 1];
    final monthName = indonesianMonths[date.month - 1];
    return '$dayName, ${date.day} $monthName ${date.year} M';
  }
}

