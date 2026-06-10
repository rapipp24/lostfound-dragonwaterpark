import 'package:flutter/material.dart';

import '../services/report_service.dart';
import 'report_detail_screen.dart';

class ReportsScreen extends StatefulWidget {
  const ReportsScreen({super.key});

  @override
  State<ReportsScreen> createState() =>
      _ReportsScreenState();
}

class _ReportsScreenState
    extends State<ReportsScreen> {

  List<dynamic> reports = [];

  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchReports();
  }

  Future<void> fetchReports() async {

    try {

      final data =
          await ReportService.getReports();

      setState(() {
        reports = data;
      });

    } catch (e) {

      debugPrint(
        e.toString(),
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
          "Found Items",
        ),
      ),

      body: loading

          ? const Center(
              child:
                  CircularProgressIndicator(),
            )

          : ListView.builder(
              padding:
                  const EdgeInsets.all(16),

              itemCount:
                  reports.length,

              itemBuilder:
                  (context, index) {

                final report =
                    reports[index];

                return Card(
                  child: ListTile(
                    leading:
                        const Icon(
                      Icons.inventory,
                    ),

                    title: Text(
                      report["item"] ??
                          "-",
                    ),

                    subtitle: Text(
                      report["location"] ??
                          "-",
                    ),

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
                );
              },
            ),
    );
  }
}