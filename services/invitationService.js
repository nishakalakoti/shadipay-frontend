import { apiRequest } from "@/lib/api";


// =====================================================
// GET ALL INVITATIONS
// =====================================================

export async function getInvitations(weddingId) {
  return apiRequest(
    `/api/weddings/${weddingId}/invitations`
  );
}


// =====================================================
// GET SINGLE INVITATION
// =====================================================

export async function getInvitation(
  weddingId,
  invitationId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/invitations/${invitationId}`
  );
}


// =====================================================
// CREATE INVITATION
// =====================================================

export async function createInvitation(
  weddingId,
  invitationData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/invitations`,
    {
      method: "POST",
      body: JSON.stringify(invitationData),
    }
  );
}


// =====================================================
// UPDATE INVITATION
// =====================================================

export async function updateInvitation(
  weddingId,
  invitationId,
  invitationData
) {
  return apiRequest(
    `/api/weddings/${weddingId}/invitations/${invitationId}`,
    {
      method: "PATCH",
      body: JSON.stringify(invitationData),
    }
  );
}


// =====================================================
// DELETE INVITATION
// =====================================================

export async function deleteInvitation(
  weddingId,
  invitationId
) {
  return apiRequest(
    `/api/weddings/${weddingId}/invitations/${invitationId}`,
    {
      method: "DELETE",
    }
  );
}