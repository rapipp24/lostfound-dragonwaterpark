import 'package:flutter/material.dart';

import 'claim_form_screen.dart';

class ReportDetailScreen extends StatelessWidget {
  final Map<String, dynamic> report;

  const ReportDetailScreen({
    super.key,
    required this.report,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          "Detail Barang",
        ),
      ),

      body: Padding(
        padding: const EdgeInsets.all(16),

        child: Column(
          crossAxisAlignment:
              CrossAxisAlignment.start,

          children: [

            Container(
              height: 220,
              width: double.infinity,

              decoration: BoxDecoration(
                color: Colors.grey.shade300,

                borderRadius:
                    BorderRadius.circular(
                  12,
                ),
              ),

              child: const Icon(
                Icons.image,
                size: 80,
              ),
            ),

            const SizedBox(
              height: 20,
            ),

            Text(
              report["item"] ?? "-",

              style: const TextStyle(
                fontSize: 24,

                fontWeight:
                    FontWeight.bold,
              ),
            ),

            const SizedBox(
              height: 10,
            ),

            Text(
              "Lokasi: ${report["location"] ?? "-"}",
            ),

            const SizedBox(
              height: 10,
            ),

            Text(
              "Status: ${report["status"] ?? "-"}",
            ),

            const SizedBox(
              height: 20,
            ),

            Text(
              report["description"] ??
                  "-",
            ),

            const SizedBox(
              height: 30,
            ),

            SizedBox(
              width:
                  double.infinity,

              height: 50,

              child:
                  ElevatedButton(
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