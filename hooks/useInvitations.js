import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getInvitations,
  getInvitation,
  createInvitation,
  updateInvitation,
  deleteInvitation,
} from "@/services/invitationService";


// =====================================================
// GET ALL INVITATIONS
// GET /api/weddings/{wedding_id}/invitations
// =====================================================

export function useInvitations(weddingId) {
  return useQuery({
    queryKey: [
      "invitations",
      weddingId,
    ],

    queryFn: () =>
      getInvitations(weddingId),

    enabled: !!weddingId,
  });
}


// =====================================================
// GET SINGLE INVITATION
// GET /api/weddings/{wedding_id}/invitations/{invitation_id}
// =====================================================

export function useInvitation(
  weddingId,
  invitationId
) {
  return useQuery({
    queryKey: [
      "invitation",
      weddingId,
      invitationId,
    ],

    queryFn: () =>
      getInvitation(
        weddingId,
        invitationId
      ),

    enabled:
      !!weddingId &&
      !!invitationId,
  });
}


// =====================================================
// CREATE INVITATION
// POST /api/weddings/{wedding_id}/invitations
// =====================================================

export function useCreateInvitation(
  weddingId
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationData) =>
      createInvitation(
        weddingId,
        invitationData
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "invitations",
          weddingId,
        ],
      });
    },
  });
}


// =====================================================
// UPDATE INVITATION
// PATCH /api/weddings/{wedding_id}/invitations/{invitation_id}
// =====================================================

export function useUpdateInvitation(
  weddingId
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invitationId,
      invitationData,
    }) =>
      updateInvitation(
        weddingId,
        invitationId,
        invitationData
      ),

    onSuccess: (updatedInvitation) => {
      queryClient.invalidateQueries({
        queryKey: [
          "invitations",
          weddingId,
        ],
      });

      queryClient.invalidateQueries({
        queryKey: [
          "invitation",
          weddingId,
          updatedInvitation.id,
        ],
      });
    },
  });
}


// =====================================================
// DELETE INVITATION
// DELETE /api/weddings/{wedding_id}/invitations/{invitation_id}
// =====================================================

export function useDeleteInvitation(
  weddingId
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationId) =>
      deleteInvitation(
        weddingId,
        invitationId
      ),

    onSuccess: (_, invitationId) => {
      queryClient.invalidateQueries({
        queryKey: [
          "invitations",
          weddingId,
        ],
      });

      queryClient.removeQueries({
        queryKey: [
          "invitation",
          weddingId,
          invitationId,
        ],
      });
    },
  });
}