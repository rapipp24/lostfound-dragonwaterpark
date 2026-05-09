"use client";

import Link from "next/link";
import { useReports } from "../../../hooks/useReports";
import ReportCard from "../../../components/reports/ReportCard";
import LoadingCard from "../../../components/shared/LoadingCard";
import EmptyState from "../../../components/shared/EmptyState";
import PageHeader from "../../../components/shared/PageHeader";
import Container from "../../../components/shared/Container";
import { useState } from "react";
import Modal from "../../../components/shared/Modal";

export default function ReportsPage() {

  const {
    reports,
    isLoading,
    error,
  } = useReports();

  const [openModal, setOpenModal] =
    useState(false);

  return (
    <Container>
      <div className="py-10">

        <div className="flex items-center justify-between mb-8">

          <PageHeader
            title="Reports"
            description="Daftar laporan barang hilang"
          />

          <div className="flex items-center gap-3">

            <Link
              href="/reports/create"
              className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
            >
              + Buat Report
            </Link>

            <button
              onClick={() =>
                setOpenModal(true)
              }
              className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Open Modal
            </button>
          </div>
        </div>

        {isLoading ? (
          <LoadingCard />
        ) : error ? (
          <EmptyState
            title="Terjadi Kesalahan"
            description={error}
          />
        ) : reports.length === 0 ? (
          <EmptyState
            title="Belum Ada Report"
            description="Silakan buat laporan barang hilang terlebih dahulu."
          />
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
              />
            ))}
          </div>
        )}

        <Modal
          open={openModal}
          onClose={() =>
            setOpenModal(false)
          }
        >
          <h2 className="text-2xl font-bold mb-4">
            Test Modal
          </h2>

          <p className="text-gray-500">
            Ini contoh reusable modal component.
          </p>
        </Modal>

      </div>
    </Container>
  );
}