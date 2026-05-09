"use client";

import { useEffect, useState } from "react";
import { Report } from "../types/report";
import { getReports } from "../services/report.service";

export function useReports() {
  const [reports, setReports] =
    useState<Report[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    async function fetchReports() {
      try {
        const data = await getReports();

        setReports(data);
      } catch (error) {
        setError(
          "Gagal mengambil data reports"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchReports();
  }, []);

  return {
    reports,
    isLoading,
    error,
  };
}