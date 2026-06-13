import 'package:flutter/material.dart';

import '../services/report_service.dart';
import 'login_screen.dart';
import 'profile_screen.dart';
import 'report_detail_screen.dart';
import 'create_report_screen.dart';

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

  Color getStatusColor(
    String status,
  ) {
    switch (
        status.toLowerCase()) {
      case "claimed":
        return Colors.blue;

      case "pending":
        return Colors.orange;

      default:
        return Colors.green;
    }
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
          "Lost & Found",
          style: TextStyle(
            fontWeight:
                FontWeight.bold,
          ),
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

      floatingActionButton:
          FloatingActionButton(
        backgroundColor:
            Colors.deepPurple,

        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) =>
                  const CreateReportScreen(),
            ),
          );
        },

        child: const Icon(
          Icons.add,
          color: Colors.white,
        ),
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
                        MainAxisAlignment
                            .center,
                    children: [
                      Icon(
                        Icons
                            .inventory_2_outlined,
                        size: 90,
                        color:
                            Colors.grey,
                      ),
                      SizedBox(
                        height: 16,
                      ),
                      Text(
                        "Belum ada barang ditemukan",
                        style:
                            TextStyle(
                          fontSize:
                              18,
                          color: Colors
                              .grey,
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
                            const EdgeInsets
                                .fromLTRB(
                          20,
                          10,
                          20,
                          10,
                        ),

                        child: Column(
                          crossAxisAlignment:
                              CrossAxisAlignment
                                  .start,

                          children: [

                            const Text(
                              "Temukan Barang Anda 🔍",
                              style:
                                  TextStyle(
                                fontSize:
                                    24,
                                fontWeight:
                                    FontWeight
                                        .bold,
                              ),
                            ),

                            const SizedBox(
                              height: 5,
                            ),

                            Text(
                              "Lihat barang yang ditemukan oleh petugas",
                              style:
                                  TextStyle(
                                color: Colors
                                    .grey[600],
                              ),
                            ),

                            const SizedBox(
                              height: 20,
                            ),

                            TextField(
                              controller:
                                  searchController,

                              onChanged:
                                  searchReport,

                              decoration:
                                  InputDecoration(
                                hintText:
                                    "Cari barang...",

                                prefixIcon:
                                    const Icon(
                                  Icons.search,
                                ),

                                filled:
                                    true,

                                fillColor:
                                    Colors.white,

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
                            ),
                          ],
                        ),
                      ),

                      Expanded(
                        child:
                            ListView.builder(
                          padding:
                              const EdgeInsets.symmetric(
                            horizontal:
                                16,
                          ),

                          itemCount:
                              filteredReports
                                  .length,

                          itemBuilder:
                              (
                            context,
                            index,
                          ) {
                            final report =
                                filteredReports[
                                    index];

                            final status =
                                report["status"] ??
                                    "Found";

                            return Card(
                              elevation:
                                  3,

                              margin:
                                  const EdgeInsets.only(
                                bottom:
                                    14,
                              ),

                              shape:
                                  RoundedRectangleBorder(
                                borderRadius:
                                    BorderRadius.circular(
                                  18,
                                ),
                              ),

                              child:
                                  InkWell(
                                borderRadius:
                                    BorderRadius.circular(
                                  18,
                                ),

                                onTap:
                                    () {
                                  Navigator.push(
                                    context,
                                    MaterialPageRoute(
                                      builder:
                                          (_) =>
                                              ReportDetailScreen(
                                        report:
                                            report,
                                      ),
                                    ),
                                  );
                                },

                                child:
                                    Padding(
                                  padding:
                                      const EdgeInsets.all(
                                    16,
                                  ),

                                  child:
                                      Row(
                                    children: [

                                      Container(
                                        width:
                                            60,
                                        height:
                                            60,

                                        decoration:
                                            BoxDecoration(
                                          color: Colors
                                              .deepPurple
                                              .shade50,

                                          borderRadius:
                                              BorderRadius.circular(
                                            14,
                                          ),
                                        ),

                                        child:
                                            const Icon(
                                          Icons
                                              .inventory_2,
                                          size:
                                              30,
                                          color:
                                              Colors.deepPurple,
                                        ),
                                      ),

                                      const SizedBox(
                                        width:
                                            14,
                                      ),

                                      Expanded(
                                        child:
                                            Column(
                                          crossAxisAlignment:
                                              CrossAxisAlignment.start,

                                          children: [

                                            Text(
                                              report["item"] ??
                                                  "-",

                                              style:
                                                  const TextStyle(
                                                fontSize:
                                                    18,
                                                fontWeight:
                                                    FontWeight.bold,
                                              ),
                                            ),

                                            const SizedBox(
                                              height:
                                                  6,
                                            ),

                                            Row(
                                              children: [

                                                const Icon(
                                                  Icons.location_on,
                                                  size:
                                                      16,
                                                  color:
                                                      Colors.grey,
                                                ),

                                                const SizedBox(
                                                  width:
                                                      4,
                                                ),

                                                Expanded(
                                                  child:
                                                      Text(
                                                    report["location"] ??
                                                        "-",

                                                    style:
                                                        const TextStyle(
                                                      color:
                                                          Colors.grey,
                                                    ),
                                                  ),
                                                ),
                                              ],
                                            ),

                                            const SizedBox(
                                              height:
                                                  8,
                                            ),

                                            Container(
                                              padding:
                                                  const EdgeInsets.symmetric(
                                                horizontal:
                                                    10,
                                                vertical:
                                                    4,
                                              ),

                                              decoration:
                                                  BoxDecoration(
                                                color: getStatusColor(
                                                  status,
                                                ).withOpacity(
                                                  0.15,
                                                ),

                                                borderRadius:
                                                    BorderRadius.circular(
                                                  20,
                                                ),
                                              ),

                                              child:
                                                  Text(
                                                status,

                                                style:
                                                    TextStyle(
                                                  color:
                                                      getStatusColor(
                                                    status,
                                                  ),

                                                  fontWeight:
                                                      FontWeight.bold,
                                                ),
                                              ),
                                            ),
                                          ],
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
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