import { apiRequest } from "@/lib/api";


// =====================================================
// GET ALL PAYMENTS
// =====================================================

export async function getPayments(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/payments`
  );
}


// =====================================================
// GET SINGLE PAYMENT
// =====================================================

export async function getPayment(
  weddingId,
  paymentId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/payments/${paymentId}`
  );
}


// =====================================================
// UPDATE PAYMENT
// =====================================================

export async function updatePayment(
  weddingId,
  paymentId,
  paymentData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/payments/${paymentId}`,
    {
      method: "PATCH",
      body: JSON.stringify(paymentData),
    }
  );
}


// =====================================================
// DELETE PAYMENT
// =====================================================

export async function deletePayment(
  weddingId,
  paymentId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/payments/${paymentId}`,
    {
      method: "DELETE",
    }
  );
}