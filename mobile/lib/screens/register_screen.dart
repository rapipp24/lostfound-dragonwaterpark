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

  Widget buildInput({
    required TextEditingController
        controller,
    required String label,
    required IconData icon,
    bool obscureText = false,
  }) {
    return TextField(
      controller: controller,
      obscureText: obscureText,

      decoration: InputDecoration(
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
                    width: 120,
                    height: 120,

                    decoration:
                        BoxDecoration(
                      color: Colors
                          .deepPurple
                          .shade50,

                      shape:
                          BoxShape.circle,
                    ),

                    child: Icon(
                      Icons.person_add,
                      size: 60,
                      color: Colors
                          .deepPurple,
                    ),
                  ),

                  const SizedBox(
                    height: 24,
                  ),

                  const Text(
                    "Buat Akun",
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
                    "Daftar untuk menggunakan aplikasi Lost & Found",
                    textAlign:
                        TextAlign.center,
                    style: TextStyle(
                      color:
                          Colors.grey[600],
                    ),
                  ),

                  const SizedBox(
                    height: 30,
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

                        buildInput(
                          controller:
                              fullNameController,
                          label:
                              "Nama Lengkap",
                          icon:
                              Icons.person,
                        ),

                        const SizedBox(
                          height: 16,
                        ),

                        buildInput(
                          controller:
                              emailController,
                          label:
                              "Email",
                          icon:
                              Icons.email,
                        ),

                        const SizedBox(
                          height: 16,
                        ),

                        buildInput(
                          controller:
                              passwordController,
                          label:
                              "Password",
                          icon:
                              Icons.lock,
                          obscureText:
                              true,
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
                                    : handleRegister,

                            style:
                                ElevatedButton.styleFrom(
                              backgroundColor:
                                  Colors.deepPurple,

                              foregroundColor:
                                  Colors.white,

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
                                    "REGISTER",
                                    style:
                                        TextStyle(
                                      fontSize:
                                          16,
                                      fontWeight:
                                          FontWeight.bold,
                                    ),
                                  ),
                          ),
                        ),

                        const SizedBox(
                          height: 12,
                        ),

                        TextButton(
                          onPressed: () {
                            Navigator.pop(
                              context,
                            );
                          },

                          child: const Text(
                            "Sudah punya akun? Login",
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