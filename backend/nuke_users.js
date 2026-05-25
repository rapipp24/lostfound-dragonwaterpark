const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function cleanUsers() {
  try {
    // Hapus semua user yang rolenya 'user'
    const deleted = await prisma.user.deleteMany({
      where: {
        role: 'user'
      }
    });
    console.log(`Berhasil menghapus ${deleted.count} user.`);
  } catch (error) {
    console.error('Gagal menghapus:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

cleanUsers();
