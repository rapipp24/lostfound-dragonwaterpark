import 'package:flutter/material.dart';

class ClaimHistoryScreen extends StatelessWidget {
  const ClaimHistoryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Riwayat Claim"),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: const [
          Card(
            child: ListTile(
              title: Text("Dompet Hitam"),
              subtitle: Text("Pending"),
            ),
          ),
          Card(
            child: ListTile(
              title: Text("iPhone 13"),
              subtitle: Text("Approved"),
            ),
          ),
        ],
      ),
    );
  }
}