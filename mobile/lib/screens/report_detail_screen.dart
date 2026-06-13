import 'package:flutter/material.dart';

import 'claim_form_screen.dart';

class ReportDetailScreen extends StatelessWidget {
  final Map<String, dynamic> report;

  const ReportDetailScreen({
    super.key,
    required this.report,
  });

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
    final status =
        report["status"] ?? "Found";

    return Scaffold(
      backgroundColor:
          const Color(0xFFF8F7FC),

      appBar: AppBar(
        backgroundColor:
            Colors.transparent,
        elevation: 0,

        title: const Text(
          "Detail Barang",
          style: TextStyle(
            fontWeight:
                FontWeight.bold,
          ),
        ),
      ),

      body: SingleChildScrollView(
        padding:
            const EdgeInsets.all(
          20,
        ),

        child: Column(
          crossAxisAlignment:
              CrossAxisAlignment.start,

          children: [

            Container(
              height: 230,
              width:
                  double.infinity,

              decoration:
                  BoxDecoration(
                color: Colors
                    .deepPurple
                    .shade50,

                borderRadius:
                    BorderRadius
                        .circular(
                  20,
                ),
              ),

              child: const Center(
                child: Icon(
                  Icons
                      .inventory_2,
                  size: 90,
                  color: Colors
                      .deepPurple,
                ),
              ),
            ),

            const SizedBox(
              height: 24,
            ),

            Text(
              report["item"] ?? "-",

              style:
                  const TextStyle(
                fontSize: 28,
                fontWeight:
                    FontWeight.bold,
              ),
            ),

            const SizedBox(
              height: 12,
            ),

            Row(
              children: [

                const Icon(
                  Icons.location_on,
                  color:
                      Colors.grey,
                ),

                const SizedBox(
                  width: 6,
                ),

                Expanded(
                  child: Text(
                    report["location"] ??
                        "-",

                    style:
                        const TextStyle(
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),

            const SizedBox(
              height: 16,
            ),

            Container(
              padding:
                  const EdgeInsets
                      .symmetric(
                horizontal: 14,
                vertical: 8,
              ),

              decoration:
                  BoxDecoration(
                color:
                    getStatusColor(
                  status,
                ).withOpacity(
                  0.15,
                ),

                borderRadius:
                    BorderRadius
                        .circular(
                  30,
                ),
              ),

              child: Text(
                status,

                style: TextStyle(
                  color:
                      getStatusColor(
                    status,
                  ),

                  fontWeight:
                      FontWeight.bold,
                ),
              ),
            ),

            const SizedBox(
              height: 24,
            ),

            const Text(
              "Deskripsi",
              style: TextStyle(
                fontSize: 18,
                fontWeight:
                    FontWeight.bold,
              ),
            ),

            const SizedBox(
              height: 10,
            ),

            Container(
              width:
                  double.infinity,

              padding:
                  const EdgeInsets
                      .all(16),

              decoration:
                  BoxDecoration(
                color:
                    Colors.white,

                borderRadius:
                    BorderRadius
                        .circular(
                  16,
                ),

                boxShadow: [
                  BoxShadow(
                    color: Colors
                        .black12,
                    blurRadius: 8,
                  ),
                ],
              ),

              child: Text(
                report["description"] ??
                    "Tidak ada deskripsi.",
                style:
                    const TextStyle(
                  fontSize: 15,
                  height: 1.5,
                ),
              ),
            ),

            const SizedBox(
              height: 40,
            ),

            SizedBox(
              width:
                  double.infinity,
              height: 55,

              child:
                  ElevatedButton.icon(
                icon: const Icon(
                  Icons.check_circle,
                ),

                label: const Text(
                  "CLAIM BARANG",
                ),

                style:
                    ElevatedButton
                        .styleFrom(
                  backgroundColor:
                      Colors
                          .deepPurple,

                  foregroundColor:
                      Colors.white,

                  shape:
                      RoundedRectangleBorder(
                    borderRadius:
                        BorderRadius
                            .circular(
                      16,
                    ),
                  ),
                ),

                onPressed: () {
                  Navigator.push(
                    context,

                    MaterialPageRoute(
                      builder: (_) =>
                          ClaimFormScreen(
                        reportId:
                            report["id"],
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