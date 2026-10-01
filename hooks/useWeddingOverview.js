import { useQuery } from "@tanstack/react-query";

import { getWeddingOverview } from "@/services/weddingOverviewService";


// =====================================================
// GET WEDDING OVERVIEW
// GET /api/weddings/{wedding_id}/overview
// =====================================================

export function useWeddingOverview(weddingId) {
  return useQuery({
    queryKey: ["weddingOverview", weddingId],
    queryFn: () => getWeddingOverview(weddingId),
    enabled: !!weddingId,
  });
}