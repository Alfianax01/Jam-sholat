import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';
import 'core/constants/app_colors.dart';
import 'logic/providers/app_state.dart';
import 'presentation/screens/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(
    MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => AppState()),
      ],
      child: const AlWaqtApp(),
    ),
  );
}

class AlWaqtApp extends StatelessWidget {
  const AlWaqtApp({super.key});

  @override
  Widget build(BuildContext context) {
    return Consumer<AppState>(
      builder: (context, state, _) {
        final textTheme = GoogleFonts.plusJakartaSansTextTheme(
          state.isDarkMode ? ThemeData.dark().textTheme : ThemeData.light().textTheme,
        );

        return MaterialApp(
          title: 'Al-Waqt',
          debugShowCheckedModeBanner: false,
          themeMode: state.isDarkMode ? ThemeMode.dark : ThemeMode.light,
          theme: ThemeData(
            useMaterial3: true,
            brightness: Brightness.light,
            colorScheme: ColorScheme.fromSeed(
              seedColor: AppColors.emeraldPrimary,
              brightness: Brightness.light,
              primary: AppColors.emeraldPrimary,
              surface: AppColors.lightBgBase,
            ),
            textTheme: textTheme,
            scaffoldBackgroundColor: AppColors.lightBgBase,
          ),
          darkTheme: ThemeData(
            useMaterial3: true,
            brightness: Brightness.dark,
            colorScheme: ColorScheme.fromSeed(
              seedColor: AppColors.emeraldPrimary,
              brightness: Brightness.dark,
              primary: AppColors.emeraldPrimary,
              surface: AppColors.darkBgBase,
            ),
            textTheme: textTheme,
            scaffoldBackgroundColor: AppColors.darkBgBase,
          ),
          home: const HomeScreen(),
        );
      },
    );
  }
}
