import 'package:flutter/material.dart';
import '../services/auth_service.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() =>
      _RegisterScreenState();
}

class _RegisterScreenState
    extends State<RegisterScreen> {

  final fullNameController =
      TextEditingController();

  final emailController =
      TextEditingController();

  final passwordController =
      TextEditingController();

  bool isLoading = false;

  Future<void> handleRegister() async {

    if (fullNameController.text.isEmpty ||
        emailController.text.isEmpty ||
        passwordController.text.isEmpty) {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Semua field wajib diisi",
          ),
        ),
      );

      return;
    }

    if (passwordController.text.length <
        6) {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Password minimal 6 karakter",
          ),
        ),
      );

      return;
    }

    try {

      setState(() {
        isLoading = true;
      });

      final result =
          await AuthService.register(
        fullNameController.text,
        emailController.text,
        passwordController.text,
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context)
          .showSnackBar(
        SnackBar(
          content: Text(
            result["message"] ??
                "Register berhasil",
          ),
        ),
      );

      Navigator.pop(context);

    } catch (e) {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        SnackBar(
          content: Text(
            e.toString(),
          ),
        ),
      );

    } finally {

      setState(() {
        isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Register",
        ),
      ),

      body: Padding(
        padding:
            const EdgeInsets.all(24),

        child: Column(
          children: [

            TextField(
              controller:
                  fullNameController,
              decoration:
                  const InputDecoration(
                labelText:
                    "Nama Lengkap",
                border:
                    OutlineInputBorder(),
              ),
            ),

            const SizedBox(
              height: 16,
            ),

            TextField(
              controller:
                  emailController,
              decoration:
                  const InputDecoration(
                labelText: "Email",
                border:
                    OutlineInputBorder(),
              ),
            ),

            const SizedBox(
              height: 16,
            ),

            TextField(
              controller:
                  passwordController,
              obscureText: true,
              decoration:
                  const InputDecoration(
                labelText:
                    "Password",
                border:
                    OutlineInputBorder(),
              ),
            ),

            const SizedBox(
              height: 24,
            ),

            SizedBox(
              width:
                  double.infinity,
              height: 50,

              child:
                  ElevatedButton(
                onPressed:
                    isLoading
                        ? null
                        : handleRegister,

                child: isLoading
                    ? const CircularProgressIndicator()
                    : const Text(
                        "REGISTER",
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}