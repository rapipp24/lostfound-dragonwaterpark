class Claim {
  final int id;
  final String claimerName;
  final String claimerPhone;
  final String status;

  Claim({
    required this.id,
    required this.claimerName,
    required this.claimerPhone,
    required this.status,
  });

  factory Claim.fromJson(
    Map<String, dynamic> json,
  ) {
    return Claim(
      id: json['id'],
      claimerName: json['claimerName'],
      claimerPhone: json['claimerPhone'],
      status: json['status'],
    );
  }
}