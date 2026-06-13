import 'package:flutter/material.dart';

import '../services/report_service.dart';

class CreateReportScreen extends StatefulWidget {
  const CreateReportScreen({
    super.key,
  });

  @override
  State<CreateReportScreen> createState() =>
      _CreateReportScreenState();
}

class _CreateReportScreenState
    extends State<CreateReportScreen> {

  final itemController =
      TextEditingController();

  final locationController =
      TextEditingController();

  final descriptionController =
      TextEditingController();

  bool loading = false;

  Future<void> saveReport() async {

    if (itemController.text.isEmpty ||
        locationController.text.isEmpty ||
        descriptionController.text.isEmpty) {

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

    try {

      setState(() {
        loading = true;
      });

      await ReportService.createReport(
        itemController.text,
        locationController.text,
        descriptionController.text,
      );

      if (!mounted) return;

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Laporan berhasil dibuat",
          ),
        ),
      );

      Navigator.pop(
        context,
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
        loading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Tambah Laporan",
        ),
      ),

      body: SingleChildScrollView(
        padding:
            const EdgeInsets.all(16),

        child: Column(
          children: [

            TextField(
              controller:
                  itemController,

              decoration:
                  const InputDecoration(
                labelText:
                    "Nama Barang",

                border:
                    OutlineInputBorder(),
              ),
            ),

            const SizedBox(
              height: 16,
            ),

            TextField(
              controller:
                  locationController,

              decoration:
                  const InputDecoration(
                labelText:
                    "Lokasi Ditemukan",

                border:
                    OutlineInputBorder(),
              ),
            ),

            const SizedBox(
              height: 16,
            ),

            TextField(
              controller:
                  descriptionController,

              maxLines: 4,

              decoration:
                  const InputDecoration(
                labelText:
                    "Deskripsi",

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
                        : saveReport,

                child: loading
                    ? const CircularProgressIndicator()
                    : const Text(
                        "SIMPAN LAPORAN",
                      ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}