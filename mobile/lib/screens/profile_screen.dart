import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'login_screen.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() =>
      _ProfileScreenState();
}

class _ProfileScreenState
    extends State<ProfileScreen> {

  String name = "-";
  String email = "-";

  @override
  void initState() {
    super.initState();
    loadProfile();
  }

  Future<void> loadProfile() async {

    final prefs =
        await SharedPreferences.getInstance();

    setState(() {
      name =
          prefs.getString("name") ??
              "-";

      email =
          prefs.getString("email") ??
              "-";
    });
  }

  Future<void> logout() async {

    final confirm =
        await showDialog<bool>(
      context: context,

      builder: (context) {
        return AlertDialog(
          title: const Text(
            "Logout",
          ),

          content: const Text(
            "Apakah Anda yakin ingin logout?",
          ),

          actions: [

            TextButton(
              onPressed: () {
                Navigator.pop(
                  context,
                  false,
                );
              },

              child: const Text(
                "Batal",
              ),
            ),

            ElevatedButton(
              onPressed: () {
                Navigator.pop(
                  context,
                  true,
                );
              },

              child: const Text(
                "Logout",
              ),
            ),
          ],
        );
      },
    );

    if (confirm != true) {
      return;
    }

    final prefs =
        await SharedPreferences.getInstance();

    await prefs.remove(
      "isLoggedIn",
    );

    await prefs.remove(
      "name",
    );

    await prefs.remove(
      "email",
    );

    if (!mounted) return;

    Navigator.pushAndRemoveUntil(
      context,
      MaterialPageRoute(
        builder: (_) =>
            const LoginScreen(),
      ),
      (route) => false,
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Profil Saya",
        ),
      ),

      body: Padding(
        padding: const EdgeInsets.all(24),

        child: Column(
          children: [

            const CircleAvatar(
              radius: 50,
              child: Icon(
                Icons.person,
                size: 50,
              ),
            ),

            const SizedBox(
              height: 20,
            ),

            Text(
              name,
              style: const TextStyle(
                fontSize: 22,
                fontWeight:
                    FontWeight.bold,
              ),
            ),

            const SizedBox(
              height: 8,
            ),

            Text(
              email,
            ),

            const SizedBox(
              height: 8,
            ),

            const Text(
              "Role: User",
            ),

            const SizedBox(
              height: 30,
            ),

            SizedBox(
              width: double.infinity,
              height: 50,

              child: ElevatedButton.icon(
                icon: const Icon(
                  Icons.logout,
                ),

                label: const Text(
                  "LOGOUT",
                ),

                onPressed: logout,
              ),
            ),
          ],
        ),
      ),
    );
  }
}