import 'package:flutter/material.dart';
import 'claim_history_screen.dart';

class ReportDetailScreen extends StatelessWidget {
  const ReportDetailScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Detail Barang"),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Container(
              height: 220,
              width: double.infinity,
              decoration: BoxDecoration(
                color: Colors.grey.shade300,
                borderRadius: BorderRadius.circular(12),
              ),
              child: const Icon(
                Icons.image,
                size: 80,
              ),
            ),

            const SizedBox(height: 20),

            const Text(
              "Dompet Hitam",
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),

            const SizedBox(height: 10),

            const Text(
              "Lokasi: Area Kolam Utama",
            ),

            const SizedBox(height: 10),

            const Text(
              "Status: Found",
            ),

            const SizedBox(height: 20),

            const Text(
              "Deskripsi barang temuan akan tampil di sini.",
            ),

            const SizedBox(height: 30),

            SizedBox(
              width: double.infinity,
              height: 50,
              child: ElevatedButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          const ClaimHistoryScreen(),
                    ),
                  );
                },
                child: const Text(
                  "CLAIM BARANG",
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}