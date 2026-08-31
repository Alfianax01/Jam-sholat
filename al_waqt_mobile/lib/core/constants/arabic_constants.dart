class ArabicConstants {
  static const List<String> arabicDigits = [
    '٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'
  ];

  static const List<String> hijriMonthNames = [
    'Muharram', 'Safar', 'Rabiul Awwal', 'Rabiul Akhir',
    'Jumadil Awwal', 'Jumadil Akhir', 'Rajab', 'Syaban',
    'Ramadhan', 'Syawal', 'Dzulqadah', 'Dzulhijjah'
  ];

  static const List<int> hijriMonthDays = [
    30, 29, 30, 29, 30, 29, 30, 29, 30, 29, 30, 29
  ];

  static String toArabicDigits(String input) {
    return input.split('').map((char) {
      final d = int.tryParse(char);
      return d != null ? arabicDigits[d] : char;
    }).join('');
  }
}

