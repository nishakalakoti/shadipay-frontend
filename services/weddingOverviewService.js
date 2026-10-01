import { apiRequest } from "@/lib/api";

// =====================================================
// GET WEDDING OVERVIEW
// GET /api/weddings/{wedding_id}/overview
// =====================================================

export async function getWeddingOverview(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/overview`
  );
}