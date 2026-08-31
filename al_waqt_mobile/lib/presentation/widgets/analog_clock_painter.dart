import 'dart:math' as math;
import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../core/constants/arabic_constants.dart';

class AnalogClockWidget extends StatelessWidget {
  final DateTime dateTime;
  final bool isArabicNumerals;
  final bool isSmooth;
  final bool isDarkMode;
  final double size;

  const AnalogClockWidget({
    super.key,
    required this.dateTime,
    required this.isArabicNumerals,
    required this.isSmooth,
    required this.isDarkMode,
    this.size = 230,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _AnalogClockPainter(
          dateTime: dateTime,
          isArabicNumerals: isArabicNumerals,
          isSmooth: isSmooth,
          isDarkMode: isDarkMode,
        ),
      ),
    );
  }
}

class _AnalogClockPainter extends CustomPainter {
  final DateTime dateTime;
  final bool isArabicNumerals;
  final bool isSmooth;
  final bool isDarkMode;

  _AnalogClockPainter({
    required this.dateTime,
    required this.isArabicNumerals,
    required this.isSmooth,
    required this.isDarkMode,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2;

    // 1. Bezel Outer Shadow & Ring
    final bezelPaint = Paint()
      ..color = isDarkMode ? const Color(0xFF132B20) : const Color(0xFFFFFFFF)
      ..style = PaintingStyle.fill;
    canvas.drawCircle(center, radius, bezelPaint);

    final goldRimPaint = Paint()
      ..color = AppColors.goldPrimary
      ..style = PaintingStyle.stroke
      ..strokeWidth = 3.5;
    canvas.drawCircle(center, radius - 2, goldRimPaint);

    // Inner Face
    final facePaint = Paint()
      ..color = isDarkMode ? const Color(0xFF091710) : const Color(0xFFF9FCFA)
      ..style = PaintingStyle.fill;
    canvas.drawCircle(center, radius - 8, facePaint);

    // Inner dashed ring
    final ringPaint = Paint()
      ..color = AppColors.goldPrimary.withValues(alpha: 0.3)
      ..style = PaintingStyle.stroke
      ..strokeWidth = 1.0;
    canvas.drawCircle(center, radius * 0.72, ringPaint);

    // 2. Dial Ticks (60 Ticks)
    for (int i = 0; i < 60; i++) {
      final angle = (i * 6) * (math.pi / 180.0);
      final isMajor = i % 5 == 0;
      final tickLength = isMajor ? 8.0 : 4.0;
      final tickWidth = isMajor ? 2.2 : 1.0;
      final tickColor = isMajor
          ? AppColors.goldPrimary
          : (isDarkMode ? AppColors.darkBorder : AppColors.lightBorder);

      final p1 = Offset(
        center.dx + (radius - 12) * math.sin(angle),
        center.dy - (radius - 12) * math.cos(angle),
      );
      final p2 = Offset(
        center.dx + (radius - 12 - tickLength) * math.sin(angle),
        center.dy - (radius - 12 - tickLength) * math.cos(angle),
      );

      canvas.drawLine(
        p1,
        p2,
        Paint()
          ..color = tickColor
          ..strokeWidth = tickWidth
          ..strokeCap = StrokeCap.round,
      );
    }

    // 3. Hour Numbers (12, 3, 6, 9)
    _drawHourNumber(canvas, center, radius, 12, 0);
    _drawHourNumber(canvas, center, radius, 3, math.pi / 2);
    _drawHourNumber(canvas, center, radius, 6, math.pi);
    _drawHourNumber(canvas, center, radius, 9, 3 * math.pi / 2);

    // 4. Dial Brand Text
    final textPainter = TextPainter(
      text: TextSpan(
        text: 'الْوَقْت',
        style: TextStyle(
          color: AppColors.goldPrimary,
          fontSize: size.width * 0.08,
          fontWeight: FontWeight.bold,
          fontFamily: 'serif',
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();
    textPainter.paint(
      canvas,
      Offset(center.dx - textPainter.width / 2, center.dy - radius * 0.42),
    );

    // 5. Hands Angles Calculation
    final ms = dateTime.millisecond;
    final secondFraction = isSmooth ? (dateTime.second + ms / 1000.0) : dateTime.second.toDouble();
    final minuteFraction = dateTime.minute + secondFraction / 60.0;
    final hourFraction = (dateTime.hour % 12) + minuteFraction / 60.0;

    final hourAngle = hourFraction * 30 * (math.pi / 180.0);
    final minuteAngle = minuteFraction * 6 * (math.pi / 180.0);
    final secondAngle = secondFraction * 6 * (math.pi / 180.0);

    // Hour Hand
    _drawHand(
      canvas: canvas,
      center: center,
      angle: hourAngle,
      length: radius * 0.48,
      width: 4.5,
      color: isDarkMode ? AppColors.darkTextPrimary : AppColors.lightTextPrimary,
    );

    // Minute Hand
    _drawHand(
      canvas: canvas,
      center: center,
      angle: minuteAngle,
      length: radius * 0.68,
      width: 3.0,
      color: isDarkMode ? AppColors.darkTextPrimary : AppColors.lightTextPrimary,
    );

    // Second Hand (Rose Accent with Moon Tail)
    _drawHand(
      canvas: canvas,
      center: center,
      angle: secondAngle,
      length: radius * 0.78,
      width: 1.5,
      color: AppColors.secondHandRed,
      tailLength: 18.0,
    );

    // 6. Center Pin & Gem
    final pinPaint = Paint()
      ..color = AppColors.goldPrimary
      ..style = PaintingStyle.fill;
    canvas.drawCircle(center, 6.0, pinPaint);

    final gemPaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;
    canvas.drawCircle(center, 2.0, gemPaint);
  }

  void _drawHand({
    required Canvas canvas,
    required Offset center,
    required double angle,
    required double length,
    required double width,
    required Color color,
    double tailLength = 0,
  }) {
    final handPaint = Paint()
      ..color = color
      ..strokeWidth = width
      ..strokeCap = StrokeCap.round;

    final p1 = Offset(
      center.dx + length * math.sin(angle),
      center.dy - length * math.cos(angle),
    );
    final p2 = Offset(
      center.dx - tailLength * math.sin(angle),
      center.dy + tailLength * math.cos(angle),
    );

    canvas.drawLine(p2, p1, handPaint);
  }

  void _drawHourNumber(Canvas canvas, Offset center, double radius, int number, double angle) {
    final dist = radius * 0.65;
    final numStr = isArabicNumerals
        ? ArabicConstants.toArabicDigits(number.toString())
        : number.toString();

    final textPainter = TextPainter(
      text: TextSpan(
        text: numStr,
        style: TextStyle(
          color: isDarkMode ? AppColors.darkTextPrimary : AppColors.lightTextPrimary,
          fontSize: radius * 0.16,
          fontWeight: FontWeight.w800,
        ),
      ),
      textDirection: TextDirection.ltr,
    )..layout();

    final x = center.dx + dist * math.sin(angle) - (textPainter.width / 2);
    final y = center.dy - dist * math.cos(angle) - (textPainter.height / 2);

    textPainter.paint(canvas, Offset(x, y));
  }

  @override
  bool shouldRepaint(covariant _AnalogClockPainter oldDelegate) {
    return true;
  }
}

