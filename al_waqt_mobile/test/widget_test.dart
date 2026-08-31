import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';

import 'package:al_waqt_mobile/main.dart';
import 'package:al_waqt_mobile/logic/providers/app_state.dart';

/// Helper: pump the full app (AlWaqtApp + required MultiProvider)
Future<void> pumpAlWaqtApp(WidgetTester tester, {AppState? state}) async {
  final appState = state ?? AppState();
  await tester.pumpWidget(
    ChangeNotifierProvider<AppState>.value(
      value: appState,
      child: const AlWaqtApp(),
    ),
  );
  // One frame to settle initial build
  await tester.pump();
}

void main() {
  group('Al-Waqt App Smoke Tests', () {
    testWidgets('App starts and renders Scaffold without crashing',
        (WidgetTester tester) async {
      await pumpAlWaqtApp(tester);
      expect(find.byType(Scaffold), findsOneWidget);
    });

    testWidgets('Home screen contains Arabic text widget',
        (WidgetTester tester) async {
      await pumpAlWaqtApp(tester);
      // Search all Text widgets in the tree for any Arabic script character
      final arabicWidgets = find.byWidgetPredicate((widget) {
        if (widget is Text) {
          final data = widget.data ?? '';
          // Arabic Unicode block: U+0600–U+06FF
          return data.runes.any((r) => r >= 0x0600 && r <= 0x06FF);
        }
        return false;
      });
      expect(arabicWidgets, findsAtLeastNWidgets(1));
    });

    testWidgets('Home screen shows AL-WAQT brand label',
        (WidgetTester tester) async {
      await pumpAlWaqtApp(tester);
      // Text widget with exact value 'AL-WAQT'
      expect(find.text('AL-WAQT'), findsOneWidget);
    });

    testWidgets('MaterialApp is present in widget tree',
        (WidgetTester tester) async {
      await pumpAlWaqtApp(tester);
      expect(find.byType(MaterialApp), findsOneWidget);
    });

    testWidgets('Dark/light theme toggle updates AppState',
        (WidgetTester tester) async {
      final appState = AppState();
      await pumpAlWaqtApp(tester, state: appState);

      final initialDark = appState.isDarkMode;
      appState.toggleTheme();
      await tester.pump();

      expect(appState.isDarkMode, isNot(initialDark));
      appState.dispose();
    });

    testWidgets('Audio toggle updates AppState', (WidgetTester tester) async {
      final appState = AppState();
      await pumpAlWaqtApp(tester, state: appState);

      final initialAudio = appState.audioEnabled;
      appState.toggleAudio();
      await tester.pump();

      expect(appState.audioEnabled, isNot(initialAudio));
      appState.dispose();
    });

    testWidgets('AppState currentTime is a recent DateTime',
        (WidgetTester tester) async {
      final appState = AppState();
      await pumpAlWaqtApp(tester, state: appState);

      final now = DateTime.now();
      final diff = now.difference(appState.currentTime).abs();
      // Clock should be within 5 seconds of now
      expect(diff.inSeconds, lessThan(5));
      appState.dispose();
    });
  });
}
