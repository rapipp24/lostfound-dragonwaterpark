import 'package:flutter/material.dart';
import 'report_detail_screen.dart';

class ReportsScreen extends StatelessWidget {
  const ReportsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Found Items"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          Card(
            child: ListTile(
              leading: const Icon(Icons.inventory),
              title: const Text("Dompet Hitam"),
              subtitle: const Text("Area Kolam Utama"),

              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) =>
                        const ReportDetailScreen(),
                  ),
                );
              },
            ),
          ),

          Card(
            child: ListTile(
              leading: const Icon(
                Icons.phone_android,
              ),
              title: const Text("iPhone 13"),
              subtitle: const Text("Dekat Loket"),

              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (_) =>
                        const ReportDetailScreen(),
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}