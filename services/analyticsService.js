import { apiRequest } from "@/lib/api";


// =====================================================
// GET WEDDING ANALYTICS
// =====================================================

export async function getWeddingAnalytics(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/analytics`
  );
}