import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../logic/providers/app_state.dart';
import 'qibla_compass_dialog.dart';

class SettingsBottomSheet extends StatelessWidget {
  final AppState state;

  const SettingsBottomSheet({super.key, required this.state});

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

          // Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Row(
                children: [
                  Icon(Icons.tune, color: AppColors.emeraldPrimary, size: 20),
                  SizedBox(width: 8),
                  Text(
                    'Pengaturan Jam & Tampilan',
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

          // 1. Format Waktu 24H / 12H
          _buildSettingRow(
            icon: Icons.access_time,
            title: 'Format Waktu Jam',
            subtitle: 'Tampilan 24 Jam atau 12 Jam (AM/PM)',
            isDark: isDark,
            trailing: _buildSegmentedSwitch(
              leftLabel: '24 Jam',
              rightLabel: '12 Jam',
              isLeftSelected: state.is24Hour,
              onLeft: () => state.set24HourFormat(true),
              onRight: () => state.set24HourFormat(false),
              isDark: isDark,
            ),
          ),

          const SizedBox(height: 8),

          // 2. Angka Jam (Latin / Arab)
          _buildSettingRow(
            icon: Icons.pin,
            title: 'Angka Jam & Hitungan',
            subtitle: 'Angka Latin (1, 2, 3) atau Arab (١, ٢, ٣)',
            isDark: isDark,
            trailing: _buildSegmentedSwitch(
              leftLabel: 'Latin',
              rightLabel: 'Arab',
              isLeftSelected: !state.isArabicNumerals,
              onLeft: () => state.setArabicNumerals(false),
              onRight: () => state.setArabicNumerals(true),
              isDark: isDark,
            ),
          ),

          const SizedBox(height: 8),

          // 3. Gerakan Jarum (Smooth / Detak)
          _buildSettingRow(
            icon: Icons.speed,
            title: 'Gerakan Jarum Analog',
            subtitle: 'Meluncur halus (Smooth) atau berdetak',
            isDark: isDark,
            trailing: _buildSegmentedSwitch(
              leftLabel: 'Halus',
              rightLabel: 'Detak',
              isLeftSelected: state.isSmooth,
              onLeft: () => state.setSmoothHands(true),
              onRight: () => state.setSmoothHands(false),
              isDark: isDark,
            ),
          ),

          const SizedBox(height: 8),

          // 4. Kompas Arah Kiblat
          _buildSettingRow(
            icon: Icons.explore,
            title: 'Kompas Arah Kiblat',
            subtitle: 'Buka instrumen kompas digital & derajat Ka\'bah',
            isDark: isDark,
            trailing: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: AppColors.emeraldPrimary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              icon: const Icon(Icons.compass_calibration, size: 14),
              label: const Text('Buka Kompas', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              onPressed: () {
                Navigator.pop(context);
                showDialog(
                  context: context,
                  builder: (ctx) => QiblaCompassDialog(state: state),
                );
              },
            ),
          ),

          const SizedBox(height: 8),

          // 5. Tes Suara Adzan
          _buildSettingRow(
            icon: Icons.volume_up,
            title: 'Tes Audio Adzan',
            subtitle: 'Uji coba putar audio adzan asli',
            isDark: isDark,
            trailing: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: state.isPlayingAdzan ? AppColors.secondHandRed : AppColors.emeraldPrimary,
                foregroundColor: Colors.white,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              icon: Icon(state.isPlayingAdzan ? Icons.stop : Icons.play_arrow, size: 14),
              label: Text(state.isPlayingAdzan ? 'Hentikan' : 'Putar Tes', style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              onPressed: () {
                if (state.isPlayingAdzan) {
                  state.stopAdzan();
                } else {
                  state.playAdzan('Tes Makkah');
                }
              },
            ),
          ),

          const SizedBox(height: 8),

          // 6. Tentang Al-Waqt (About)
          _buildSettingRow(
            icon: Icons.info_outline,
            title: 'Tentang Al-Waqt',
            subtitle: 'Versi v2.0.0, API Kemenag RI & Pengembang',
            isDark: isDark,
            trailing: ElevatedButton.icon(
              style: ElevatedButton.styleFrom(
                backgroundColor: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                foregroundColor: AppColors.emeraldPrimary,
                elevation: 0,
                side: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.lightBorder),
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
              ),
              icon: const Icon(Icons.info, size: 14),
              label: const Text('Tentang', style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold)),
              onPressed: () {
                Navigator.pop(context);
                showAboutDialog(
                  context: context,
                  applicationName: 'Al-Waqt (الْوَقْت)',
                  applicationVersion: '2.0.0 (Production)',
                  applicationIcon: Container(
                    width: 44,
                    height: 44,
                    decoration: BoxDecoration(
                      color: AppColors.emeraldPrimary.withValues(alpha: 0.15),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Icon(Icons.mosque, color: AppColors.emeraldPrimary, size: 26),
                  ),
                  applicationLegalese: '© 2026 Alfian (@Alfianax01) • Lisensi MIT Open Source\nData Sholat: Bimas Islam Kementerian Agama RI',
                  children: const [
                    SizedBox(height: 14),
                    Text(
                      'Al-Waqt adalah instrumen waktu Islami presisi dengan jam analog smooth sweep, kompas arah kiblat bola geodesik, jadwal sholat resmi Kemenag RI, audio muazin tanah suci, dan inspirasi harian Al-Qur\'an.',
                      style: TextStyle(fontSize: 12),
                    ),
                  ],
                );
              },
            ),
          ),

          const SizedBox(height: 14),
        ],
      ),
    );
  }

  Widget _buildSettingRow({
    required IconData icon,
    required String title,
    required String subtitle,
    required bool isDark,
    required Widget trailing,
  }) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
        borderRadius: BorderRadius.circular(16),
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
            child: Icon(icon, color: AppColors.emeraldPrimary, size: 18),
          ),
          const SizedBox(width: 10),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(title, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold)),
                Text(
                  subtitle,
                  style: TextStyle(
                    fontSize: 10,
                    color: isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted,
                  ),
                ),
              ],
            ),
          ),
          trailing,
        ],
      ),
    );
  }

  Widget _buildSegmentedSwitch({
    required String leftLabel,
    required String rightLabel,
    required bool isLeftSelected,
    required VoidCallback onLeft,
    required VoidCallback onRight,
    required bool isDark,
  }) {
    return Container(
      padding: const EdgeInsets.all(2),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : Colors.white,
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.lightBorder),
      ),
      child: Row(
        children: [
          GestureDetector(
            onTap: onLeft,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
              decoration: BoxDecoration(
                color: isLeftSelected ? AppColors.emeraldPrimary : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                leftLabel,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: isLeftSelected ? Colors.white : (isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted),
                ),
              ),
            ),
          ),
          GestureDetector(
            onTap: onRight,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 5),
              decoration: BoxDecoration(
                color: !isLeftSelected ? AppColors.emeraldPrimary : Colors.transparent,
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                rightLabel,
                style: TextStyle(
                  fontSize: 10,
                  fontWeight: FontWeight.bold,
                  color: !isLeftSelected ? Colors.white : (isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted),
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}

