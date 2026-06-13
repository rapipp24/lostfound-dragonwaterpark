import 'dart:convert';

import 'package:http/http.dart' as http;
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:io';

class ReportService {
  static String get baseUrl => dotenv.env['BASE_URL']!;

  static Future<List<dynamic>> getReports() async {
    final response = await http.get(Uri.parse("$baseUrl/reports"));

    if (response.statusCode != 200) {
      throw Exception("Gagal mengambil laporan");
    }

    final result = jsonDecode(response.body);

    return result["data"];
  }

  static Future<List<dynamic>> getMyReports() async {
    final prefs = await SharedPreferences.getInstance();

    final token = prefs.getString("token");

    final response = await http.get(
      Uri.parse("$baseUrl/reports/me"),
      headers: {"Authorization": "Bearer $token"},
    );

    if (response.statusCode != 200) {
      throw Exception("Gagal mengambil laporan saya");
    }

    final result = jsonDecode(response.body);

    return result["data"];
  }

  static Future<dynamic> createReport(
    String item,
    String location,
    String description,
    File? image,
  ) async {
    final prefs = await SharedPreferences.getInstance();

    final token = prefs.getString("token");

    final request = http.MultipartRequest(
      "POST",
      Uri.parse("$baseUrl/reports"),
    );

    request.headers.addAll({"Authorization": "Bearer $token"});

    request.fields["item"] = item;

    request.fields["location"] = location;

    request.fields["description"] = description;

    if (image != null) {
      request.files.add(await http.MultipartFile.fromPath("image", image.path));
    }

    final streamedResponse = await request.send();

    final response = await http.Response.fromStream(streamedResponse);

    if (response.statusCode != 201 && response.statusCode != 200) {
      throw Exception("Gagal membuat laporan");
    }

    return jsonDecode(response.body);
  }
}
