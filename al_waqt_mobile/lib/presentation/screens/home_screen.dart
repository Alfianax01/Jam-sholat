import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../core/constants/app_colors.dart';
import '../../logic/providers/app_state.dart';
import '../widgets/analog_clock_painter.dart';
import '../widgets/digital_clock_card.dart';
import '../widgets/event_countdown_card.dart';
import '../widgets/prayer_grid_card.dart';
import '../widgets/quran_verse_card.dart';
import '../widgets/qibla_compass_dialog.dart';
import '../widgets/city_selector_modal.dart';
import '../widgets/adzan_selector_modal.dart';
import '../widgets/settings_bottom_sheet.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, _) {
        final isDark = state.isDarkMode;

        return Scaffold(
          backgroundColor: isDark ? AppColors.darkBgBase : AppColors.lightBgBase,
          body: SafeArea(
            child: Stack(
              children: [
                // Scrollable Content Body
                SingleChildScrollView(
                  padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
                  child: Column(
                    children: [
                      // 1. Bismillah Ribbon
                      const Center(
                        child: Text(
                          'بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ',
                          style: TextStyle(
                            fontFamily: 'serif',
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: AppColors.goldPrimary,
                          ),
                        ),
                      ),

                      const SizedBox(height: 10),

                      // 2. Header Bar (Brand & Action Chips)
                      _buildAppHeader(context, state, isDark),

                      const SizedBox(height: 16),

                      // 3. Hero Timepiece (Analog Watch + Digital Card)
                      _buildHeroTimepiece(context, state, isDark),

                      const SizedBox(height: 14),

                      // 4. Milestone Countdowns (Ramadhan & Idul Fitri with Masehi Date)
                      EventCountdownCard(state: state),

                      const SizedBox(height: 14),

                      // 5. Prayer Schedule Matrix (8 Times + Active Countdown)
                      PrayerGridCard(state: state),

                      const SizedBox(height: 14),

                      // 6. Quranic Inspiration Card
                      QuranVerseCard(state: state),

                      const SizedBox(height: 20),

                      // Footer
                      const Text(
                        'Al-Waqt • Presisi Waktu & Sholat Islami • Kemenag RI',
                        style: TextStyle(fontSize: 10, color: Colors.grey, fontWeight: FontWeight.w600),
                      ),
                      const SizedBox(height: 80), // Padding for adzan banner
                    ],
                  ),
                ),

                // Live Floating Adzan Banner
                if (state.isPlayingAdzan)
                  Positioned(
                    bottom: 16,
                    left: 16,
                    right: 16,
                    child: _buildAdzanBanner(state, isDark),
                  ),
              ],
            ),
          ),
        );
      },
    );
  }

  Widget _buildAppHeader(BuildContext context, AppState state, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 10),
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: isDark ? AppColors.darkBorder : AppColors.lightBorder,
          width: 1.5,
        ),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Brand Lockup
          const Row(
            children: [
              Icon(Icons.mosque, color: AppColors.emeraldPrimary, size: 24),
              SizedBox(width: 8),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Text('AL-WAQT', style: TextStyle(fontSize: 13, fontWeight: FontWeight.w900, letterSpacing: 0.5)),
                      SizedBox(width: 4),
                      Text('الْوَقْت', style: TextStyle(fontSize: 11, fontFamily: 'serif', color: AppColors.goldPrimary, fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Text('Presisi Sholat Islami', style: TextStyle(fontSize: 9, color: Colors.grey, fontWeight: FontWeight.w600)),
                ],
              ),
            ],
          ),

          // Action Chips
          Row(
            children: [
              // Theme Toggle
              IconButton(
                icon: Icon(
                  isDark ? Icons.light_mode_outlined : Icons.dark_mode_outlined,
                  size: 20,
                  color: isDark ? AppColors.goldPrimary : AppColors.emeraldPrimary,
                ),
                onPressed: () => state.toggleTheme(),
              ),

              // Audio Toggle
              IconButton(
                icon: Icon(
                  state.audioEnabled ? Icons.notifications_active : Icons.notifications_off_outlined,
                  size: 20,
                  color: state.audioEnabled ? AppColors.emeraldPrimary : Colors.grey,
                ),
                onPressed: () => state.toggleAudio(),
              ),

              // Settings Sheet Trigger
              IconButton(
                icon: const Icon(Icons.settings_outlined, size: 20),
                onPressed: () {
                  showModalBottomSheet(
                    context: context,
                    isScrollControlled: true,
                    backgroundColor: Colors.transparent,
                    builder: (ctx) => SettingsBottomSheet(state: state),
                  );
                },
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildHeroTimepiece(BuildContext context, AppState state, bool isDark) {
    return Column(
      children: [
        // Location & Reciter Chips Row
        Row(
          children: [
            // Location Chip
            Expanded(
              child: InkWell(
                onTap: () {
                  showModalBottomSheet(
                    context: context,
                    isScrollControlled: true,
                    backgroundColor: Colors.transparent,
                    builder: (ctx) => CitySelectorModal(state: state),
                  );
                },
                borderRadius: BorderRadius.circular(12),
                child: Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                  decoration: BoxDecoration(
                    color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.lightBorder),
                  ),
                  child: Row(
                    children: [
                      const Icon(Icons.location_on, color: AppColors.emeraldPrimary, size: 16),
                      const SizedBox(width: 6),
                      Expanded(
                        child: Text(
                          state.selectedCity.displayName,
                          style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                          overflow: TextOverflow.ellipsis,
                        ),
                      ),
                      const Icon(Icons.keyboard_arrow_down, size: 16, color: Colors.grey),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(width: 8),
            // Adzan Reciter Chip
            InkWell(
              onTap: () {
                showModalBottomSheet(
                  context: context,
                  isScrollControlled: true,
                  backgroundColor: Colors.transparent,
                  builder: (ctx) => AdzanSelectorModal(state: state),
                );
              },
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 8),
                decoration: BoxDecoration(
                  color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                  borderRadius: BorderRadius.circular(12),
                  border: Border.all(color: isDark ? AppColors.darkBorder : AppColors.lightBorder),
                ),
                child: Row(
                  children: [
                    const Icon(Icons.mic, color: AppColors.emeraldPrimary, size: 16),
                    const SizedBox(width: 4),
                    Text(
                      state.currentAdzanOption.tag,
                      style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                    ),
                    const Icon(Icons.keyboard_arrow_down, size: 16, color: Colors.grey),
                  ],
                ),
              ),
            ),
          ],
        ),

        const SizedBox(height: 16),

        // Analog Dial Watch
        Center(
          child: AnalogClockWidget(
            dateTime: state.currentTime,
            isArabicNumerals: state.isArabicNumerals,
            isSmooth: state.isSmooth,
            isDarkMode: isDark,
            size: 210,
          ),
        ),

        const SizedBox(height: 16),

        // Digital Clock & Hijri Calendar Card
        DigitalClockCard(state: state),

        const SizedBox(height: 8),

        // Qibla Pill (Tap to open Compass)
        InkWell(
          onTap: () {
            showDialog(
              context: context,
              builder: (ctx) => QiblaCompassDialog(state: state),
            );
          },
          borderRadius: BorderRadius.circular(10),
          child: Container(
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
              borderRadius: BorderRadius.circular(10),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.explore, color: AppColors.goldPrimary, size: 16),
                const SizedBox(width: 6),
                Text(
                  'Arah Kiblat: ${state.qiblaBearing.toStringAsFixed(1)}° (Buka Kompas)',
                  style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildAdzanBanner(AppState state, bool isDark) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: AppColors.emeraldPrimary,
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: AppColors.emeraldPrimary.withValues(alpha: 0.5),
            blurRadius: 20,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Row(
        children: [
          const Icon(Icons.volume_up, color: Colors.white, size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisSize: MainAxisSize.min,
              children: [
                const Text('WAKTU SHOLAT TELAH TIBA', style: TextStyle(fontSize: 9, fontWeight: FontWeight.w800, color: Colors.white70)),
                Text(state.adzanBannerTitle, style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.white)),
              ],
            ),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: Colors.white,
              foregroundColor: AppColors.emeraldPrimary,
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 8),
            ),
            onPressed: () => state.stopAdzan(),
            child: const Text('Hentikan', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 11)),
          ),
        ],
      ),
    );
  }
}

