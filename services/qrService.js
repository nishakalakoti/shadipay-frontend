import { apiRequest } from "@/lib/api";

// =====================================================
// GET QR CODE
// =====================================================

export async function getQRCode(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/qr`
  );
}

// =====================================================
// CREATE QR CODE
// =====================================================

export async function createQRCode(
  weddingId,
  formData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/qr`,
    {
      method: "POST",
      body: formData,
    }
  );
}

// =====================================================
// UPDATE QR CODE
// =====================================================

export async function updateQRCode(
  weddingId,
  formData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/qr`,
    {
      method: "PATCH",
      body: formData,
    }
  );
}

// =====================================================
// DELETE QR CODE
// =====================================================

export async function deleteQRCode(
  weddingId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/qr`,
    {
      method: "DELETE",
    }
  );
}