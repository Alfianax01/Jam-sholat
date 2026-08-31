import 'package:flutter/material.dart';
import '../../core/constants/app_colors.dart';
import '../../data/datasources/subdistricts_data.dart';
import '../../data/models/city_model.dart';
import '../../logic/providers/app_state.dart';

class CitySelectorModal extends StatefulWidget {
  final AppState state;

  const CitySelectorModal({super.key, required this.state});

  @override
  State<CitySelectorModal> createState() => _CitySelectorModalState();
}

class _CitySelectorModalState extends State<CitySelectorModal> {
  String _searchQuery = '';
  RegionGroupModel? _selectedRegion;

  @override
  Widget build(BuildContext context) {
    final isDark = widget.state.isDarkMode;

    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: BoxDecoration(
        color: isDark ? AppColors.darkCardBg : AppColors.lightCardBg,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(26)),
      ),
      child: Column(
        children: [
          // Drag Handle
          const SizedBox(height: 10),
          Container(
            width: 36,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.grey.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(2),
            ),
          ),

          // Header
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 18, vertical: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    if (_selectedRegion != null)
                      IconButton(
                        icon: const Icon(Icons.arrow_back),
                        onPressed: () => setState(() => _selectedRegion = null),
                      ),
                    Text(
                      _selectedRegion != null ? _selectedRegion!.name : 'Pilih Wilayah / Daerah',
                      style: const TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                    ),
                  ],
                ),
                IconButton(
                  icon: const Icon(Icons.close),
                  onPressed: () => Navigator.pop(context),
                ),
              ],
            ),
          ),

          // Search Field
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: TextField(
              onChanged: (val) => setState(() => _searchQuery = val.trim()),
              decoration: InputDecoration(
                hintText: 'Cari daerah/kecamatan (Buaran, Tebet, BSD, Surabaya)...',
                hintStyle: const TextStyle(fontSize: 12),
                prefixIcon: const Icon(Icons.search, size: 20),
                filled: true,
                fillColor: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
                contentPadding: const EdgeInsets.symmetric(vertical: 10),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(14),
                  borderSide: BorderSide.none,
                ),
              ),
            ),
          ),

          const SizedBox(height: 10),

          // Content List
          Expanded(
            child: _buildContentList(isDark),
          ),
        ],
      ),
    );
  }

  Widget _buildContentList(bool isDark) {
    if (_searchQuery.isNotEmpty) {
      return _buildSearchResults(isDark);
    }

    if (_selectedRegion != null) {
      return _buildDistrictList(_selectedRegion!, isDark);
    }

    return _buildMajorRegionsList(isDark);
  }

  Widget _buildMajorRegionsList(bool isDark) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      children: [
        const Padding(
          padding: EdgeInsets.symmetric(vertical: 4),
          child: Text(
            'KOTA & DAERAH METROPOLITAN (KLIK UNTUK KECAMATAN)',
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey),
          ),
        ),
        ...SubdistrictsData.majorRegions.map((region) {
          return Container(
            margin: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
              borderRadius: BorderRadius.circular(14),
              border: Border.all(
                color: isDark ? AppColors.darkBorder : AppColors.lightBorder,
              ),
            ),
            child: ListTile(
              leading: const Icon(Icons.location_city, color: AppColors.emeraldPrimary),
              title: Text(region.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              subtitle: Text('${region.districts.length} Kecamatan/Daerah • ${region.group}', style: const TextStyle(fontSize: 11)),
              trailing: const Icon(Icons.chevron_right, size: 18),
              onTap: () => setState(() => _selectedRegion = region),
            ),
          );
        }),

        const SizedBox(height: 12),
        const Padding(
          padding: EdgeInsets.symmetric(vertical: 4),
          child: Text(
            'SEMUA KABUPATEN / KOTA KEMENAG RI',
            style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey),
          ),
        ),
        ...widget.state.allCities.map((city) {
          final isSelected = widget.state.selectedCity.id == city.id;
          return ListTile(
            dense: true,
            leading: Icon(Icons.map, size: 18, color: isSelected ? AppColors.emeraldPrimary : Colors.grey),
            title: Text(city.lokasi, style: TextStyle(fontSize: 12, fontWeight: isSelected ? FontWeight.bold : FontWeight.normal)),
            trailing: isSelected ? const Icon(Icons.check, color: AppColors.emeraldPrimary, size: 18) : null,
            onTap: () {
              widget.state.selectCity(city);
              Navigator.pop(context);
            },
          );
        }),
      ],
    );
  }

  Widget _buildDistrictList(RegionGroupModel region, bool isDark) {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      children: [
        // General City Choice
        ListTile(
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
            side: const BorderSide(color: AppColors.emeraldPrimary),
          ),
          leading: const Icon(Icons.location_on, color: AppColors.emeraldPrimary),
          title: Text('Pilih Seluruh ${region.name} (Umum)', style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
          onTap: () {
            widget.state.selectCity(CityModel(
              id: region.baseCityId,
              lokasi: region.baseCityName,
              displayName: region.name,
              province: region.group,
            ));
            Navigator.pop(context);
          },
        ),

        const SizedBox(height: 12),
        const Text(
          'DAFTAR KECAMATAN / KELURAHAN SPESIFIK:',
          style: TextStyle(fontSize: 10, fontWeight: FontWeight.w800, color: Colors.grey),
        ),
        const SizedBox(height: 6),

        ...region.districts.map((dist) {
          final isSelected = widget.state.selectedCity.displayName.contains(dist.name);
          return Container(
            margin: const EdgeInsets.only(bottom: 6),
            decoration: BoxDecoration(
              color: isDark ? AppColors.darkInnerBox : AppColors.lightInnerBox,
              borderRadius: BorderRadius.circular(12),
            ),
            child: ListTile(
              dense: true,
              leading: const Icon(Icons.place_outlined, size: 18, color: AppColors.emeraldPrimary),
              title: Text(dist.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              subtitle: Text(dist.alias, style: const TextStyle(fontSize: 10)),
              trailing: isSelected ? const Icon(Icons.check, color: AppColors.emeraldPrimary, size: 18) : null,
              onTap: () {
                widget.state.selectCity(CityModel(
                  id: region.baseCityId,
                  lokasi: region.baseCityName,
                  displayName: '${dist.name}, ${region.name}',
                  province: region.group,
                ));
                Navigator.pop(context);
              },
            ),
          );
        }),
      ],
    );
  }

  Widget _buildSearchResults(bool isDark) {
    final q = _searchQuery.toLowerCase();
    final List<Widget> results = [];

    // Search in districts
    for (final region in SubdistrictsData.majorRegions) {
      for (final dist in region.districts) {
        if (dist.name.toLowerCase().contains(q) || dist.alias.toLowerCase().contains(q)) {
          results.add(
            ListTile(
              dense: true,
              leading: const Icon(Icons.place, color: AppColors.emeraldPrimary, size: 18),
              title: Text(dist.name, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
              subtitle: Text('${dist.alias} • ${region.name}', style: const TextStyle(fontSize: 11)),
              onTap: () {
                widget.state.selectCity(CityModel(
                  id: region.baseCityId,
                  lokasi: region.baseCityName,
                  displayName: '${dist.name}, ${region.name}',
                  province: region.group,
                ));
                Navigator.pop(context);
              },
            ),
          );
        }
      }
    }

    // Search in Kemenag cities
    for (final city in widget.state.allCities) {
      if (city.lokasi.toLowerCase().contains(q)) {
        results.add(
          ListTile(
            dense: true,
            leading: const Icon(Icons.location_city, size: 18),
            title: Text(city.lokasi, style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 13)),
            onTap: () {
              widget.state.selectCity(city);
              Navigator.pop(context);
            },
          ),
        );
      }
    }

    if (results.isEmpty) {
      return const Center(child: Text('Wilayah tidak ditemukan'));
    }

    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      children: results,
    );
  }
}

