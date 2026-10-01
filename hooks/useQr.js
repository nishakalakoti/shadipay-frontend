"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getQRCode,
  createQRCode,
  updateQRCode,
  deleteQRCode,
} from "@/services/qrService";

// =====================================================
// GET QR CODE
// =====================================================

export function useQRCode(weddingId) {
  return useQuery({
    queryKey: ["qr-code", weddingId],

    queryFn: () => getQRCode(weddingId),

    enabled: Boolean(weddingId),

    retry: false,
  });
}

// =====================================================
// CREATE QR CODE
// =====================================================

export function useCreateQRCode(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      return createQRCode(weddingId, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qr-code", weddingId],
      });
    },
  });
}

// =====================================================
// UPDATE QR CODE
// =====================================================

export function useUpdateQRCode(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => {
      return updateQRCode(weddingId, formData);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qr-code", weddingId],
      });
    },
  });
}

// =====================================================
// DELETE QR CODE
// =====================================================

export function useDeleteQRCode(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return deleteQRCode(weddingId);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["qr-code", weddingId],
      });
    },
  });
}