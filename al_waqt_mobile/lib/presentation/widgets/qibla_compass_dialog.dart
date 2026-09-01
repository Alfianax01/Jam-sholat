import 'dart:math' as math;
import 'package:flutter/material.dart';
import 'package:flutter_compass/flutter_compass.dart';
import 'package:geolocator/geolocator.dart';
import '../../core/constants/app_colors.dart';
import '../../core/utils/qibla_calculator.dart';
import '../../logic/providers/app_state.dart';

class QiblaCompassDialog extends StatefulWidget {
  final AppState state;

  const QiblaCompassDialog({super.key, required this.state});

  @override
  State<QiblaCompassDialog> createState() => _QiblaCompassDialogState();
}

class _QiblaCompassDialogState extends State<QiblaCompassDialog> {
  double _heading = 0;
  bool _isDetectingGps = false;

  @override
  void initState() {
    super.initState();
    FlutterCompass.events?.listen((event) {
      if (mounted && event.heading != null) {
        setState(() {
          _heading = (event.heading! % 360 + 360) % 360;
        });
      }
    });
  }

  Future<void> _detectGPS() async {
    setState(() => _isDetectingGps = true);
    try {
      LocationPermission permission = await Geolocator.checkPermission();
      if (permission == LocationPermission.denied) {
        permission = await Geolocator.requestPermission();
      }

      if (permission == LocationPermission.whileInUse || permission == LocationPermission.always) {
        final pos = await Geolocator.getCurrentPosition();
        widget.state.setCustomCoordinates(pos.latitude, pos.longitude, 'Lokasi GPS Anda (Akurat)');
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Lokasi GPS berhasil diperbarui!')),
          );
        }
      }
    } catch (_) {
      // Ignored
    } finally {
      if (mounted) setState(() => _isDetectingGps = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final isDark = widget.state.isDarkMode;
    final qiblaAngle = widget.state.qiblaBearing;
    final distanceKm = widget.state.distanceToKaaba;

    // Needle relative angle
    final relativeAngle = ((qiblaAngle - _heading) % 360 + 360) % 360;
    final isFacingQibla = (relativeAngle <= 5 || relativeAngle >= 355);

    return Dialog(
      backgroundColor: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(24),
        side: BorderSide(
          color: isDark ? AppColors.darkBorder : AppColors.lightBorder,
          width: 1.5,
        ),
      ),
      child: Padding(
        padding: const EdgeInsets.all(18),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            // Header
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Row(
                  children: [
                    Icon(Icons.explore, color: AppColors.emeraldPrimary, size: 22),
                    SizedBox(width: 8),
                    Text(
                      'Kompas Arah Kiblat',
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

            const SizedBox(height: 12),

            // Readouts: 3 Columns
            Row(
              children: [
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        const Text('DERAJAT KIBLAT', style: TextStyle(fontSize: 7.5, fontWeight: FontWeight.w800, color: Colors.grey)),
                        const SizedBox(height: 2),
                        Text(
                          '${qiblaAngle.toStringAsFixed(1)}°',
                          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900, color: AppColors.emeraldPrimary),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        const Text('ARAH KOMPAS', style: TextStyle(fontSize: 7.5, fontWeight: FontWeight.w800, color: Colors.grey)),
                        const SizedBox(height: 2),
                        Text(
                          '${_heading.round()}°',
                          style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w900),
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(width: 6),
                Expanded(
                  child: Container(
                    padding: const EdgeInsets.all(8),
                    decoration: BoxDecoration(
                      color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      children: [
                        const Text('JARAK KE KA\'BAH', style: TextStyle(fontSize: 7.5, fontWeight: FontWeight.w800, color: Colors.grey)),
                        const SizedBox(height: 2),
                        Text(
                          '~$distanceKm km',
                          style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(height: 16),

            // Interactive Animated Compass Dial & Needle
            GestureDetector(
              onPanUpdate: (details) {
                setState(() {
                  _heading = (_heading - details.delta.dx * 0.9 + 360) % 360;
                });
              },
              child: SizedBox(
                width: 200,
                height: 200,
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    // Top Lubber Line Marker (Front Index)
                    Positioned(
                      top: 0,
                      child: Container(
                        width: 10,
                        height: 6,
                        decoration: const BoxDecoration(
                          color: AppColors.secondHandRed,
                          borderRadius: BorderRadius.vertical(bottom: Radius.circular(3)),
                        ),
                      ),
                    ),

                    // Rotating Dial (Opposite of heading)
                    Transform.rotate(
                      angle: -_heading * (math.pi / 180.0),
                      child: Container(
                        width: 190,
                        height: 190,
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          color: isDark ? const Color(0xFF091710) : const Color(0xFFF9FCFA),
                          border: Border.all(color: AppColors.goldPrimary, width: 2.5),
                          boxShadow: [
                            BoxShadow(
                              color: AppColors.goldGlow,
                              blurRadius: 14,
                            ),
                          ],
                        ),
                        child: Stack(
                          alignment: Alignment.center,
                          children: [
                            // Cardinal Directions
                            const Positioned(
                              top: 8,
                              child: Text('U', style: TextStyle(fontSize: 14, fontWeight: FontWeight.w900, color: AppColors.secondHandRed)),
                            ),
                            const Positioned(
                              right: 10,
                              child: Text('T', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.grey)),
                            ),
                            const Positioned(
                              bottom: 8,
                              child: Text('S', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.grey)),
                            ),
                            const Positioned(
                              left: 10,
                              child: Text('B', style: TextStyle(fontSize: 12, fontWeight: FontWeight.w800, color: Colors.grey)),
                            ),

                            // Kaaba Needle (Fixed relative to dial at Qibla angle from North)
                            Transform.rotate(
                              angle: qiblaAngle * (math.pi / 180.0),
                              child: SizedBox(
                                width: 170,
                                height: 170,
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.start,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.all(4),
                                      decoration: BoxDecoration(
                                        color: Colors.black,
                                        borderRadius: BorderRadius.circular(6),
                                        border: Border.all(color: AppColors.goldPrimary, width: 1.5),
                                      ),
                                      child: const Icon(Icons.mosque, color: AppColors.goldPrimary, size: 15),
                                    ),
                                    Container(
                                      width: 3,
                                      height: 60,
                                      decoration: BoxDecoration(
                                        gradient: const LinearGradient(
                                          colors: [AppColors.goldPrimary, AppColors.emeraldPrimary],
                                          begin: Alignment.topCenter,
                                          end: Alignment.bottomCenter,
                                        ),
                                        borderRadius: BorderRadius.circular(2),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            ),

                            // Center Jewel
                            Container(
                              width: 14,
                              height: 14,
                              decoration: const BoxDecoration(
                                color: AppColors.goldPrimary,
                                shape: BoxShape.circle,
                              ),
                              child: Center(
                                child: Container(
                                  width: 4,
                                  height: 4,
                                  decoration: const BoxDecoration(
                                    color: Colors.white,
                                    shape: BoxShape.circle,
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),

            const SizedBox(height: 12),

            // Alignment Status Pill
            Container(
              width: double.infinity,
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 7),
              decoration: BoxDecoration(
                color: isFacingQibla
                    ? AppColors.emeraldPrimary.withValues(alpha: 0.15)
                    : (isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox),
                borderRadius: BorderRadius.circular(12),
                border: Border.all(
                  color: isFacingQibla ? AppColors.emeraldPrimary : Colors.transparent,
                  width: 1.5,
                ),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    isFacingQibla ? Icons.check_circle : Icons.explore,
                    size: 15,
                    color: isFacingQibla ? AppColors.emeraldPrimary : AppColors.goldPrimary,
                  ),
                  const SizedBox(width: 6),
                  Text(
                    isFacingQibla
                        ? '✓ Menghadap Kiblat Tepat! 🕋'
                        : 'Arah Kiblat: ${qiblaAngle.toStringAsFixed(1)}° (${QiblaCalculator.getCardinalDirection(qiblaAngle)})',
                    style: TextStyle(
                      fontSize: 11,
                      fontWeight: FontWeight.bold,
                      color: isFacingQibla ? AppColors.emeraldPrimary : null,
                    ),
                  ),
                ],
              ),
            ),

            const SizedBox(height: 10),

            // Interactive Controls: Auto Align & Reset North
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.emeraldPrimary,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.symmetric(vertical: 8),
                    ),
                    icon: const Icon(Icons.mosque, size: 13),
                    label: const Text('Selaraskan Kiblat', style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold)),
                    onPressed: () {
                      setState(() {
                        _heading = qiblaAngle;
                      });
                    },
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: OutlinedButton.icon(
                    style: OutlinedButton.styleFrom(
                      side: BorderSide(color: isDark ? AppColors.darkBorder : AppColors.lightBorder),
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
                      padding: const EdgeInsets.symmetric(vertical: 8),
                    ),
                    icon: const Icon(Icons.compass_calibration, size: 13),
                    label: const Text('Arahkan Utara', style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold)),
                    onPressed: () {
                      setState(() {
                        _heading = 0;
                      });
                    },
                  ),
                ),
              ],
            ),

            const SizedBox(height: 10),

            // Footer & GPS Button
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Text(
                    widget.state.selectedCity.displayName,
                    style: TextStyle(
                      fontSize: 10.5,
                      fontWeight: FontWeight.w600,
                      color: isDark ? AppColors.darkTextMuted : AppColors.lightTextMuted,
                    ),
                    overflow: TextOverflow.ellipsis,
                  ),
                ),
                TextButton.icon(
                  onPressed: _isDetectingGps ? null : _detectGPS,
                  icon: _isDetectingGps
                      ? const SizedBox(width: 12, height: 12, child: CircularProgressIndicator(strokeWidth: 2))
                      : const Icon(Icons.my_location, size: 13),
                  label: const Text('Deteksi GPS', style: TextStyle(fontSize: 10.5, fontWeight: FontWeight.bold)),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
