import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/arabic_constants.dart';
import '../../core/utils/hijri_calculator.dart';
import '../../logic/providers/app_state.dart';

class EventCountdownCard extends StatelessWidget {
  final AppState state;

  const EventCountdownCard({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final hijriDay = state.hijriData != null ? state.hijriData!['day'] as int : 16;
    final hijriMonth = state.hijriData != null ? state.hijriData!['month'] as int : 3;
    final hijriYear = state.hijriData != null ? state.hijriData!['year'] as int : 1448;

    final events = HijriCalculator.calculateEventsCountdown(
      currentHijriDay: hijriDay,
      currentHijriMonth: hijriMonth,
      currentHijriYear: hijriYear,
      now: state.currentTime,
    );

    final daysToRamadhan = events['daysToRamadhan'] as int;
    final ramadhanMasehi = events['ramadhanMasehi'] as String;
    final daysToIdulFitri = events['daysToIdulFitri'] as int;
    final idulFitriMasehi = events['idulFitriMasehi'] as String;

    final isDark = state.isDarkMode;

    return Column(
      children: [
        // 1 Ramadhan Card
        _buildMilestoneCard(
          tag: 'BULAN SUCI',
          title: '1 Ramadhan $hijriYear H',
          masehiDate: ramadhanMasehi,
          daysCount: daysToRamadhan,
          isArabicNumerals: state.isArabicNumerals,
          icon: Icons.nightlight_round,
          cardColor: isDark ? const Color(0xFF0F291C) : const Color(0xFFE9F5EF),
          accentColor: AppColors.emeraldPrimary,
          isDark: isDark,
        ),

        const SizedBox(height: 10),

        // 1 Syawal Idul Fitri Card
        _buildMilestoneCard(
          tag: 'HARI RAYA',
          title: 'Idul Fitri (1 Syawal $hijriYear H)',
          masehiDate: idulFitriMasehi,
          daysCount: daysToIdulFitri,
          isArabicNumerals: state.isArabicNumerals,
          icon: Icons.star_border,
          cardColor: isDark ? const Color(0xFF262011) : const Color(0xFFFDF7E7),
          accentColor: AppColors.goldDeep,
          isDark: isDark,
        ),
      ],
    );
  }

  Widget _buildMilestoneCard({
    required String tag,
    required String title,
    required String masehiDate,
    required int daysCount,
    required bool isArabicNumerals,
    required IconData icon,
    required Color cardColor,
    required Color accentColor,
    required bool isDark,
  }) {
    final daysStr = isArabicNumerals
        ? ArabicConstants.toArabicDigits(daysCount.toString())
        : daysCount.toString();

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 14),
      decoration: BoxDecoration(
        color: cardColor,
        borderRadius: BorderRadius.circular(18),
        border: Border.all(
          color: accentColor.withValues(alpha: 0.35),
          width: 1.5,
        ),
      ),
      child: Row(
        children: [
          Container(
            width: 44,
            height: 44,
            decoration: BoxDecoration(
              color: accentColor,
              borderRadius: BorderRadius.circular(12),
              boxShadow: [
                BoxShadow(
                  color: accentColor.withValues(alpha: 0.3),
                  blurRadius: 10,
                  offset: const Offset(0, 3),
                ),
              ],
            ),
            child: Icon(icon, color: Colors.white, size: 22),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  tag,
                  style: TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.w800,
                    letterSpacing: 0.8,
                    color: accentColor,
                  ),
                ),
                const SizedBox(height: 1),
                Text(
                  title,
                  style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 2),
                Row(
                  children: [
                    Icon(Icons.calendar_today_outlined, size: 12, color: accentColor),
                    const SizedBox(width: 4),
                    Text(
                      'Estimasi: ~$masehiDate',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted,
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkCardBg : Colors.white,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: accentColor.withValues(alpha: 0.3)),
            ),
            child: Column(
              children: [
                Text(
                  daysStr,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w900,
                    color: accentColor,
                  ),
                ),
                const Text(
                  'HARI LAGI',
                  style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: Colors.grey),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

