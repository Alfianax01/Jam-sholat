import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/arabic_constants.dart';
import '../../core/utils/hijri_calculator.dart';
import '../../logic/providers/app_state.dart';

class DigitalClockCard extends StatelessWidget {
  final AppState state;

  const DigitalClockCard({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final isDark = state.isDarkMode;
    final now = state.currentTime;

    int hourVal = now.hour;
    String period = '24H';
    if (!state.is24Hour) {
      period = hourVal >= 12 ? 'PM' : 'AM';
      hourVal = hourVal % 12;
      if (hourVal == 0) hourVal = 12;
    }

    String hoursStr = hourVal.toString().padLeft(2, '0');
    String minutesStr = now.minute.toString().padLeft(2, '0');
    String secondsStr = now.second.toString().padLeft(2, '0');

    if (state.isArabicNumerals) {
      hoursStr = ArabicConstants.toArabicDigits(hoursStr);
      minutesStr = ArabicConstants.toArabicDigits(minutesStr);
      secondsStr = ArabicConstants.toArabicDigits(secondsStr);
    }

    final hijriStr = state.hijriData != null
        ? '${state.hijriData!['day']} ${ArabicConstants.hijriMonthNames[(state.hijriData!['month'] as int) - 1]} ${state.hijriData!['year']} H'
        : '16 Rabiul Awwal 1448 H';

    final masehiStr = HijriCalculator.formatMasehiDate(now);

    return Container(
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.lightBorder,
          width: 1.5,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withValues(alpha: isDark ? 0.3 : 0.05),
            blurRadius: 16,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          // Digital Time Digits Row
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              _buildDigitCard(hoursStr, 'JAM', isDark),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 3),
                child: Text(':', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              ),
              _buildDigitCard(minutesStr, 'MENIT', isDark),
              const Padding(
                padding: EdgeInsets.symmetric(horizontal: 3),
                child: Text(':', style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
              ),
              _buildDigitCard(secondsStr, 'DETIK', isDark, isAccent: true),
              const SizedBox(width: 6),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 4),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                  borderRadius: BorderRadius.circular(8),
                  border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.5)),
                ),
                child: Text(
                  period,
                  style: const TextStyle(
                    fontSize: 9,
                    fontWeight: FontWeight.bold,
                    color: AppColors.goldPrimary,
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          // Calendar Card (Hijri & Masehi)
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
              borderRadius: BorderRadius.circular(14),
            ),
            child: Row(
              children: [
                Container(
                  width: 36,
                  height: 36,
                  decoration: BoxDecoration(
                    color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.calendar_month, color: AppColors.emeraldPrimary, size: 18),
                ),
                const SizedBox(width: 10),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          Container(
                            padding: const EdgeInsets.symmetric(horizontal: 5, vertical: 1),
                            decoration: BoxDecoration(
                              color: AppColors.emeraldPrimary,
                              borderRadius: BorderRadius.circular(4),
                            ),
                            child: const Text(
                              'HIJRIAH',
                              style: TextStyle(fontSize: 8, fontWeight: FontWeight.bold, color: Colors.white),
                            ),
                          ),
                          const SizedBox(width: 6),
                          Flexible(
                            child: Text(
                              hijriStr,
                              style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 2),
                      Text(
                        masehiStr,
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.w600,
                          color: isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted,
                        ),
                        overflow: TextOverflow.ellipsis,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDigitCard(String value, String label, bool isDark, {bool isAccent = false}) {
    return Column(
      children: [
        Container(
          constraints: const BoxConstraints(minWidth: 44),
          padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 7),
          decoration: BoxDecoration(
            color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
            borderRadius: BorderRadius.circular(10),
            border: Border.all(
              color: isAccent
                  ? AppColors.secondHandRed.withValues(alpha: 0.5)
                  : (isDark ? AppColors.darkBorder : AppColors.lightBorder),
            ),
          ),
          alignment: Alignment.center,
          child: Text(
            value,
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.w900,
              color: isAccent ? AppColors.secondHandRed : (isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary),
            ),
          ),
        ),
        const SizedBox(height: 2),
        Text(
          label,
          style: TextStyle(
            fontSize: 8,
            fontWeight: FontWeight.bold,
            color: isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted,
          ),
        ),
      ],
    );
  }
}
