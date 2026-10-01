import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getWeddings,
  getWedding,
  createWedding,
  updateWedding,
  deleteWedding,
} from "@/services/weddingService";


// =====================================================
// GET ALL WEDDINGS
// GET /api/weddings
// =====================================================

export function useWeddings() {
  return useQuery({
    queryKey: ["weddings"],
    queryFn: getWeddings,
  });
}


// =====================================================
// GET SINGLE WEDDING
// GET /api/weddings/{wedding_id}
// =====================================================

export function useWedding(weddingId) {
  return useQuery({
    queryKey: ["wedding", weddingId],
    queryFn: () => getWedding(weddingId),
    enabled: !!weddingId,
  });
}


// =====================================================
// CREATE WEDDING
// POST /api/weddings
// =====================================================

export function useCreateWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createWedding,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["weddings"],
      });
    },
  });
}


// =====================================================
// UPDATE WEDDING
// PATCH /api/weddings/{wedding_id}
// =====================================================

export function useUpdateWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      weddingId,
      weddingData,
    }) =>
      updateWedding(
        weddingId,
        weddingData
      ),

    onSuccess: (updatedWedding) => {
      queryClient.invalidateQueries({
        queryKey: ["weddings"],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "wedding",
          updatedWedding.id,
        ],
      });
    },
  });
}


// =====================================================
// DELETE WEDDING
// DELETE /api/weddings/{wedding_id}
// =====================================================

export function useDeleteWedding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteWedding,

    onSuccess: (_, weddingId) => {
      queryClient.invalidateQueries({
        queryKey: ["weddings"],
      });

      queryClient.removeQueries({
        queryKey: [
          "wedding",
          weddingId,
        ],
      });
    },
  });
}