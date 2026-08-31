import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../logic/providers/app_state.dart';

class QuranVerseCard extends StatelessWidget {
  final AppState state;

  const QuranVerseCard({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final isDark = state.isDarkMode;
    final verse = state.currentVerse;

    if (verse == null) return const SizedBox();

    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
        borderRadius: BorderRadius.circular(22),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.lightBorder,
          width: 1.5,
        ),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          // Header: Topic & Shuffle Button
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                  decoration: BoxDecoration(
                    color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(6),
                    border: Border.all(color: AppColors.emeraldPrimary.withValues(alpha: 0.4)),
                  ),
                  child: Text(
                    'HARI KE-${verse.day} • ${verse.topic.toUpperCase()}',
                    style: const TextStyle(
                      fontSize: 9,
                      fontWeight: FontWeight.w800,
                      color: AppColors.emeraldPrimary,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
              ),
              const SizedBox(width: 8),
              InkWell(
                onTap: () => state.shuffleVerse(),
                borderRadius: BorderRadius.circular(8),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(Icons.shuffle, size: 11, color: AppColors.emeraldPrimary),
                      SizedBox(width: 3),
                      Text(
                        'Lainnya',
                        style: TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: AppColors.emeraldPrimary),
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),

          const SizedBox(height: 10),

          // Surah Reference
          Text(
            verse.surah,
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted,
            ),
          ),

          const SizedBox(height: 8),

          // Arabic Text
          Text(
            verse.arab,
            textAlign: TextAlign.right,
            style: TextStyle(
              fontSize: 17,
              height: 1.8,
              fontFamily: 'serif',
              fontWeight: FontWeight.bold,
              color: isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary,
            ),
          ),

          const SizedBox(height: 8),

          // Translation
          Text(
            '"${verse.translation}"',
            style: TextStyle(
              fontSize: 12,
              fontStyle: FontStyle.italic,
              height: 1.4,
              color: isDark ? AppColors.darkTextSecondary : AppColors.lightTextSecondary,
            ),
          ),

          const SizedBox(height: 10),

          // Reflection Box
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: AppColors.goldPrimary.withValues(alpha: 0.3)),
            ),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Icon(Icons.favorite_border, size: 14, color: AppColors.goldPrimary),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    verse.reflection,
                    style: TextStyle(
                      fontSize: 11,
                      height: 1.4,
                      fontWeight: FontWeight.w600,
                      color: isDark ? AppColors.darkTextPrimary : AppColors.lightTextPrimary,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
