import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'register_screen.dart';
import '../services/auth_service.dart';
import 'reports_screen.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() =>
      _LoginScreenState();
}

class _LoginScreenState
    extends State<LoginScreen> {
  final emailController =
      TextEditingController();

  final passwordController =
      TextEditingController();

  bool isLoading = false;

  Future<void> handleLogin() async {
    if (emailController.text.isEmpty ||
        passwordController.text.isEmpty) {
      ScaffoldMessenger.of(context)
          .showSnackBar(
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

      final result =
          await AuthService.login(
        emailController.text,
        passwordController.text,
      );

      final prefs =
          await SharedPreferences.getInstance();

      await prefs.setBool(
        "isLoggedIn",
        true,
      );

      await prefs.setString(
        "token",
        result["access_token"] ?? "",
      );

      await prefs.setString(
        "email",
        emailController.text,
      );

      await prefs.setString(
        "name",
        emailController.text
            .split("@")
            .first,
      );

      if (!mounted) return;

      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) =>
              const ReportsScreen(),
        ),
      );
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

  InputDecoration buildInput(
    String label,
    IconData icon,
  ) {
    return InputDecoration(
      labelText: label,

      prefixIcon:
          Icon(icon),

      filled: true,
      fillColor: Colors.white,

      border:
          OutlineInputBorder(
        borderRadius:
            BorderRadius.circular(
          16,
        ),
      ),

      enabledBorder:
          OutlineInputBorder(
        borderRadius:
            BorderRadius.circular(
          16,
        ),
        borderSide:
            BorderSide(
          color:
              Colors.grey.shade300,
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor:
          const Color(0xFFF8F7FC),

      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding:
                const EdgeInsets.all(
              24,
            ),

            child: Container(
              constraints:
                  const BoxConstraints(
                maxWidth: 420,
              ),

              child: Column(
                children: [

                  Container(
  padding: const EdgeInsets.all(16),

  decoration: BoxDecoration(
    color: Colors.white,
    borderRadius: BorderRadius.circular(24),

    boxShadow: const [
      BoxShadow(
        color: Colors.black12,
        blurRadius: 10,
      ),
    ],
  ),

  child: Image.asset(
    "assets/Logo_Dragon_Waterpak.png",
    height: 120,
  ),
),

                  const SizedBox(
                    height: 24,
                  ),

                  const Text(
                    "Lost & Found",
                    style: TextStyle(
                      fontSize: 32,
                      fontWeight:
                          FontWeight.bold,
                    ),
                  ),

                  const SizedBox(
                    height: 8,
                  ),

                  Text(
                    "Dragon Waterpark",
                    style: TextStyle(
                      color:
                          Colors.grey[600],
                      fontSize: 16,
                    ),
                  ),

                  const SizedBox(
                    height: 32,
                  ),

                  Container(
                    padding:
                        const EdgeInsets
                            .all(24),

                    decoration:
                        BoxDecoration(
                      color:
                          Colors.white,

                      borderRadius:
                          BorderRadius
                              .circular(
                        24,
                      ),

                      boxShadow: [
                        BoxShadow(
                          color: Colors
                              .black12,
                          blurRadius:
                              12,
                          offset:
                              const Offset(
                            0,
                            4,
                          ),
                        ),
                      ],
                    ),

                    child: Column(
                      children: [

                        TextField(
                          controller:
                              emailController,
                          decoration:
                              buildInput(
                            "Email",
                            Icons.email,
                          ),
                        ),

                        const SizedBox(
                          height: 16,
                        ),

                        TextField(
                          controller:
                              passwordController,
                          obscureText:
                              true,
                          decoration:
                              buildInput(
                            "Password",
                            Icons.lock,
                          ),
                        ),

                        const SizedBox(
                          height: 24,
                        ),

                        SizedBox(
                          width:
                              double.infinity,
                          height: 55,

                          child:
                              ElevatedButton(
                            onPressed:
                                isLoading
                                    ? null
                                    : handleLogin,

                            style:
                                ElevatedButton.styleFrom(
                              backgroundColor:
                                  Colors
                                      .deepPurple,

                              foregroundColor:
                                  Colors
                                      .white,

                              shape:
                                  RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(
                                  16,
                                ),
                              ),
                            ),

                            child: isLoading
                                ? const CircularProgressIndicator(
                                    color:
                                        Colors.white,
                                  )
                                : const Text(
                                    "LOGIN",
                                    style:
                                        TextStyle(
                                      fontWeight:
                                          FontWeight.bold,
                                      fontSize:
                                          16,
                                    ),
                                  ),
                          ),
                        ),

                        const SizedBox(
                          height: 12,
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
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}