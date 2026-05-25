const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- Memulai Injeksi Data Laporan ---');

  const userId = 6; // ID Joni

  const reports = [
    {
      item: 'iPhone 15 Pro Titanium',
      location: 'Area Kolam Arus',
      description: 'Warna Natural Titanium, pakai casing bening, ada stiker naga di belakang.',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=500',
      userId: userId
    },
    {
      item: 'Dompet Kulit Braun Buffel',
      location: 'Locker Room Pria',
      description: 'Warna cokelat tua, berisi KTP atas nama Joni dan beberapa kartu ATM.',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=500',
      userId: userId
    },
    {
      item: 'Kacamata Ray-Ban Aviator',
      location: 'Area Food Court',
      description: 'Frame emas, lensa hijau botol. Tertinggal di meja nomor 12.',
      status: 'Found',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=500',
      userId: 1 // Ditemukan admin
    },
    {
      item: 'Kunci Mobil BMW',
      location: 'Parkiran VIP',
      description: 'Gantungan kunci logo M-Performance, ada tombol yang agak lecet.',
      status: 'Found',
      image: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?q=80&w=500',
      userId: 1
    },
    {
      item: 'Boneka Teddy Bear Kecil',
      location: 'Kids Playground',
      description: 'Warna pink, pakai pita merah di leher. Milik anak kecil yang menangis.',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?q=80&w=500',
      userId: userId
    },
    {
      item: 'Jam Tanggal G-Shock',
      location: 'Wahana Boomerango',
      description: 'Warna hitam doff, seri GA-2100. Lepas saat meluncur.',
      status: 'Found',
      image: 'https://images.unsplash.com/photo-1548171916-c0ea7fbc3bc5?q=80&w=500',
      userId: 1
    },
    {
      item: 'Topi NY Yankees',
      location: 'Pintu Masuk Utama',
      description: 'Warna biru dongker, ada bekas keringat sedikit di bagian dalam.',
      status: 'Pending',
      image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500',
      userId: userId
    }
  ];

  for (const report of reports) {
    const created = await prisma.report.create({
      data: report
    });
    console.log(` Berhasil membuat: ${created.item} (Status: ${created.status})`);
  }

  console.log('--- Injeksi Data Selesai ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
