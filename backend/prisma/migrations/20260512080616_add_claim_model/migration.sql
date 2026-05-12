-- CreateTable
CREATE TABLE "Claim" (
    "id" SERIAL NOT NULL,
    "claimerName" TEXT NOT NULL,
    "claimerPhone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "reportId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Claim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Claim" ADD CONSTRAINT "Claim_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "Report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
