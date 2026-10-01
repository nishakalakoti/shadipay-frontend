import { useQuery } from "@tanstack/react-query";

import { getWeddingAnalytics } from "@/services/analyticsService";


// =====================================================
// GET WEDDING ANALYTICS
// GET /api/weddings/{wedding_id}/analytics
// =====================================================

export function useAnalytics(weddingId) {
  return useQuery({
    queryKey: [
      "analytics",
      weddingId,
    ],

    queryFn: () =>
      getWeddingAnalytics(weddingId),

    enabled: !!weddingId,
  });
}