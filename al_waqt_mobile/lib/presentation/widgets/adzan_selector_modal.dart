import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../logic/providers/app_state.dart';
import '../../logic/services/audio_service.dart';

class AdzanSelectorModal extends StatelessWidget {
  final AppState state;

  const AdzanSelectorModal({super.key, required this.state});

  @override
  Widget build(BuildContext context) {
    final isDark = state.isDarkMode;

    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 16),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(26)),
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 36,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey.withValues(alpha: 0.4),
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 14),

          // Title
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.mic, color: AppColors.emeraldPrimary, size: 20),
                  SizedBox(width: 8),
                  Text(
                    'Pilihan Suara & Muazin Adzan',
                    style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                  ),
                ],
              ),
              IconButton(
                icon: const Icon(Icons.close, size: 20),
                onPressed: () => Navigator.pop(context),
              ),
            ],
          ),

          const SizedBox(height: 10),

          // Special Subuh Banner
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(color: AppColors.emeraldPrimary.withValues(alpha: 0.4)),
            ),
            child: Row(
              children: [
                Container(
                  width: 38,
                  height: 38,
                  decoration: BoxDecoration(
                    color: AppColors.emeraldPrimary,
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: const Icon(Icons.wb_twilight, color: Colors.white, size: 20),
                ),
                const SizedBox(width: 10),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'KHUSUS WAKTU SUBUH (OTOMATIS)',
                        style: TextStyle(fontSize: 8, fontWeight: FontWeight.w800, color: AppColors.emeraldPrimary),
                      ),
                      Text(
                        'Tatswib Subuh: Ash-Shalatu Khairum Minan-Naum',
                        style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'Syaikh Mishary Rashid Alafasy',
                        style: TextStyle(fontSize: 10, color: Colors.grey),
                      ),
                    ],
                  ),
                ),
                IconButton(
                  icon: const Icon(Icons.play_circle_fill, color: AppColors.emeraldPrimary, size: 28),
                  onPressed: () {
                    AudioService.playAdzan(AudioService.subuhSpecialAdzan.assetPath);
                  },
                ),
              ],
            ),
          ),

          const SizedBox(height: 14),

          const Text(
            'PILIHAN MUAZIN SHOLAT REGULER:',
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey),
          ),

          const SizedBox(height: 8),

          ...AudioService.adzanOptions.map((opt) {
            final isSelected = state.selectedAdzanId == opt.id;
            return Container(
              margin: const EdgeInsets.only(bottom: 8),
              decoration: BoxDecoration(
                color: isSelected
                    ? AppColors.emeraldPrimary.withValues(alpha: 0.12)
                    : (isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox),
                borderRadius: BorderRadius.circular(14),
                border: Border.all(
                  color: isSelected ? AppColors.emeraldPrimary : Colors.transparent,
                  width: 1.5,
                ),
              ),
              child: ListTile(
                leading: Icon(
                  isSelected ? Icons.radio_button_checked : Icons.radio_button_off,
                  color: isSelected ? AppColors.emeraldPrimary : Colors.grey,
                  size: 20,
                ),
                title: Text(opt.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
                subtitle: Text(opt.muazzin, style: const TextStyle(fontSize: 11)),
                trailing: IconButton(
                  icon: const Icon(Icons.play_circle_outline, color: AppColors.emeraldPrimary),
                  onPressed: () {
                    AudioService.playAdzan(opt.assetPath);
                  },
                ),
                onTap: () {
                  state.setAdzanOption(opt.id);
                  Navigator.pop(context);
                },
              ),
            );
          }),

          const SizedBox(height: 10),
        ],
      ),
    );
  }
}

