const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- OPERASI PEMBERSIHAN DATA ---');
  try {
    // Mencoba menghapus semua Klaim dulu
    const deleteClaims = await prisma.claim.deleteMany();
    console.log(` Berhasil menghapus ${deleteClaims.count} Klaim.`);

    // Mencoba menghapus semua Laporan
    const deleteReports = await prisma.report.deleteMany();
    console.log(` Berhasil menghapus ${deleteReports.count} Laporan.`);

    // Mencoba menghapus semua User (kecuali admin jika ada)
    const deleteUsers = await prisma.user.deleteMany({
      where: { role: { not: 'admin' } }
    });
    console.log(` Berhasil menghapus ${deleteUsers.count} User.`);

    console.log('\n--- SEMUA DATA BERHASIL DIBERSIHKAN ---');
  } catch (error) {
    console.error('\n GAGAL MENGHAPUS DATA:');
    console.error(error.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
