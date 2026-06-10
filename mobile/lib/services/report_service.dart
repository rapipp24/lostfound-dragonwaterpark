import 'dart:convert';
import 'package:http/http.dart' as http;

class ReportService {

  static const String baseUrl =
      "http://localhost:3000";

  static Future<List<dynamic>>
      getReports() async {

    final response =
        await http.get(
      Uri.parse(
        "$baseUrl/reports",
      ),
    );

    if (response.statusCode !=
        200) {
      throw Exception(
        "Gagal mengambil laporan",
      );
    }

    final result =
    jsonDecode(response.body);

return result["data"];
  }
}