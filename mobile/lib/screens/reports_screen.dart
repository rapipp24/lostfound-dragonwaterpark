import 'package:flutter/material.dart';

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
        children: const [
          Card(
            child: ListTile(
              leading: Icon(Icons.inventory),
              title: Text("Dompet Hitam"),
              subtitle: Text("Area Kolam Utama"),
            ),
          ),

          Card(
            child: ListTile(
              leading: Icon(Icons.phone_android),
              title: Text("iPhone 13"),
              subtitle: Text("Dekat Loket"),
            ),
          ),
        ],
      ),
    );
  }
}