import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../logic/providers/app_state.dart';

class PrayerGridCard extends StatelessWidget {
  final AppState state;

  const PrayerGridCard({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final isDark = state.isDarkMode;
    final schedule = state.prayerSchedule;

    final prayers = [
      {'key': 'imsak', 'name': 'Imsak', 'arabic': 'الإمساك', 'icon': Icons.nights_stay_outlined},
      {'key': 'subuh', 'name': 'Subuh', 'arabic': 'الفجر', 'icon': Icons.wb_twilight},
      {'key': 'terbit', 'name': 'Terbit', 'arabic': 'الشروق', 'icon': Icons.wb_sunny_outlined},
      {'key': 'dhuha', 'name': 'Dhuha', 'arabic': 'الضحى', 'icon': Icons.light_mode_outlined},
      {'key': 'dzuhur', 'name': 'Dzuhur', 'arabic': 'الظهر', 'icon': Icons.wb_sunny},
      {'key': 'ashar', 'name': 'Ashar', 'arabic': 'العصر', 'icon': Icons.filter_drama_outlined},
      {'key': 'maghrib', 'name': 'Maghrib', 'arabic': 'المغرب', 'icon': Icons.wb_twilight},
      {'key': 'isya', 'name': 'Isya', 'arabic': 'العشاء', 'icon': Icons.nightlight_outlined},
    ];

    final times = schedule?.prayerTimesMap ?? {};

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.lightBorder,
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Header Row
          Row(
            children: [
              Container(
                width: 34,
                height: 34,
                decoration: BoxDecoration(
                  color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: const Icon(Icons.mosque, color: AppColors.emeraldPrimary, size: 18),
              ),
              const SizedBox(width: 8),
              const Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'KEMENAG RI',
                      style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: AppColors.emeraldPrimary),
                      overflow: TextOverflow.ellipsis,
                    ),
                    Text(
                      'Jadwal Sholat Hari Ini',
                      style: TextStyle(fontSize: 13, fontWeight: FontWeight.bold),
                      overflow: TextOverflow.ellipsis,
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 8),
              // Next Prayer Countdown Pill
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
                decoration: BoxDecoration(
                  color: AppColors.emeraldPrimary,
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      state.nextPrayerName,
                      style: const TextStyle(fontSize: 8, fontWeight: FontWeight.w700, color: Colors.white70),
                    ),
                    Text(
                      state.nextPrayerTimeRemaining,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.w900, color: Colors.white),
                    ),
                  ],
                ),
              ),
            ],
          ),

          const SizedBox(height: 14),

          // 8-Prayer Grid
          GridView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 4,
              crossAxisSpacing: 7,
              mainAxisSpacing: 7,
              childAspectRatio: 0.78,
            ),
            itemCount: prayers.length,
            itemBuilder: (context, idx) {
              final p = prayers[idx];
              final pKey = p['key'] as String;
              final pName = p['name'] as String;
              final pArabic = p['arabic'] as String;
              final pIcon = p['icon'] as IconData;
              final timeVal = times[pKey] ?? '--:--';

              final isNext = state.nextPrayerName.toLowerCase() == pName.toLowerCase();

              return Container(
                padding: const EdgeInsets.symmetric(vertical: 6, horizontal: 2),
                decoration: BoxDecoration(
                  color: isNext
                      ? AppColors.emeraldPrimary.withValues(alpha: 0.15)
                      : (isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox),
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(
                    color: isNext
                        ? AppColors.emeraldPrimary
                        : (isDark ? AppColors.darkBorder : AppColors.lightBorder),
                    width: isNext ? 1.8 : 1.0,
                  ),
                ),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Icon(
                      pIcon,
                      size: 16,
                      color: isNext ? AppColors.emeraldPrimary : AppColors.goldPrimary,
                    ),
                    const SizedBox(height: 2),
                    Text(
                      pArabic,
                      style: TextStyle(
                        fontSize: 9,
                        fontFamily: 'serif',
                        color: isNext ? AppColors.emeraldPrimary : (isDark ? Colors.white60 : Colors.black54),
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    Text(
                      pName,
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                        color: isNext ? AppColors.emeraldPrimary : null,
                      ),
                      overflow: TextOverflow.ellipsis,
                    ),
                    const SizedBox(height: 3),
                    FittedBox(
                      fit: BoxFit.scaleDown,
                      child: Text(
                        timeVal,
                        style: TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w900,
                          color: isNext
                              ? AppColors.emeraldPrimary
                              : (isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary),
                        ),
                      ),
                    ),
                  ],
                ),
              );
            },
          ),
        ],
      ),
    );
  }
}
