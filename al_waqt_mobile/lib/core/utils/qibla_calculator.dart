import 'dart:math' as math;

class QiblaCalculator {
  static const double kaabaLat = 21.422487;
  static const double kaabaLng = 39.826206;

  /// Calculates bearing from user coordinates to Ka'bah in degrees (0 - 360)
  static double calculateQiblaBearing(double userLat, double userLng) {
    final phi1 = userLat * (math.pi / 180.0);
    final phi2 = kaabaLat * (math.pi / 180.0);
    final deltaLambda = (kaabaLng - userLng) * (math.pi / 180.0);

    final y = math.sin(deltaLambda);
    final x = math.cos(phi1) * math.tan(phi2) -
        math.sin(phi1) * math.cos(deltaLambda);

    final qiblaRad = math.atan2(y, x);
    final qiblaDeg = qiblaRad * (180.0 / math.pi);

    return (qiblaDeg + 360.0) % 360.0;
  }

  /// Calculates distance to Ka'bah in kilometers using Haversine formula
  static int calculateDistanceToKaaba(double userLat, double userLng) {
    const r = 6371.0; // Earth radius in KM
    final dLat = (kaabaLat - userLat) * (math.pi / 180.0);
    final dLng = (kaabaLng - userLng) * (math.pi / 180.0);

    final a = math.sin(dLat / 2) * math.sin(dLat / 2) +
        math.cos(userLat * (math.pi / 180.0)) *
            math.cos(kaabaLat * (math.pi / 180.0)) *
            math.sin(dLng / 2) *
            math.sin(dLng / 2);

    final c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a));
    return (r * c).round();
  }

  static String getCardinalDirection(double angle) {
    if (angle >= 270 && angle < 315) return 'Barat Laut (NW)';
    if (angle >= 225 && angle < 270) return 'Barat Daya (SW)';
    if (angle >= 315 || angle < 45) return 'Utara (N)';
    if (angle >= 45 && angle < 135) return 'Timur (E)';
    if (angle >= 135 && angle < 225) return 'Selatan (S)';
    return 'Barat (W)';
  }
}

