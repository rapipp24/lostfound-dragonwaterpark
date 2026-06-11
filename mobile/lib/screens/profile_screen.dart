import 'package:flutter/material.dart';
import 'login_screen.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

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

            const Text(
              "Nama Pengguna",
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(
              height: 8,
            ),

            const Text(
              "user@email.com",
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

                onPressed: () {
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          const LoginScreen(),
                    ),
                    (route) => false,
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}