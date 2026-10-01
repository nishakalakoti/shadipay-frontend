import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getGifts,
  getGift,
  createGift,
  updateGift,
  deleteGift,
} from "@/services/giftService";


// =====================================================
// GET ALL GIFTS
// GET /api/weddings/{wedding_id}/gifts
// =====================================================

export function useGifts(weddingId) {
  return useQuery({
    queryKey: ["gifts", weddingId],
    queryFn: () => getGifts(weddingId),
    enabled: !!weddingId,
  });
}


// =====================================================
// GET SINGLE GIFT
// GET /api/weddings/{wedding_id}/gifts/{gift_id}
// =====================================================

export function useGift(
  weddingId,
  giftId
) {
  return useQuery({
    queryKey: [
      "gift",
      weddingId,
      giftId,
    ],
    queryFn: () =>
      getGift(
        weddingId,
        giftId
      ),
    enabled:
      !!weddingId &&
      !!giftId,
  });
}


// =====================================================
// CREATE GIFT
// POST /api/weddings/{wedding_id}/gifts
// =====================================================

export function useCreateGift(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (giftData) =>
      createGift(
        weddingId,
        giftData
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "gifts",
          weddingId,
        ],
      });
    },
  });
}


// =====================================================
// UPDATE GIFT
// PATCH /api/weddings/{wedding_id}/gifts/{gift_id}
// =====================================================

export function useUpdateGift(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      giftId,
      giftData,
    }) =>
      updateGift(
        weddingId,
        giftId,
        giftData
      ),

    onSuccess: (updatedGift) => {
      queryClient.invalidateQueries({
        queryKey: [
          "gifts",
          weddingId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "gift",
          weddingId,
          updatedGift.id,
        ],
      });
    },
  });
}


// =====================================================
// DELETE GIFT
// DELETE /api/weddings/{wedding_id}/gifts/{gift_id}
// =====================================================

export function useDeleteGift(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (giftId) =>
      deleteGift(
        weddingId,
        giftId
      ),

    onSuccess: (_, giftId) => {
      queryClient.invalidateQueries({
        queryKey: [
          "gifts",
          weddingId,
        ],
      });

      queryClient.removeQueries({
        queryKey: [
          "gift",
          weddingId,
          giftId,
        ],
      });
    },
  });
}