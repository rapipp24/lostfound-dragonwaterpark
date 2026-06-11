import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {

  static const String baseUrl =
      "http://localhost:3000";

  static Future<dynamic> login(
    String email,
    String password,
  ) async {

    final response =
        await http.post(
      Uri.parse(
        "$baseUrl/auth/login",
      ),
      headers: {
        "Content-Type":
            "application/json",
      },
      body: jsonEncode({
        "email": email,
        "password": password,
      }),
    );

    return jsonDecode(
      response.body,
    );
  }

  static Future<dynamic> register(
    String fullName,
    String email,
    String password,
  ) async {

    final response =
        await http.post(
      Uri.parse(
        "$baseUrl/auth/register",
      ),
      headers: {
        "Content-Type":
            "application/json",
      },
      body: jsonEncode({
        "fullName": fullName,
        "email": email,
        "password": password,
      }),
    );

    return jsonDecode(
      response.body,
    );
  }
}