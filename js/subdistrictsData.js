/**
 * SUBDISTRICTS_DATA.JS - Comprehensive Indonesian Hierarchical Region Database
 * Structured hierarchically: Major Regions -> Cities -> Sub-districts (Kecamatan & Kelurahan)
 */

const HIERARCHICAL_REGIONS = [
    // =========================================================
    // 1. PROVINSI DKI JAKARTA
    // =========================================================
    {
        id: 'jaktim',
        name: 'Jakarta Timur',
        group: 'DKI Jakarta',
        icon: 'fa-mosque',
        badge: 'Kota Administrasi',
        cityId: '58a2fc6ed39fd083f55d4182bf88826d',
        baseCity: 'KOTA JAKARTA',
        districts: [
            { name: 'Duren Sawit', alias: 'Buaran, Pondok Bambu, Pondok Kelapa, Pondok Kopi, Klender, Malaka Jaya' },
            { name: 'Pulo Gadung / Rawamangun', alias: 'Rawamangun, Kayu Putih, Pisangan Timur, Jati, Cipinang' },
            { name: 'Jatinegara', alias: 'Kampung Melayu, Bidara Cina, Bali Mester, Cipinang Cempedak, Rawa Bunga' },
            { name: 'Cakung', alias: 'Pulo Gebang, Ujung Menteng, Penggilingan, Rawa Terate' },
            { name: 'Matraman', alias: 'Utan Kayu, Kayu Manis, Palmeriam, Pisangan Baru' },
            { name: 'Kramat Jati', alias: 'Cawang, Cililitan, Batu Ampar, Balekambang, Kampung Tengah' },
            { name: 'Pasar Rebo / Cijantung', alias: 'Cijantung, Pekayon, Gedong, Kalisari' },
            { name: 'Ciracas / Cibubur', alias: 'Cibubur, Ciracas, Kelapa Dua Wetan, Susukan' },
            { name: 'Cipayung / TMII', alias: 'TMII, Lubang Buaya, Ceger, Munjul, Pondok Ranggon, Cilangkap' },
            { name: 'Makasar / Halim', alias: 'Halim Perdanakusuma, Pinang Ranti, Kebon Pala' }
        ]
    },
    {
        id: 'jaksel',
        name: 'Jakarta Selatan',
        group: 'DKI Jakarta',
        icon: 'fa-building-columns',
        badge: 'Kota Administrasi',
        cityId: '58a2fc6ed39fd083f55d4182bf88826d',
        baseCity: 'KOTA JAKARTA',
        districts: [
            { name: 'Tebet', alias: 'Tebet Barat, Tebet Timur, Kebon Baru, Bukit Duri, Manggarai, Menteng Dalam' },
            { name: 'Kebayoran Baru / Blok M', alias: 'Blok M, Senopati, Gunawarman, Gandaria Utara, Melawai, Petogogan, Selong' },
            { name: 'Kebayoran Lama / Pondok Indah', alias: 'Pondok Indah, Cipulir, Grogol Selatan, Grogol Utara' },
            { name: 'Cilandak / Fatmawati', alias: 'Fatmawati, Cipete Selatan, Gandaria Selatan, Lebak Bulus, Pondok Labu' },
            { name: 'Pasar Minggu / Pejaten', alias: 'Pejaten, Kalibata, Ragunan, Jati Padang' },
            { name: 'Mampang Prapatan / Kemang', alias: 'Kemang, Bangka, Pela Mampang, Tegal Parang, Kuningan Barat' },
            { name: 'Setiabudi / Kuningan', alias: 'Kuningan, Karet Semanggi, Karet Kuningan, Menteng Atas, Pasar Manggis' },
            { name: 'Pancoran', alias: 'Kalibata, Rawa Jati, Duren Tiga, Cikoko, Pengadegan' },
            { name: 'Jagakarsa', alias: 'Tanjung Barat, Lenteng Agung, Ciganjur, Srengseng Sawah' },
            { name: 'Pesanggrahan / Bintaro', alias: 'Petukangan, Bintaro Jaya, Ulujami' }
        ]
    },
    {
        id: 'jakbar',
        name: 'Jakarta Barat',
        group: 'DKI Jakarta',
        icon: 'fa-city',
        badge: 'Kota Administrasi',
        cityId: '58a2fc6ed39fd083f55d4182bf88826d',
        baseCity: 'KOTA JAKARTA',
        districts: [
            { name: 'Kebon Jeruk', alias: 'Kedoya, Duri Kepa, Kelapa Dua, Sukabumi Utara' },
            { name: 'Kembangan / Puri Indah', alias: 'Puri Indah, Meruya, Joglo, Srengseng' },
            { name: 'Grogol Petamburan / Tomang', alias: 'Tomang, Tanjung Duren, Jelambar' },
            { name: 'Palmerah / Slipi', alias: 'Slipi, Kemanggisan, Kota Bambu' },
            { name: 'Cengkareng', alias: 'Rawa Buaya, Duri Kosambi, Kapuk' },
            { name: 'Kalideres', alias: 'Pegadungan, Semanan, Tegal Alur, Kamal' },
            { name: 'Taman Sari / Glodok / Kota Tua', alias: 'Kota Tua, Glodok, Mangga Besar, Pinangsia' },
            { name: 'Tambora', alias: 'Jembatan Lima, Jembatan Besi, Angke, Pekojan' }
        ]
    },
    {
        id: 'jakpus',
        name: 'Jakarta Pusat',
        group: 'DKI Jakarta',
        icon: 'fa-monument',
        badge: 'Kota Administrasi',
        cityId: '58a2fc6ed39fd083f55d4182bf88826d',
        baseCity: 'KOTA JAKARTA',
        districts: [
            { name: 'Menteng / Sudirman / Thamrin', alias: 'Menteng, Cikini, Gondangdia, Thamrin, Sudirman' },
            { name: 'Tanah Abang / Benhil', alias: 'Tanah Abang, Petamburan, Bendungan Hilir, Benhil, Gelora' },
            { name: 'Gambir / Monas', alias: 'Monas, Petojo, Cideng, Duri Pulo' },
            { name: 'Kemayoran', alias: 'Kemayoran, Gunung Sahari Selatan, Sunter Baru' },
            { name: 'Senen / Salemba', alias: 'Senen, Kwitang, Kenari, Salemba, Kramat' },
            { name: 'Cempaka Putih / Johar Baru', alias: 'Cempaka Putih, Rawasari, Johar Baru' },
            { name: 'Sawah Besar / Pasar Baru', alias: 'Pasar Baru, Mangga Dua, Karang Anyar' }
        ]
    },
    {
        id: 'jakut',
        name: 'Jakarta Utara',
        group: 'DKI Jakarta',
        icon: 'fa-ship',
        badge: 'Kota Administrasi',
        cityId: '58a2fc6ed39fd083f55d4182bf88826d',
        baseCity: 'KOTA JAKARTA',
        districts: [
            { name: 'Kelapa Gading', alias: 'Kelapa Gading Barat, Kelapa Gading Timur, Pegangsaan Dua' },
            { name: 'Penjaringan / PIK / Pluit', alias: 'Pantai Indah Kapuk, PIK, Pluit, Muara Karang, Kapuk Muara' },
            { name: 'Tanjung Priok / Sunter', alias: 'Sunter Jaya, Sunter Agung, Kebon Bawang, Warakas' },
            { name: 'Pademangan / Ancol', alias: 'Ancol, Pademangan Barat, Pademangan Timur' },
            { name: 'Koja / Cilincing / Marunda', alias: 'Koja, Cilincing, Marunda, Rorotan, Semper' }
        ]
    },
    {
        id: 'seribu',
        name: 'Kepulauan Seribu',
        group: 'DKI Jakarta',
        icon: 'fa-water',
        badge: 'Kab. Administrasi',
        cityId: '58a2fc6ed39fd083f55d4182bf88826d',
        baseCity: 'KOTA JAKARTA',
        districts: [
            { name: 'Kepulauan Seribu Selatan', alias: 'Pulau Tidung, Pulau Untung Jawa, Pulau Pari' },
            { name: 'Kepulauan Seribu Utara', alias: 'Pulau Kelapa, Pulau Harapan, Pulau Panggang' }
        ]
    },

    // =========================================================
    // 2. BODETABEK (JAWA BARAT & BANTEN)
    // =========================================================
    {
        id: 'tangsel',
        name: 'Kota Tangerang Selatan',
        group: 'Banten',
        icon: 'fa-tree-city',
        badge: 'Kota Otonom',
        cityId: '82aa4b0af34c2313a562076992e50aa3',
        baseCity: 'KOTA TANGERANG SELATAN',
        districts: [
            { name: 'Serpong / BSD City', alias: 'BSD, BSD City, Serpong, Lengkong Gudang, Rawa Buntu, Cilenggang' },
            { name: 'Pondok Aren / Bintaro', alias: 'Bintaro Jaya, Jurang Mangu, Pondok Ranji, Pondok Betung' },
            { name: 'Serpong Utara / Alam Sutera', alias: 'Alam Sutera, Pakulonan, Pondok Jagung, Jelupang' },
            { name: 'Ciputat / Ciputat Timur', alias: 'Ciputat, Cireundeu, Pisangan, Pondok Cabe' },
            { name: 'Pamulang', alias: 'Pamulang Barat, Pamulang Timur, Pondok Benda, Benda Baru' },
            { name: 'Setu', alias: 'Babakan, Bakti Jaya, Kademangan, Muncul' }
        ]
    },
    {
        id: 'tangerang',
        name: 'Kota Tangerang',
        group: 'Banten',
        icon: 'fa-city',
        badge: 'Kota Otonom',
        cityId: 'bd4c9ab730f5513206b999ec0d90d1fb',
        baseCity: 'KOTA TANGERANG',
        districts: [
            { name: 'Karawaci / Lippo', alias: 'Karawaci, Lippo Karawaci, Cimone, Bojong Jaya' },
            { name: 'Ciledug / Larangan', alias: 'Ciledug, Larangan, Karang Tengah, Paninggilan' },
            { name: 'Cipondoh / Poris', alias: 'Cipondoh, Poris Plawad, Poris Jaya' },
            { name: 'Batuceper / Benda / Bandara', alias: 'Batuceper, Benda, Bandara Soekarno Hatta' },
            { name: 'Tangerang Kota', alias: 'Pasar Anyar, Sukasari, Babakan' }
        ]
    },
    {
        id: 'kotabekasi',
        name: 'Kota Bekasi',
        group: 'Jawa Barat',
        icon: 'fa-building',
        badge: 'Kota Otonom',
        cityId: 'cedebb6e872f539bef8c3f919874e9d7',
        baseCity: 'KOTA BEKASI',
        districts: [
            { name: 'Bekasi Barat / Kranji / Galaxy', alias: 'Kranji, Grand Galaxy, Kota Bintang, Jakasampurna, Bintara' },
            { name: 'Bekasi Utara / Summarecon / Harapan Indah', alias: 'Summarecon Bekasi, Harapan Indah, Teluk Pucung, Kaliabang' },
            { name: 'Jatiasih / Pondok Gede', alias: 'Jatiasih, Pondok Gede, Jatisampurna, Jatibening, Jatiwaringin' },
            { name: 'Bekasi Timur / Rawalumbu', alias: 'Bekasi Timur, Rawalumbu, Pengasinan, Margahayu' },
            { name: 'Bekasi Selatan', alias: 'Pekayon Jaya, Jakamulya, Jakasetia' }
        ]
    },
    {
        id: 'kabbekasi',
        name: 'Kabupaten Bekasi',
        group: 'Jawa Barat',
        icon: 'fa-industry',
        badge: 'Kabupaten',
        cityId: '9766527f2b5d3e95d4a733fcfb77bd7e',
        baseCity: 'KAB. BEKASI',
        districts: [
            { name: 'Cikarang Pusat / Jababeka / Lippo', alias: 'Cikarang, Jababeka, Lippo Cikarang, Deltamas' },
            { name: 'Cikarang Barat / Cibitung', alias: 'Cibitung, MM2100, Danau Indah' },
            { name: 'Tambun Selatan / Tambun Utara', alias: 'Tambun, Mangunjaya, Sumberjaya' }
        ]
    },
    {
        id: 'depok',
        name: 'Kota Depok',
        group: 'Jawa Barat',
        icon: 'fa-graduation-cap',
        badge: 'Kota Otonom',
        cityId: '31fefc0e570cb3860f2a6d4b38c6490d',
        baseCity: 'KOTA DEPOK',
        districts: [
            { name: 'Beji / Margonda / UI', alias: 'Margonda, Universitas Indonesia, UI, Pondok Cina, Kukusan, Tanah Baru' },
            { name: 'Cinere / Sawangan / Bojongsari', alias: 'Cinere, Gandul, Sawangan, Bojongsari, Limo' },
            { name: 'Cimanggis / Tapos / Cibubur Depok', alias: 'Cimanggis, Tapos, Cisalak, Harjamukti' },
            { name: 'Pancoran Mas / Sukmajaya / GDC', alias: 'Pancoran Mas, Sukmajaya, Cilodong, Grand Depok City, GDC' }
        ]
    },
    {
        id: 'kotabogor',
        name: 'Kota Bogor',
        group: 'Jawa Barat',
        icon: 'fa-tree',
        badge: 'Kota Otonom',
        cityId: '6cdd60ea0045eb7a6ec44c54d29ed402',
        baseCity: 'KOTA BOGOR',
        districts: [
            { name: 'Bogor Tengah / Kebun Raya / Pajajaran', alias: 'Kebun Raya Bogor, Pajajaran, Baranangsiang, Babakan' },
            { name: 'Bogor Barat / Yasmin', alias: 'Taman Yasmin, Bubulak, Cilendek' },
            { name: 'Bogor Timur / Tajur', alias: 'Tajur, Katulampa, Sukasari' },
            { name: 'Bogor Selatan / Batutulis', alias: 'Batutulis, Bondongan, Empang' }
        ]
    },
    {
        id: 'kabbogor',
        name: 'Kabupaten Bogor',
        group: 'Jawa Barat',
        icon: 'fa-mountain',
        badge: 'Kabupaten',
        cityId: '7e7757b1e12abcb736ab9a754ffb617a',
        baseCity: 'KAB. BOGOR',
        districts: [
            { name: 'Sentul / Cibinong', alias: 'Sentul City, Sentul, Cibinong, Pakansari, Sukaraja' },
            { name: 'Cisarua / Megamendung / Puncak', alias: 'Puncak, Cisarua, Megamendung, Ciawi' },
            { name: 'Gunung Putri / Cileungsi', alias: 'Gunung Putri, Cileungsi, Kota Wisata, Cibubur Junction' }
        ]
    },

    // =========================================================
    // 3. KOTA-KOTA BESAR JAWA & INDONESIA
    // =========================================================
    {
        id: 'bandung',
        name: 'Kota Bandung',
        group: 'Jawa Barat',
        icon: 'fa-mountain-sun',
        badge: 'Kota Metropolitan',
        cityId: 'c399862d3b9d6b76c8436e924a68c45b',
        baseCity: 'KOTA BANDUNG',
        districts: [
            { name: 'Coblong / Dago / ITB', alias: 'Dago, ITB, Dipatiukur, Sadang Serang' },
            { name: 'Sukajadi / Pasteur', alias: 'Pasteur, PVJ, Sukawarna, Gegerkalong' },
            { name: 'Sumur Bandung / Braga / Riau', alias: 'Braga, Jalan Riau, Merdeka, Kebon Pisang' },
            { name: 'Lengkong / Buah Batu', alias: 'Buah Batu, Cijagra, Turangga' },
            { name: 'Antapani / Arcamanik', alias: 'Antapani, Arcamanik, Cisaranten' }
        ]
    },
    {
        id: 'surabaya',
        name: 'Kota Surabaya',
        group: 'Jawa Timur',
        icon: 'fa-water',
        badge: 'Kota Metropolitan',
        cityId: 'e4da3b7fbbce2345d7772b0674a318d5',
        baseCity: 'KOTA SURABAYA',
        districts: [
            { name: 'Gubeng / Darmo / Pusat', alias: 'Gubeng, Darmo, Tunjungan, Airlangga' },
            { name: 'Rungkut / MERR', alias: 'Rungkut, Gunung Anyar, Wonorejo' },
            { name: 'Wiyung / Pakuwon / Surabaya Barat', alias: 'Pakuwon, Graha Family, Citraland' },
            { name: 'Kenjeran / Sukolilo / ITS', alias: 'ITS, Kenjeran, Mulyorejo, Keputih' },
            { name: 'Wonokromo', alias: 'Wonokromo, Jagir, Sawunggaling' }
        ]
    },
    {
        id: 'semarang',
        name: 'Kota Semarang',
        group: 'Jawa Tengah',
        icon: 'fa-landmark',
        badge: 'Kota Utama',
        cityId: '98f13708210194c475687be6106a3b84',
        baseCity: 'KOTA SEMARANG',
        districts: [
            { name: 'Semarang Tengah / Simpang Lima', alias: 'Simpang Lima, Pandanaran, Pekunden' },
            { name: 'Banyumanik / Tembalang / UNDIP', alias: 'UNDIP, Tembalang, Banyumanik, Pedalangan' },
            { name: 'Gajahmungkur / Candi', alias: 'Candi, Bendan Duwur, Lempongsari' }
        ]
    },
    {
        id: 'yogyakarta',
        name: 'Kota Yogyakarta / DIY',
        group: 'DI Yogyakarta',
        icon: 'fa-archway',
        badge: 'Daerah Istimewa',
        cityId: '33e75ff09dd601bbe69f351039152189',
        baseCity: 'KOTA YOGYAKARTA',
        districts: [
            { name: 'Danurejan / Malioboro / Kraton', alias: 'Malioboro, Kraton, Ngampilan, Sosromenduran' },
            { name: 'Depok Sleman / UGM / UNY', alias: 'UGM, UNY, Gejayan, Seturan, Babarsari' },
            { name: 'Gondokusuman / Kotabaru', alias: 'Kotabaru, Terban, Klitren' },
            { name: 'Kotagede / Umbulharjo', alias: 'Kotagede, Giwangan, Pandeyan' }
        ]
    },
    {
        id: 'medan',
        name: 'Kota Medan',
        group: 'Sumatera Utara',
        icon: 'fa-mosque',
        badge: 'Kota Metropolitan',
        cityId: '2b44928ae11fb9384c4cf38708677c38',
        baseCity: 'KOTA MEDAN',
        districts: [
            { name: 'Medan Kota / Masjid Raya', alias: 'Masjid Raya Al-Mashun, Istana Maimun, Pasar Baru' },
            { name: 'Medan Petisah / Medan Baru / USU', alias: 'USU, Petisah, Padang Bulan' },
            { name: 'Medan Sunggal / Ringroad', alias: 'Ringroad, Sunggal, Setia Budi Medan' }
        ]
    },
    {
        id: 'makassar',
        name: 'Kota Makassar',
        group: 'Sulawesi Selatan',
        icon: 'fa-anchor',
        badge: 'Kota Metropolitan',
        cityId: '6883966e9773ec8d09cb88f730617b31',
        baseCity: 'KOTA MAKASSAR',
        districts: [
            { name: 'Ujung Pandang / Pantai Losari', alias: 'Pantai Losari, Somba Opu, Maloku' },
            { name: 'Panakkukang / Pettarani', alias: 'Pettarani, Boulevard, Panakkukang' },
            { name: 'Tamalanrea / UNHAS', alias: 'UNHAS, Perintis Kemerdekaan, Tamalanrea' }
        ]
    }
];
