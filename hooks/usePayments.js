import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
} from "@/services/paymentService";


// =====================================================
// GET ALL PAYMENTS
// GET /api/weddings/{wedding_id}/payments
// =====================================================

export function usePayments(weddingId) {
  return useQuery({
    queryKey: [
      "payments",
      weddingId,
    ],

    queryFn: () =>
      getPayments(weddingId),

    enabled: !!weddingId,
  });
}


// =====================================================
// GET SINGLE PAYMENT
// GET /api/weddings/{wedding_id}/payments/{payment_id}
// =====================================================

export function usePayment(
  weddingId,
  paymentId
) {
  return useQuery({
    queryKey: [
      "payment",
      weddingId,
      paymentId,
    ],

    queryFn: () =>
      getPayment(
        weddingId,
        paymentId
      ),

    enabled:
      !!weddingId &&
      !!paymentId,
  });
}


// =====================================================
// UPDATE PAYMENT
// PATCH /api/weddings/{wedding_id}/payments/{payment_id}
// =====================================================

export function useUpdatePayment(
  weddingId
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      paymentId,
      paymentData,
    }) =>
      updatePayment(
        weddingId,
        paymentId,
        paymentData
      ),

    onSuccess: (updatedPayment) => {
      queryClient.invalidateQueries({
        queryKey: [
          "payments",
          weddingId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "payment",
          weddingId,
          updatedPayment.id,
        ],
      });
    },
  });
}


// =====================================================
// DELETE PAYMENT
// DELETE /api/weddings/{wedding_id}/payments/{payment_id}
// =====================================================

export function useDeletePayment(
  weddingId
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentId) =>
      deletePayment(
        weddingId,
        paymentId
      ),

    onSuccess: (_, paymentId) => {
      queryClient.invalidateQueries({
        queryKey: [
          "payments",
          weddingId,
        ],
      });

      queryClient.removeQueries({
        queryKey: [
          "payment",
          weddingId,
          paymentId,
        ],
      });
    },
  });
}