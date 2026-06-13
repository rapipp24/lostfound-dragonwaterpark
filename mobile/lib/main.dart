import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'screens/login_screen.dart';
import 'screens/reports_screen.dart';

Future<void> main() async {

  WidgetsFlutterBinding.ensureInitialized();

  await dotenv.load(
    fileName: ".env",
  );

  runApp(
    const MyApp(),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  Future<bool> isLoggedIn() async {

    final prefs =
        await SharedPreferences.getInstance();

    return prefs.getBool(
          "isLoggedIn",
        ) ??
        false;
  }

  @override
  Widget build(BuildContext context) {

    return MaterialApp(
  debugShowCheckedModeBanner: false,

  theme: ThemeData(
    useMaterial3: true,

    colorScheme: ColorScheme.fromSeed(
      seedColor: const Color(0xFF6C63FF),
    ),

    scaffoldBackgroundColor:
        const Color(0xFFF8F7FC),
  ),

  home: FutureBuilder<bool>(
        future: isLoggedIn(),

        builder: (
          context,
          snapshot,
        ) {

          if (!snapshot.hasData) {

            return const Scaffold(
              body: Center(
                child:
                    CircularProgressIndicator(),
              ),
            );
          }

          return snapshot.data == true
              ? const ReportsScreen()
              : const LoginScreen();
        },
      ),
    );
  }
}