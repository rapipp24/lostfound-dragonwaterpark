import 'dart:convert';
import 'package:http/http.dart' as http;

class ClaimService {

  static const String baseUrl =
      "http://localhost:3000";

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
}