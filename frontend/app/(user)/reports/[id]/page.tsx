"use client";

import { useEffect, useState } from "react";

import InfoItem from "../../../../components/shared/InfoItem";
import Container from "../../../../components/shared/Container";
import Card from "../../../../components/shared/Card";
import StatusBadge from "../../../../components/shared/StatusBadge";

import ReportDetailSkeleton from "../../../../components/reports/ReportDetailSkeleton";
import ImageFallback from "../../../../components/shared/ImageFallback";
import ActionButtons from "../../../../components/shared/ActionButtons";

import {
  getReportById,
} from "../../../../services/report.service";

export default function ReportDetailPage() {

  const [report, setReport] =
    useState<any>(null);

  useEffect(() => {
    async function fetchReport() {

      const data =
        await getReportById("1");

      setReport(data);
    }

    fetchReport();
  }, []);

  if (!report) {
    return <ReportDetailSkeleton />;
  }

  return (
    <Container>
      <div className="py-10">

        <div className="grid md:grid-cols-2 gap-10">

          {/* Image */}
          <div className="h-[500px] rounded-3xl overflow-hidden">

            <ImageFallback
              src={report.image}
              alt={report.name}
            />

          </div>

          {/* Detail */}
          <Card>

            <StatusBadge
              status={report.status}
            />

            <h1 className="text-5xl font-bold mt-5 mb-6">
              {report.name}
            </h1>

            <div className="space-y-5 text-lg">

              <InfoItem
                label="Lokasi"
                value={report.location}
              />

              <InfoItem
                label="Tanggal"
                value={report.date}
              />

              <InfoItem
                label="Deskripsi"
                value={report.description}
              />
            </div>

            <ActionButtons />

          </Card>
        </div>
      </div>
    </Container>
  );
}