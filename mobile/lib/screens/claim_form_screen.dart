import 'package:flutter/material.dart';

import '../services/claim_service.dart';

class ClaimFormScreen extends StatefulWidget {
  final int reportId;

  const ClaimFormScreen({
    super.key,
    required this.reportId,
  });

  @override
  State<ClaimFormScreen> createState() =>
      _ClaimFormScreenState();
}

class _ClaimFormScreenState
    extends State<ClaimFormScreen> {
  final nameController =
      TextEditingController();

  final phoneController =
      TextEditingController();

  bool loading = false;

  Future<void> submitClaim() async {
    final name =
        nameController.text.trim();

    final phone =
        phoneController.text.trim();

    if (name.isEmpty ||
        phone.isEmpty) {
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

    if (name.length < 3) {
      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Nama minimal 3 karakter",
          ),
        ),
      );
      return;
    }

    if (!RegExp(
      r'^[0-9]+$',
    ).hasMatch(phone)) {
      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Nomor telepon hanya boleh angka",
          ),
        ),
      );
      return;
    }

    if (!phone.startsWith(
      "08",
    )) {
      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Nomor telepon harus diawali 08",
          ),
        ),
      );
      return;
    }

    if (phone.length < 10 ||
        phone.length > 15) {
      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Nomor telepon harus 10-15 digit",
          ),
        ),
      );
      return;
    }

    try {
      setState(() {
        loading = true;
      });

      await ClaimService.createClaim(
        name,
        phone,
        widget.reportId,
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Pengajuan claim berhasil",
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
        loading = false;
      });
    }
  }

  Widget buildInput({
    required TextEditingController
        controller,
    required String label,
    required IconData icon,
    TextInputType keyboardType =
        TextInputType.text,
  }) {
    return TextField(
      controller: controller,
      keyboardType: keyboardType,

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
          borderSide:
              BorderSide.none,
        ),
      ),
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
          "Claim Barang",
          style: TextStyle(
            fontWeight:
                FontWeight.bold,
          ),
        ),
      ),

      body: SingleChildScrollView(
        padding:
            const EdgeInsets.all(
          20,
        ),

        child: Column(
          crossAxisAlignment:
              CrossAxisAlignment.start,

          children: [

            const Text(
              "Ajukan Kepemilikan Barang",
              style: TextStyle(
                fontSize: 26,
                fontWeight:
                    FontWeight.bold,
              ),
            ),

            const SizedBox(
              height: 6,
            ),

            Text(
              "Lengkapi data berikut untuk mengajukan claim barang.",
              style: TextStyle(
                color:
                    Colors.grey[600],
              ),
            ),

            const SizedBox(
              height: 24,
            ),

            Container(
              width:
                  double.infinity,

              padding:
                  const EdgeInsets.all(
                20,
              ),

              decoration:
                  BoxDecoration(
                color: Colors.white,

                borderRadius:
                    BorderRadius
                        .circular(
                  20,
                ),

                boxShadow: [
                  BoxShadow(
                    color: Colors
                        .black12,
                    blurRadius: 10,
                  ),
                ],
              ),

              child: Column(
                children: [

                  buildInput(
                    controller:
                        nameController,
                    label:
                        "Nama Pengklaim",
                    icon:
                        Icons.person,
                  ),

                  const SizedBox(
                    height: 16,
                  ),

                  buildInput(
                    controller:
                        phoneController,
                    label:
                        "Nomor Telepon",
                    icon:
                        Icons.phone,
                    keyboardType:
                        TextInputType.phone,
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
                  ElevatedButton.icon(
                icon: const Icon(
                  Icons.check_circle,
                ),

                label: loading
                    ? const CircularProgressIndicator(
                        color:
                            Colors.white,
                      )
                    : const Text(
                        "AJUKAN CLAIM",
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

                onPressed:
                    loading
                        ? null
                        : submitClaim,
              ),
            ),
          ],
        ),
      ),
    );
  }
}