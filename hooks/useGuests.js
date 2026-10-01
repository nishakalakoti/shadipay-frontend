import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getGuests,
  getGuest,
  createGuest,
  updateGuest,
  deleteGuest,
} from "@/services/guestService";


// =====================================================
// GET ALL GUESTS
// GET /api/weddings/{wedding_id}/guests
// =====================================================

export function useGuests(weddingId) {
  return useQuery({
    queryKey: ["guests", weddingId],
    queryFn: () => getGuests(weddingId),
    enabled: !!weddingId,
  });
}


// =====================================================
// GET SINGLE GUEST
// GET /api/weddings/{wedding_id}/guests/{guest_id}
// =====================================================

export function useGuest(
  weddingId,
  guestId
) {
  return useQuery({
    queryKey: ["guest", weddingId, guestId],
    queryFn: () =>
      getGuest(
        weddingId,
        guestId
      ),
    enabled:
      !!weddingId &&
      !!guestId,
  });
}


// =====================================================
// CREATE GUEST
// POST /api/weddings/{wedding_id}/guests
// =====================================================

export function useCreateGuest(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guestData) =>
      createGuest(
        weddingId,
        guestData
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["guests", weddingId],
      });
    },
  });
}


// =====================================================
// UPDATE GUEST
// PATCH /api/weddings/{wedding_id}/guests/{guest_id}
// =====================================================

export function useUpdateGuest(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      guestId,
      guestData,
    }) =>
      updateGuest(
        weddingId,
        guestId,
        guestData
      ),

    onSuccess: (updatedGuest) => {
      queryClient.invalidateQueries({
        queryKey: ["guests", weddingId],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "guest",
          weddingId,
          updatedGuest.id,
        ],
      });
    },
  });
}


// =====================================================
// DELETE GUEST
// DELETE /api/weddings/{wedding_id}/guests/{guest_id}
// =====================================================

export function useDeleteGuest(weddingId) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (guestId) =>
      deleteGuest(
        weddingId,
        guestId
      ),

    onSuccess: (_, guestId) => {
      queryClient.invalidateQueries({
        queryKey: ["guests", weddingId],
      });

      queryClient.removeQueries({
        queryKey: [
          "guest",
          weddingId,
          guestId,
        ],
      });
    },
  });
}