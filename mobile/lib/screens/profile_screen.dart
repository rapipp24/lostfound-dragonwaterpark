import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

import '../services/auth_service.dart';
import 'login_screen.dart';
import 'my_reports_screen.dart';

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

    if (confirm != true) return;

    try {
      await AuthService.logout();
    } catch (_) {}

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
    await prefs.remove(
      "token",
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
      backgroundColor:
          const Color(0xFFF8F7FC),

      appBar: AppBar(
        backgroundColor:
            Colors.transparent,
        elevation: 0,

        title: const Text(
          "Profil Saya",
          style: TextStyle(
            fontWeight:
                FontWeight.bold,
          ),
        ),
      ),

      body: SingleChildScrollView(
        child: Padding(
          padding:
              const EdgeInsets.all(
            24,
          ),

          child: Column(
            children: [
              Container(
                width:
                    double.infinity,

                padding:
                    const EdgeInsets
                        .all(24),

                decoration:
                    BoxDecoration(
                  color: Colors.white,

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
                    CircleAvatar(
                      radius: 55,
                      backgroundColor:
                          Colors
                              .deepPurple
                              .shade100,

                      child: Icon(
                        Icons.person,
                        size: 60,
                        color: Colors
                            .deepPurple,
                      ),
                    ),

                    const SizedBox(
                      height: 16,
                    ),

                    Text(
                      name,
                      style:
                          const TextStyle(
                        fontSize: 28,
                        fontWeight:
                            FontWeight
                                .bold,
                      ),
                    ),

                    const SizedBox(
                      height: 6,
                    ),

                    Text(
                      email,
                      style:
                          TextStyle(
                        color: Colors
                            .grey[700],
                        fontSize: 16,
                      ),
                    ),

                    const SizedBox(
                      height: 16,
                    ),

                    Container(
                      padding:
                          const EdgeInsets
                              .symmetric(
                        horizontal:
                            18,
                        vertical: 8,
                      ),

                      decoration:
                          BoxDecoration(
                        color: Colors
                            .deepPurple
                            .shade50,

                        borderRadius:
                            BorderRadius
                                .circular(
                          30,
                        ),
                      ),

                      child:
                          const Text(
                        "USER",
                        style:
                            TextStyle(
                          fontWeight:
                              FontWeight
                                  .bold,
                          color: Colors
                              .deepPurple,
                        ),
                      ),
                    ),
                  ],
                ),
              ),

              const SizedBox(
                height: 30,
              ),

              SizedBox(
                width:
                    double.infinity,
                height: 55,

                child:
                    ElevatedButton
                        .icon(
                  icon: const Icon(
                    Icons.article,
                  ),

                  label:
                      const Text(
                    "LAPORAN SAYA",
                  ),

                  style:
                      ElevatedButton
                          .styleFrom(
                    backgroundColor:
                        Colors
                            .deepPurple,

                    foregroundColor:
                        Colors.white,

                    shape:
                        RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius
                              .circular(
                        16,
                      ),
                    ),
                  ),

                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            const MyReportsScreen(),
                      ),
                    );
                  },
                ),
              ),

              const SizedBox(
                height: 14,
              ),

              SizedBox(
                width:
                    double.infinity,
                height: 55,

                child:
                    OutlinedButton
                        .icon(
                  icon: const Icon(
                    Icons.logout,
                  ),

                  label:
                      const Text(
                    "LOGOUT",
                  ),

                  style:
                      OutlinedButton
                          .styleFrom(
                    foregroundColor:
                        Colors.red,

                    side:
                        const BorderSide(
                      color:
                          Colors.red,
                    ),

                    shape:
                        RoundedRectangleBorder(
                      borderRadius:
                          BorderRadius
                              .circular(
                        16,
                      ),
                    ),
                  ),

                  onPressed:
                      logout,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}