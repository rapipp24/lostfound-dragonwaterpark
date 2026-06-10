import 'package:flutter/material.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lost & Found',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const LoginScreen(),
    );
  }
}

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

    setState(() {
      isLoading = true;
    });

    await Future.delayed(
      const Duration(seconds: 1),
    );

    setState(() {
      isLoading = false;
    });

    ScaffoldMessenger.of(context)
        .showSnackBar(
      const SnackBar(
        content: Text(
          "Login berhasil (dummy)",
        ),
      ),
    );
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

                const SizedBox(height: 20),

                const Text(
                  "Dragon Waterpark",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight:
                        FontWeight.bold,
                  ),
                ),

                const SizedBox(height: 8),

                const Text(
                  "Lost & Found",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    color: Colors.grey,
                  ),
                ),

                const SizedBox(height: 40),

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

                const SizedBox(height: 16),

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

                const SizedBox(height: 24),

                SizedBox(
                  height: 50,
                  child: ElevatedButton(
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

                const SizedBox(height: 16),

                TextButton(
                  onPressed: () {},
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