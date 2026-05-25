const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.report.count();
  const reports = await prisma.report.findMany({ take: 5 });
  console.log(`Total Laporan: ${count}`);
  console.log('5 Laporan Terakhir:', JSON.stringify(reports, null, 2));
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
