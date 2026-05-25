import { useState, useEffect } from "react";
import { getReports, getMyReports } from "../services/report.service";

export const useReports = (
  status?: string, 
  isMine: boolean = false, 
  search?: string,
  enabled: boolean = true // Defaultnya aktif
) => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false); // Default false karena mungkin nunggu enabled
  const [meta, setMeta] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchReports = async () => {
    if (!enabled) return;

    setLoading(true);
    setError(null);
    try {
      const response = isMine ? await getMyReports() : await getReports(status, search);
      
      if (isMine) {
        setReports(Array.isArray(response) ? response : []);
      } else if (response && response.data) {
        setReports(response.data);
        setMeta(response.meta);
      } else {
        setReports(Array.isArray(response) ? response : []);
      }
    } catch (error: any) {
      console.error("Error fetching reports:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (enabled) {
      fetchReports();
    }
  }, [status, search, enabled]);

  return { reports, loading, meta, error, refresh: fetchReports };
};
