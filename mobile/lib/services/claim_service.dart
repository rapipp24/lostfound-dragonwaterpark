import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ClaimService {

  static String get baseUrl =>
      dotenv.env['BASE_URL']!;

  static Future<List<dynamic>>
      getClaims() async {

    final response =
        await http.get(
      Uri.parse(
        "$baseUrl/claims",
      ),
    );

    if (response.statusCode !=
        200) {
      throw Exception(
        "Gagal mengambil claim",
      );
    }

    return jsonDecode(
      response.body,
    );
  }

  static Future<dynamic>
      createClaim(
    String claimerName,
    String claimerPhone,
    int reportId,
  ) async {

    final response =
        await http.post(
      Uri.parse(
        "$baseUrl/claims",
      ),
      headers: {
        "Content-Type":
            "application/json",
      },
      body: jsonEncode({
        "claimerName":
            claimerName,
        "claimerPhone":
            claimerPhone,
        "reportId":
            reportId,
      }),
    );

    if (response.statusCode !=
            201 &&
        response.statusCode !=
            200) {
      throw Exception(
        "Gagal mengajukan claim",
      );
    }

    return jsonDecode(
      response.body,
    );
  }
}