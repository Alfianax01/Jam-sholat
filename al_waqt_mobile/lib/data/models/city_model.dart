class CityModel {
  final String id;
  final String lokasi;
  final String displayName;
  final String province;
  final double? latitude;
  final double? longitude;

  CityModel({
    required this.id,
    required this.lokasi,
    required this.displayName,
    this.province = '',
    this.latitude,
    this.longitude,
  });

  factory CityModel.fromJson(Map<String, dynamic> json) {
    return CityModel(
      id: json['id']?.toString() ?? '1301',
      lokasi: json['lokasi'] ?? 'KOTA JAKARTA',
      displayName: json['displayName'] ?? json['lokasi'] ?? 'KOTA JAKARTA',
      province: json['prov'] ?? json['province'] ?? '',
      latitude: json['latitude'] != null ? (json['latitude'] as num).toDouble() : null,
      longitude: json['longitude'] != null ? (json['longitude'] as num).toDouble() : null,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'lokasi': lokasi,
        'displayName': displayName,
        'prov': province,
        'latitude': latitude,
        'longitude': longitude,
      };

  static CityModel defaultCity = CityModel(
    id: '1301',
    lokasi: 'KOTA JAKARTA',
    displayName: 'KOTA JAKARTA',
    province: 'DKI JAKARTA',
    latitude: -6.2088,
    longitude: 106.8456,
  );
}

class DistrictModel {
  final String name;
  final String alias;

  DistrictModel({required this.name, required this.alias});

  factory DistrictModel.fromJson(Map<String, dynamic> json) {
    return DistrictModel(
      name: json['name'] ?? '',
      alias: json['alias'] ?? '',
    );
  }
}

class RegionGroupModel {
  final String id;
  final String name;
  final String baseCityId;
  final String baseCityName;
  final String group;
  final List<DistrictModel> districts;

  RegionGroupModel({
    required this.id,
    required this.name,
    required this.baseCityId,
    required this.baseCityName,
    required this.group,
    required this.districts,
  });
}

