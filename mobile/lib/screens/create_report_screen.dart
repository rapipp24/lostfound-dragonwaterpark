import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

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

  File? selectedImage;

  Future<void> pickImage() async {

  final picker =
      ImagePicker();

  final image =
      await picker.pickImage(
    source: ImageSource.gallery,
  );

  if (image == null) return;

  setState(() {
    selectedImage =
        File(image.path);
  });
}

  Future<void> saveReport() async {

    final item =
        itemController.text.trim();

    final location =
        locationController.text.trim();

    final description =
        descriptionController.text.trim();

    if (item.isEmpty ||
        location.isEmpty ||
        description.isEmpty) {

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

    if (item.length < 3) {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Nama barang minimal 3 karakter",
          ),
        ),
      );

      return;
    }

    if (location.length < 3) {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Lokasi minimal 3 karakter",
          ),
        ),
      );

      return;
    }

    if (description.length < 10) {

      ScaffoldMessenger.of(context)
          .showSnackBar(
        const SnackBar(
          content: Text(
            "Deskripsi minimal 10 karakter",
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
        item,
        location,
        description,
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