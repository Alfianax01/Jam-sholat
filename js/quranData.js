/**
 * QURANDATA.JS - Comprehensive 31 Curated Daily Motivational Quran Verses & Reflections
 * Automatically updates every single day at 00:00 (1 Unique Verse for Each Day of the Month)
 */

const DAILY_MOTIVATIONAL_VERSES = [
    // Hari 1
    {
        day: 1,
        surah: "QS. Al-Insyirah: 5-6",
        topic: "Kemudahan & Harapan",
        arab: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
        translation: "Maka sesungguhnya beserta kesulitan ada kemudahan, sesungguhnya beserta kesulitan itu ada kemudahan.",
        reflection: "Yakinlah bahwa setiap kesulitan hidup selalu dipaketkan oleh Allah bersama jalan keluar dan kemudahan. Tetap berprasangka baik dan optimis."
    },
    // Hari 2
    {
        day: 2,
        surah: "QS. Al-Baqarah: 286",
        topic: "Kekuatan Diri & Ujian",
        arab: "لَا يُكَلِّفُ اللّٰهُ نَفْسًا اِلَّا وُسْعَهَا",
        translation: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.",
        reflection: "Allah Mahatahu seberapa kuat pundakmu. Tidak ada ujian yang datang melampaui kapasitasmu untuk melewatinya dengan sabar dan tawakal."
    },
    // Hari 3
    {
        day: 3,
        surah: "QS. At-Talaq: 2-3",
        topic: "Rezeki & Jalan Keluar",
        arab: "وَمَنْ يَّتَّقِ اللّٰهَ يَجْعَلْ لَّهٗ مَخْرَجًا ۝ وَّيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ",
        translation: "Barangsiapa bertakwa kepada Allah niscaya Dia akan membukakan jalan keluar baginya, dan Dia memberinya rezeki dari arah yang tidak disangka-sangkanya.",
        reflection: "Jaga integritas dan ketakwaan dalam setiap langkah. Rezeki dan solusi dari Allah seringkali hadir melalui pintu yang tak terduga."
    },
    // Hari 4
    {
        day: 4,
        surah: "QS. Ar-Ra'd: 28",
        topic: "Ketenangan Jiwa & Dzikir",
        arab: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ",
        translation: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.",
        reflection: "Ketika dunia terasa bising dan melelahkan, kembalilah bersujud dan berdzikir. Ketenangan sejati bukan pada kesempurnaan dunia, melainkan kedekatan dengan Sang Pencipta."
    },
    // Hari 5
    {
        day: 5,
        surah: "QS. Ali 'Imran: 139",
        topic: "Pantang Menyerah",
        arab: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنْتُمُ الْأَعْلَوْنَ إِنْ كُنْتُمْ مُؤْمِنِينَ",
        translation: "Dan janganlah kamu (merasa) lemah, dan jangan (pula) bersedih hati, sebab kamu paling tinggi (derajatnya), jika kamu orang-orang beriman.",
        reflection: "Jangan biarkan kegagalan kemarin meredupkan semangatmu hari ini. Bangkitlah dengan iman, doa, dan tekad yang lebih kokoh."
    },
    // Hari 6
    {
        day: 6,
        surah: "QS. Al-Baqarah: 153",
        topic: "Sabar & Sholat",
        arab: "يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
        translation: "Wahai orang-orang yang beriman! Mohonlah pertolongan (kepada Allah) dengan sabar dan sholat. Sungguh, Allah beserta orang-orang yang sabar.",
        reflection: "Kombinasi terbaik menghadapi tantangan hidup adalah kesabaran dalam ikhtiar dan ketulusan dalam doa saat bersujud."
    },
    // Hari 7
    {
        day: 7,
        surah: "QS. Ad-Duha: 4-5",
        topic: "Masa Depan Cerah",
        arab: "وَلَلْآخِرَةُ خَيْرٌ لَّكَ مِنَ الْأُولَىٰ ۝ وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ",
        translation: "Dan sungguh, yang kemudian itu lebih baik bagimu daripada yang permulaan. Dan sungguh, kelak Tuhanmu pasti memberikan karunia-Nya kepadamu, sehingga engkau menjadi puas.",
        reflection: "Masa depan yang indah sedang dipersiapkan oleh Allah untukmu. Teruslah berbuat kebaikan dan percayai proses terbaik dari-Nya."
    },
    // Hari 8
    {
        day: 8,
        surah: "QS. Ibrahim: 7",
        topic: "Syukur & Keberkahan",
        arab: "لَئِنْ شَكَرْتُمْ لَأَزِيدَنَّكُمْ ۖ وَلَئِنْ كَفَرْتُمْ إِنَّ عَذَابِي لَشَدِيدٌ",
        translation: "Sesungguhnya jika kamu bersyukur, niscaya Aku akan menambah (nikmat) kepadamu.",
        reflection: "Syukur adalah kunci yang melipatgandakan nikmat dan mengundang keberkahan hidup. Mulailah harimu dengan mensyukuri nafas dan nikmat kecil."
    },
    // Hari 9
    {
        day: 9,
        surah: "QS. At-Talaq: 3",
        topic: "Tawakal & Kecukupan",
        arab: "وَمَنْ يَتَوَكَّلْ عَلَى اللَّهِ فَهُوَ حَسْبُهُ ۚ إِنَّ اللَّهَ بَالِغُ أَمْرِهِ",
        translation: "Dan barangsiapa bertawakal kepada Allah, niscaya Allah akan mencukupkan (keperluan)nya. Sesungguhnya Allah melaksanakan urusan-Nya.",
        reflection: "Serahkan hasil akhir setiap usahamu kepada Allah setelah ikhtiar maksimal. Siapa yang bersandar kepada Allah tidak akan pernah terlantar."
    },
    // Hari 10
    {
        day: 10,
        surah: "QS. Al-Baqarah: 186",
        topic: "Kedekatan & Terkabulnya Doa",
        arab: "وَإِذَا سَأَلَكَ عِبَادِي عَنِّي فَإِنِّي قَرِيبٌ ۖ أُجِيبُ دَعْوَةَ الدَّاعِ إِذَا دَعَانِ",
        translation: "Dan apabila hamba-hamba-Ku bertanya kepadamu tentang Aku, maka sesungguhnya Aku dekat. Aku mengabulkan permohonan orang yang berdoa apabila dia berdoa kepada-Ku.",
        reflection: "Allah begitu dekat denganmu, mendengar bisikan hatimu bahkan sebelum kata-kata terucap. Jangan pernah bosan memohon dan mengetuk pintu langit."
    },
    // Hari 11
    {
        day: 11,
        surah: "QS. Al-Baqarah: 216",
        topic: "Hikmah & Prasangka Baik",
        arab: "وَعَسَىٰ أَنْ تَكْرَهُوا شَيْئًا وَهُوَ خَيْرٌ لَكُمْ ۖ وَعَسَىٰ أَنْ تُحِبُّوا شَيْئًا وَهُوَ شَرٌّ لَكُمْ",
        translation: "Tetapi boleh jadi kamu tidak menyukai sesuatu, padahal itu baik bagimu, dan boleh jadi kamu menyukai sesuatu, padahal itu buruk bagimu. Allah mengetahui, sedang kamu tidak mengetahui.",
        reflection: "Rencana Allah selalu lebih indah dari rencana kita. Terimalah takdir dengan lapang dada karena di balik ketetapan-Nya tersimpan rahasia kebaikan yang luas."
    },
    // Hari 12
    {
        day: 12,
        surah: "QS. Az-Zumar: 53",
        topic: "Rahmat & Ampunan Luas",
        arab: "لَا تَقْنَطُوا مِنْ رَحْمَةِ اللَّهِ ۚ إِنَّ اللَّهَ يَغْفِرُ الذُّنُوبَ جَمِيعًا",
        translation: "Janganlah kamu berputus asa dari rahmat Allah. Sesungguhnya Allah mengampuni dosa-dosa semuanya.",
        reflection: "Sebesar apa pun kesalahan masa lalu, pintu taubat dan kasih sayang Allah selalu terbuka lebar bagi siapa pun yang ingin kembali memperbaiki diri."
    },
    // Hari 13
    {
        day: 13,
        surah: "QS. Ar-Rahman: 60",
        topic: "Balasan Kebaikan",
        arab: "هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ",
        translation: "Tidak ada balasan untuk kebaikan selain kebaikan (pula).",
        reflection: "Tanamlah benih kebaikan kepada siapa saja tanpa pamrih. Kebaikan yang kamu tabur pasti akan kembali kepadamu dalam bentuk yang tak terduga."
    },
    // Hari 14
    {
        day: 14,
        surah: "QS. Al-Baqarah: 214",
        topic: "Pertolongan Dekat",
        arab: "أَلَا إِنَّ نَصْرَ اللَّهِ قَرِيبٌ",
        translation: "Ingatlah, sesungguhnya pertolongan Allah itu sangat dekat.",
        reflection: "Di saat kamu merasa berada di titik tergelap, fajar kemenangan dan pertolongan Allah justru sedang semakin mendekat. Bertahanlah sebentar lagi."
    },
    // Hari 15
    {
        day: 15,
        surah: "QS. Ar-Ra'd: 11",
        topic: "Ikhtiar & Perubahan",
        arab: "إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنْفُسِهِمْ",
        translation: "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sebelum mereka mengubah keadaan diri mereka sendiri.",
        reflection: "Perubahan nasib bermula dari langkah kecil mengubah pola pikir, kebiasaan, dan kesungguhan diri sendiri hari demi hari."
    },
    // Hari 16
    {
        day: 16,
        surah: "QS. Al-Insyirah: 7-8",
        topic: "Fokus & Produktivitas",
        arab: "فَإِذَا فَرَغْتَ فَانْصَبْ ۝ وَإِلَىٰ رَبِّكَ فَارْغَبْ",
        translation: "Maka apabila engkau telah selesai (dari suatu urusan), tetaplah bekerja keras (untuk urusan yang lain), dan hanya kepada Tuhanmulah engkau berharap.",
        reflection: "Jadilah pribadi yang produktif dan bermanfaat. Selesaikan satu amanah, lalu bergegas menuju kebaikan berikutnya hanya demi ridha Ilahi."
    },
    // Hari 17
    {
        day: 17,
        surah: "QS. Al-Ankabut: 69",
        topic: "Kesungguhan Ikhtiar",
        arab: "وَالَّذِينَ جَاهَدُوا فِينَا لَنَهْدِيَنَّهُمْ سُبُلَنَا ۚ وَإِنَّ اللَّهَ لَمَعَ الْمُحْسِنِينَ",
        translation: "Dan orang-orang yang berjihad untuk (mencari keridhaan) Kami, sungguh, Kami akan tunjukkan kepada mereka jalan-jalan Kami. Dan sungguh, Allah beserta orang-orang yang berbuat baik.",
        reflection: "Siapa pun yang bersungguh-sungguh melangkah di jalan kebaikan, Allah sendiri yang akan membimbing dan membukakan jalan kemudahan baginya."
    },
    // Hari 18
    {
        day: 18,
        surah: "QS. An-Najm: 39-40",
        topic: "Hasil Kerja Keras",
        arab: "وَأَنْ لَيْسَ لِلْإِنْسَانِ إِلَّا مَا سَعَىٰ ۝ وَأَنَّ سَعْيَهُ سَوْفَ يُرَىٰ",
        translation: "Dan bahwa manusia hanya memperoleh apa yang telah diusahakannya, dan sesungguhnya usahanya itu kelak akan diperlihatkan (kepadanya).",
        reflection: "Tidak ada keringat dan lelah yang sia-sia di mata Allah. Setiap butir usaha tulusmu akan dinilai dan dibalas dengan pahala yang berlipat ganda."
    },
    // Hari 19
    {
        day: 19,
        surah: "QS. Al-Furqan: 63",
        topic: "Kerendahan Hati",
        arab: "وَعِبَادُ الرَّحْمَٰنِ الَّذِينَ يَمْشُونَ عَلَى الْأَرْضِ هَوْنًا وَإِذَا خَاطَبَهُمُ الْجَاهِلُونَ قَالُوا سَلَامًا",
        translation: "Adapun hamba-hamba Tuhan Yang Maha Pengasih itu adalah orang-orang yang berjalan di bumi dengan rendah hati dan apabila orang-orang bodoh menyapa mereka (dengan kata-kata yang menghina), mereka mengucapkan 'Salam'.",
        reflection: "Kemuliaan sejati terletak pada kerendahan hati dan kesantunan akhlak, bukan pada keangkuhan atau membalas cercaan dengan amarah."
    },
    // Hari 20
    {
        day: 20,
        surah: "QS. Nuh: 10-12",
        topic: "Keutamaan Istighfar",
        arab: "فَقُلْتُ اسْتَغْفِرُوا رَبَّكُمْ إِنَّهُ كَانَ غَفَّارًا ۝ يُرْسِلِ السَّمَاءَ عَلَيْكُمْ مِدْرَارًا",
        translation: "Maka aku berkata (kepada mereka), 'Mohonlah ampunan kepada Tuhanmu, sungguh, Dia Maha Pengampun, niscaya Dia akan menurunkan hujan yang lebat kepadamu.'",
        reflection: "Perbanyaklah istighfar setiap waktu. Istighfar adalah pembuka pintu rezeki, penghapus kegundahan, dan penarik rahmat Allah."
    },
    // Hari 21
    {
        day: 21,
        surah: "QS. Al-Baqarah: 261",
        topic: "Keberkahan Sedekah",
        arab: "مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ فِي كُلِّ سُنْبُلَةٍ مِائَةُ حَبَّةٍ",
        translation: "Perumpamaan orang yang menginfakkan hartanya di jalan Allah seperti sebutir biji yang menumbuhkan tujuh tangkai, pada setiap tangkai ada seratus biji.",
        reflection: "Harta yang disedekahkan tidak akan pernah berkurang, melainkan berlipat ganda dan menjadi naungan penuh berkah di dunia maupun akhirat."
    },
    // Hari 22
    {
        day: 22,
        surah: "QS. Fussilat: 34",
        topic: "Kebaikan Meluluhkan Hati",
        arab: "ادْفَعْ بِالَّتِي هِيَ أَحْسَنُ فَإِذَا الَّذِي بَيْنَكَ وَبَيْنَهُ عَدَاوَةٌ كَأَنَّهُ وَلِيٌّ حَمِيمٌ",
        translation: "Tolaklah (kejahatan itu) dengan cara yang lebih baik, sehingga orang yang ada permusuhan antara engkau dan dia akan menjadi seperti teman yang setia.",
        reflection: "Balaslah kebencian dengan senyuman dan kebaikan. Kebaikan yang tulus memiliki kekuatan magis untuk meluluhkan hati yang paling keras."
    },
    // Hari 23
    {
        day: 23,
        surah: "QS. Al-Hujurat: 12",
        topic: "Menjaga Hati & Prasangka",
        arab: "يَا أَيُّهَا الَّذِينَ آمَنُوا اجْتَنِبُوا كَثِيرًا مِنَ الظَّنِّ إِنَّ بَعْضَ الظَّنِّ إِثْمٌ",
        translation: "Wahai orang-orang yang beriman! Jauhilah banyak dari prasangka, sesungguhnya sebagian prasangka itu dosa.",
        reflection: "Jaga kejernihan hatimu dari prasangka buruk dan gosip. Hati yang bersih akan selalu memancarkan kedamaian bagi orang-orang di sekitarmu."
    },
    // Hari 24
    {
        day: 24,
        surah: "QS. Al-Hasyr: 18",
        topic: "Evaluasi Diri & Masa Depan",
        arab: "يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ وَلْتَنْظُرْ نَفْسٌ مَا قَدَّمَتْ لِغَدٍ",
        translation: "Wahai orang-orang yang beriman! Bertakwalah kepada Allah dan hendaklah setiap orang memperhatikan apa yang telah diperbuatnya untuk hari esok.",
        reflection: "Luangkan sejenak waktu untuk bermuhasabah hari ini. Persiapkan bekal terbaik untuk kehidupan masa depan yang kekal."
    },
    // Hari 25
    {
        day: 25,
        surah: "QS. Az-Zumar: 10",
        topic: "Pahala Sabar Tanpa Batas",
        arab: "إِنَّمَا يُوَفَّى الصَّابِرُونَ أَجْرَهُمْ بِغَيْرِ حِسَابٍ",
        translation: "Hanya orang-orang yang bersabarlah yang disempurnakan pahalanya tanpa batas.",
        reflection: "Kesabaranmu saat menahan amarah, sabar dalam ketaatan, dan sabar saat diuji adalah ladang pahala tanpa batas di sisi Allah."
    },
    // Hari 26
    {
        day: 26,
        surah: "QS. Al-Ankabut: 45",
        topic: "Kekuatan Sholat",
        arab: "إِنَّ الصَّلَاةَ تَنْهَىٰ عَنِ الْفَحْشَاءِ وَالْمُنْكَرِ ۗ وَلَذِكْرُ اللَّهِ أَكْبَرُ",
        translation: "Sesungguhnya sholat itu mencegah dari (perbuatan) keji dan mungkar. Dan (ketahuilah) mengingat Allah (sholat) itu lebih besar (keutamaannya).",
        reflection: "Jadikan sholat sebagai tiang penopang hidup dan tempat perlindungan dari segala kekhilafan. Sholat yang khusyuk akan menjaga langkahmu tetap lurus."
    },
    // Hari 27
    {
        day: 27,
        surah: "QS. Al-Qalam: 4",
        topic: "Akhlak Mulia",
        arab: "وَإِنَّكَ لَعَلَىٰ خُلُقٍ عَظِيمٍ",
        translation: "Dan sesungguhnya engkau benar-benar berbudi pekerti yang luhur.",
        reflection: "Teladanilah keindahan akhlak Rasulullah SAW. Senyum, keramahan, kejujuran, dan kepedulian adalah dakwah nyata yang paling berkesan."
    },
    // Hari 28
    {
        day: 28,
        surah: "QS. Yunus: 62",
        topic: "Kedamaian Kekasih Allah",
        arab: "أَلَا إِنَّ أَوْلِيَاءَ اللَّهِ لَا خَوْفٌ عَلَيْهِمْ وَلَا هُمْ يَحْزَنُونَ",
        translation: "Ingatlah, sesungguhnya wali-wali Allah itu, tidak ada rasa takut pada mereka dan mereka tidak bersedih hati.",
        reflection: "Ketika hidupmu dipenuhi cinta dan ketundukan kepada Allah, rasa cemas akan masa depan dan kesedihan masa lalu akan digantikan dengan kedamaian hakiki."
    },
    // Hari 29
    {
        day: 29,
        surah: "QS. Al-Isra': 23",
        topic: "Berbakti Kepada Orang Tua",
        arab: "وَقَضَىٰ رَبُّكَ أَلَّا تَعْبُدُوا إِلَّا إِيَّاهُ وَبِالْوَالِدَيْنِ إِحْسَانًا",
        translation: "Dan Tuhanmu telah memerintahkan agar kamu jangan menyembah selain Dia dan hendaklah berbuat baik kepada ibu bapak.",
        reflection: "Ridha Allah terletak pada ridha kedua orang tua. Luangkan waktu untuk menyapa, mendoakan, dan membahagiakan mereka selagi ada."
    },
    // Hari 30
    {
        day: 30,
        surah: "QS. Al-Mukminun: 1-2",
        topic: "Kemenangan Orang Beriman",
        arab: "قَدْ أَفْلَحَ الْمُؤْمِنُونَ ۝ الَّذِينَ هُمْ فِي صَلَاتِهِمْ خَاشِعُونَ",
        translation: "Sungguh beruntung orang-orang yang beriman, (yaitu) orang yang khusyuk dalam sholatnya.",
        reflection: "Kemenangan dan keberuntungan sejati bermula dari kualitas hubungan kita dengan Allah saat berdiri menghadap-Nya dalam sholat."
    },
    // Hari 31
    {
        day: 31,
        surah: "QS. An-Nur: 35",
        topic: "Cahaya Petunjuk",
        arab: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
        translation: "Allah (pemberi) cahaya (kepada) langit dan bumi.",
        reflection: "Mintalah selalu cahaya petunjuk dari Allah dalam setiap keputusan hidupmu. Hati yang disinari petunjuk-Nya tidak akan pernah tersesat."
    }
];

