import { useQuery } from "@tanstack/react-query";

import { getActivities } from "@/services/activityService";


// =====================================================
// GET ACTIVITIES
// GET /api/weddings/{wedding_id}/activities
// =====================================================

export function useActivities(weddingId) {
  return useQuery({
    queryKey: [
      "activities",
      weddingId,
    ],

    queryFn: () =>
      getActivities(weddingId),

    enabled: !!weddingId,
  });
}