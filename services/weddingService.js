import { apiRequest } from "@/lib/api";


// =====================================================
// GET ALL WEDDINGS
// =====================================================

export async function getWeddings() {
  return apiRequest("/api/weddings");
}


// =====================================================
// GET SINGLE WEDDING
// =====================================================

export async function getWedding(weddingId) {
  return apiRequest(`/api/weddings/${weddingId}`);
}


// =====================================================
// CREATE WEDDING
// =====================================================

export async function createWedding(weddingData) {
  return apiRequest("/api/weddings", {
    method: "POST",
    body: JSON.stringify(weddingData),
  });
}


// =====================================================
// UPDATE WEDDING
// =====================================================

export async function updateWedding(
  weddingId,
  weddingData
) {
  return apiRequest(`/api/weddings/${weddingId}`, {
    method: "PATCH",
    body: JSON.stringify(weddingData),
  });
}


// =====================================================
// DELETE WEDDING
// =====================================================

export async function deleteWedding(weddingId) {
  return apiRequest(`/api/weddings/${weddingId}`, {
    method: "DELETE",
  });
}