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

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Form Claim",
        ),
      ),

      body: Padding(
        padding:
            const EdgeInsets.all(16),

        child: Column(
          children: [

            TextField(
              controller:
                  nameController,
              decoration:
                  const InputDecoration(
                labelText:
                    "Nama Pengklaim",
                border:
                    OutlineInputBorder(),
              ),
            ),

            const SizedBox(
              height: 16,
            ),

            TextField(
              controller:
                  phoneController,
              keyboardType:
                  TextInputType.phone,
              decoration:
                  const InputDecoration(
                labelText:
                    "Nomor Telepon",
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
                    loading
                        ? null
                        : submitClaim,

                child: loading
                    ? const CircularProgressIndicator()
                    : const Text(
                        "AJUKAN CLAIM",
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}