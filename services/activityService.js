import { apiRequest } from "@/lib/api";


// =====================================================
// GET RECENT ACTIVITIES
// =====================================================

export async function getActivities(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/activities`
  );
}