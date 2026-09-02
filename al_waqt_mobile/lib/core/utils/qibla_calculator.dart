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
    final norm = (angle % 360 + 360) % 360;
    if (norm >= 337.5 || norm < 22.5) return 'Utara';
    if (norm >= 22.5 && norm < 67.5) return 'Timur Laut';
    if (norm >= 67.5 && norm < 112.5) return 'Timur';
    if (norm >= 112.5 && norm < 157.5) return 'Tenggara';
    if (norm >= 157.5 && norm < 202.5) return 'Selatan';
    if (norm >= 202.5 && norm < 247.5) return 'Barat Daya';
    if (norm >= 247.5 && norm < 292.5) return 'Barat';
    return 'Barat Laut';
  }
}

