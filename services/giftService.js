import { apiRequest } from "@/lib/api";


// =====================================================
// GET ALL GIFTS
// =====================================================

export async function getGifts(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/gifts`
  );
}


// =====================================================
// GET SINGLE GIFT
// =====================================================

export async function getGift(
  weddingId,
  giftId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/gifts/${giftId}`
  );
}


// =====================================================
// CREATE GIFT
// =====================================================

export async function createGift(
  weddingId,
  giftData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/gifts`,
    {
      method: "POST",
      body: JSON.stringify(giftData),
    }
  );
}


// =====================================================
// UPDATE GIFT
// =====================================================

export async function updateGift(
  weddingId,
  giftId,
  giftData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/gifts/${giftId}`,
    {
      method: "PATCH",
      body: JSON.stringify(giftData),
    }
  );
}


// =====================================================
// DELETE GIFT
// =====================================================

export async function deleteGift(
  weddingId,
  giftId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/gifts/${giftId}`,
    {
      method: "DELETE",
    }
  );
}