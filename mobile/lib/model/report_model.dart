class Report {
  final int id;
  final String item;
  final String location;
  final String description;
  final String status;
  final String? image;

  Report({
    required this.id,
    required this.item,
    required this.location,
    required this.description,
    required this.status,
    this.image,
  });

  factory Report.fromJson(
    Map<String, dynamic> json,
  ) {
    return Report(
      id: json['id'],
      item: json['item'],
      location: json['location'],
      description: json['description'],
      status: json['status'],
      image: json['image'],
    );
  }
}