import { apiRequest } from "@/lib/api";


// =====================================================
// GET ALL GUESTS
// =====================================================

export async function getGuests(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/guests`
  );
}


// =====================================================
// GET SINGLE GUEST
// =====================================================

export async function getGuest(
  weddingId,
  guestId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/guests/${guestId}`
  );
}


// =====================================================
// CREATE GUEST
// =====================================================

export async function createGuest(
  weddingId,
  guestData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/guests`,
    {
      method: "POST",
      body: JSON.stringify(guestData),
    }
  );
}


// =====================================================
// UPDATE GUEST
// =====================================================

export async function updateGuest(
  weddingId,
  guestId,
  guestData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/guests/${guestId}`,
    {
      method: "PATCH",
      body: JSON.stringify(guestData),
    }
  );
}


// =====================================================
// DELETE GUEST
// =====================================================

export async function deleteGuest(
  weddingId,
  guestId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/guests/${guestId}`,
    {
      method: "DELETE",
    }
  );
}