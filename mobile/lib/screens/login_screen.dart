import 'package:flutter/material.dart';
import 'register_screen.dart';
import '../services/auth_service.dart';
import 'reports_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailController = TextEditingController();

  final passwordController = TextEditingController();

  bool isLoading = false;

  Future<void> handleLogin() async {

    if (emailController.text.isEmpty ||
        passwordController.text.isEmpty) {

      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text(
            "Email dan password tidak boleh kosong",
          ),
        ),
      );

      return;
    }

    try {

      setState(() {
        isLoading = true;
      });

      final result = await AuthService.login(
        emailController.text,
        passwordController.text,
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          content: Text(
            result["message"] ??
                "Login berhasil",
          ),
        ),
      );

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) =>
              const ReportsScreen(),
        ),
      );

    } catch (e) {

      ScaffoldMessenger.of(
        context,
      ).showSnackBar(
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
      backgroundColor:
          const Color(0xfff8fafc),

      body: Center(
        child: SingleChildScrollView(
          padding:
              const EdgeInsets.all(24),

          child: Container(
            constraints:
                const BoxConstraints(
              maxWidth: 400,
            ),

            child: Column(
              crossAxisAlignment:
                  CrossAxisAlignment.stretch,

              children: [
                const Icon(
                  Icons.water,
                  size: 80,
                  color: Colors.blue,
                ),

                const SizedBox(
                  height: 20,
                ),

                const Text(
                  "Dragon Waterpark",
                  textAlign:
                      TextAlign.center,
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight:
                        FontWeight.bold,
                  ),
                ),

                const SizedBox(
                  height: 8,
                ),

                const Text(
                  "Lost & Found",
                  textAlign:
                      TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                ),

                const SizedBox(
                  height: 40,
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
                  height: 50,

                  child:
                      ElevatedButton(
                    onPressed:
                        isLoading
                            ? null
                            : handleLogin,

                    child: isLoading
                        ? const CircularProgressIndicator(
                            color:
                                Colors.white,
                          )
                        : const Text(
                            "LOGIN",
                          ),
                  ),
                ),

                const SizedBox(
                  height: 16,
                ),

                TextButton(
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            const RegisterScreen(),
                      ),
                    );
                  },
                  child: const Text(
                    "Belum punya akun? Register",
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}