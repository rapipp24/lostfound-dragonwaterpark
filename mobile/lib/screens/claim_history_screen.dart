import 'package:flutter/material.dart';
import '../services/claim_service.dart';

class ClaimHistoryScreen extends StatefulWidget {
  const ClaimHistoryScreen({super.key});

  @override
  State<ClaimHistoryScreen> createState() =>
      _ClaimHistoryScreenState();
}

class _ClaimHistoryScreenState
    extends State<ClaimHistoryScreen> {

  List<dynamic> claims = [];

  bool loading = true;

  @override
  void initState() {
    super.initState();
    fetchClaims();
  }

  Future<void> fetchClaims() async {

    try {

      final data =
          await ClaimService.getClaims();

      setState(() {
        claims = data;
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
          "Riwayat Claim",
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
                  claims.length,

              itemBuilder:
                  (context, index) {

                final claim =
                    claims[index];

                return Card(
                  child: ListTile(
                    title: Text(
                      claim["claimerName"] ??
                          "-",
                    ),

                    subtitle: Text(
                      claim["status"] ??
                          "-",
                    ),
                  ),
                );
              },
            ),
    );
  }
}