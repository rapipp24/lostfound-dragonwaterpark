import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';

class ReportService {

  static String get baseUrl =>
    dotenv.env['BASE_URL']!;

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