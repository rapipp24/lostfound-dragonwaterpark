import 'package:flutter/material.dart';

import '../services/report_service.dart';
import 'login_screen.dart';
import 'profile_screen.dart';
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

  List<dynamic> filteredReports = [];

  final searchController =
      TextEditingController();

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
        filteredReports = data;
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

  void searchReport(
    String value,
  ) {

    setState(() {

      filteredReports =
          reports.where((report) {

        final item =
            report["item"]
                .toString()
                .toLowerCase();

        return item.contains(
          value.toLowerCase(),
        );

      }).toList();
    });
  }

  @override
  Widget build(BuildContext context) {

    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Found Items",
        ),

        actions: [

          IconButton(
            icon: const Icon(
              Icons.person,
            ),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) =>
                      const ProfileScreen(),
                ),
              );
            },
          ),

          IconButton(
            icon: const Icon(
              Icons.logout,
            ),
            onPressed: () {
              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(
                  builder: (_) =>
                      const LoginScreen(),
                ),
                (route) => false,
              );
            },
          ),
        ],
      ),

      body: loading

          ? const Center(
              child:
                  CircularProgressIndicator(),
            )

          : reports.isEmpty

              ? const Center(
                  child: Column(
                    mainAxisAlignment:
                        MainAxisAlignment.center,

                    children: [

                      Icon(
                        Icons.inventory_2_outlined,
                        size: 80,
                        color: Colors.grey,
                      ),

                      SizedBox(
                        height: 16,
                      ),

                      Text(
                        "Belum ada barang ditemukan",
                        style: TextStyle(
                          fontSize: 18,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                )

              : RefreshIndicator(
                  onRefresh:
                      fetchReports,

                  child: Column(
                    children: [

                      Padding(
                        padding:
                            const EdgeInsets.all(
                          16,
                        ),

                        child: TextField(
                          controller:
                              searchController,

                          onChanged:
                              searchReport,

                          decoration:
                              const InputDecoration(
                            hintText:
                                "Cari barang...",
                            prefixIcon:
                                Icon(
                              Icons.search,
                            ),
                            border:
                                OutlineInputBorder(),
                          ),
                        ),
                      ),

                      Expanded(
                        child:
                            ListView.builder(
                          padding:
                              const EdgeInsets.symmetric(
                            horizontal: 16,
                          ),

                          itemCount:
                              filteredReports.length,

                          itemBuilder:
                              (
                            context,
                            index,
                          ) {

                            final report =
                                filteredReports[
                                    index];

                            return Card(
                              child:
                                  ListTile(
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
                                          ReportDetailScreen(
                                        report:
                                            report,
                                      ),
                                    ),
                                  );
                                },
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                ),
    );
  }
}