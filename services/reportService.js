import { apiRequest } from "@/lib/api";

// =====================================================
// GET PAYMENT REPORT
// =====================================================

export async function getPaymentReport(
  weddingId,
  period = "all_time"
) {
  return apiRequest(
    `/api/weddings/${weddingId}/reports/payments?period=${period}`
  );
}


// =====================================================
// GET GIFT REPORT
// =====================================================

export async function getGiftReport(
  weddingId,
  period = "all_time"
) {
  return apiRequest(
    `/api/weddings/${weddingId}/reports/gifts?period=${period}`
  );
}


// =====================================================
// GET GUEST REPORT
// =====================================================

export async function getGuestReport(
  weddingId,
  period = "all_time"
) {
  return apiRequest(
    `/api/weddings/${weddingId}/reports/guests?period=${period}`
  );
}


// =====================================================
// GET WEDDING SUMMARY
// =====================================================

export async function getWeddingSummary(
  weddingId,
  period = "all_time"
) {
  return apiRequest(
    `/api/weddings/${weddingId}/reports/summary?period=${period}`
  );
}