/**
 * Automatically displays a unique verse for each day of the month (1st through 31st)
 * When date changes at 00:00 midnight, the verse switches automatically!
 */
function displayDailyMotivationalVerse(date = new Date()) {
    const dayOfMonth = date.getDate(); // 1 to 31
    // Index is 0-indexed (0 to 30)
    const index = (dayOfMonth - 1) % DAILY_MOTIVATIONAL_VERSES.length;
    state.currentVerseIndex = index;
    renderVerse(DAILY_MOTIVATIONAL_VERSES[index]);
}

function renderVerse(verse) {
    if (!verse) return;
    const quoteTopicBadge = document.getElementById('quoteTopicBadge');
    const quranSurahName = document.getElementById('quranSurahName');
    const quranArabicText = document.getElementById('quranArabicText');
    const quranTranslationText = document.getElementById('quranTranslationText');
    const quranReflectionText = document.getElementById('quranReflectionText');

    if (quoteTopicBadge) quoteTopicBadge.textContent = verse.topic || "Inspirasi Harian";
    if (quranSurahName) quranSurahName.textContent = verse.surah;
    if (quranArabicText) quranArabicText.textContent = verse.arab;
    if (quranTranslationText) quranTranslationText.textContent = `"${verse.translation}"`;
    if (quranReflectionText) quranReflectionText.innerHTML = `<strong>Pesan Renungan:</strong> ${verse.reflection}`;
}

function shuffleMotivationalVerse() {
    state.currentVerseIndex = (state.currentVerseIndex + 1) % DAILY_MOTIVATIONAL_VERSES.length;
    renderVerse(DAILY_MOTIVATIONAL_VERSES[state.currentVerseIndex]);
}
