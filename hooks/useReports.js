"use client";

import { useQuery } from "@tanstack/react-query";

import {
  getPaymentReport,
  getGiftReport,
  getGuestReport,
  getWeddingSummary,
} from "@/services/reportService";


// =====================================================
// PAYMENT REPORT
// =====================================================

export function usePaymentReport(
  weddingId,
  period = "all_time"
) {
  return useQuery({
    queryKey: [
      "payment-report",
      weddingId,
      period,
    ],
    queryFn: () =>
      getPaymentReport(
        weddingId,
        period
      ),
    enabled: Boolean(weddingId),
  });
}


// =====================================================
// GIFT REPORT
// =====================================================

export function useGiftReport(
  weddingId,
  period = "all_time"
) {
  return useQuery({
    queryKey: [
      "gift-report",
      weddingId,
      period,
    ],
    queryFn: () =>
      getGiftReport(
        weddingId,
        period
      ),
    enabled: Boolean(weddingId),
  });
}


// =====================================================
// GUEST REPORT
// =====================================================

export function useGuestReport(
  weddingId,
  period = "all_time"
) {
  return useQuery({
    queryKey: [
      "guest-report",
      weddingId,
      period,
    ],
    queryFn: () =>
      getGuestReport(
        weddingId,
        period
      ),
    enabled: Boolean(weddingId),
  });
}


// =====================================================
// WEDDING SUMMARY
// =====================================================

export function useWeddingSummary(
  weddingId,
  period = "all_time"
) {
  return useQuery({
    queryKey: [
      "wedding-summary",
      weddingId,
      period,
    ],
    queryFn: () =>
      getWeddingSummary(
        weddingId,
        period
      ),
    enabled: Boolean(weddingId),
  });
}