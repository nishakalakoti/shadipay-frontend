"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import InvitationCard from "@/components/invitations/InvitationCard";
import InvitationLink from "@/components/invitations/InvitationLink";
import CreateInvitationModal from "@/components/invitations/CreateInvitationModal";
import EditInvitationModal from "@/components/invitations/EditInvitationModal";
import DeleteInvitationModal from "@/components/invitations/DeleteInvitationModal";

import {
  useInvitations,
  useCreateInvitation,
  useUpdateInvitation,
  useDeleteInvitation,
} from "@/hooks/useInvitations";

import { useWedding } from "@/hooks/useWeddings";


// =====================================================
// INVITATIONS PAGE
// =====================================================

export default function InvitationsPage() {

  // ===================================================
  // SELECTED WEDDING
  // ===================================================

  const [
    selectedWeddingId,
    setSelectedWeddingId,
  ] = useState(null);


  // ===================================================
  // CREATE MODAL
  // ===================================================

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);


  // ===================================================
  // EDIT MODAL
  // ===================================================

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);


  // ===================================================
  // DELETE MODAL
  // ===================================================

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);


  // ===================================================
  // SELECTED INVITATION
  // ===================================================

  const [
    selectedInvitation,
    setSelectedInvitation,
  ] = useState(null);


  // ===================================================
  // GET SELECTED WEDDING ID
  // ===================================================

  useEffect(() => {

    const weddingId =
      localStorage.getItem(
        "selectedWeddingId"
      );

    if (weddingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWeddingId(
        Number(weddingId)
      );
    }

  }, []);


  // ===================================================
  // GET WEDDING
  // ===================================================

  const {
    data: weddingData,
    isLoading: isWeddingLoading,
    isError: isWeddingError,
    error: weddingError,
  } = useWedding(
    selectedWeddingId
  );


  // ===================================================
  // GET INVITATIONS
  // ===================================================

  const {
    data: invitationData,
    isLoading: isInvitationLoading,
    isError: isInvitationError,
    error: invitationError,
  } = useInvitations(
    selectedWeddingId
  );


  // ===================================================
  // CREATE INVITATION
  // ===================================================

  const {
    mutate: createInvitation,
    isPending: isCreating,
    isError: isCreateError,
    error: createError,
  } = useCreateInvitation(
    selectedWeddingId
  );


  // ===================================================
  // UPDATE INVITATION
  // ===================================================

  const {
    mutate: updateInvitation,
    isPending: isUpdating,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateInvitation(
    selectedWeddingId
  );


  // ===================================================
  // DELETE INVITATION
  // ===================================================

  const {
    mutate: deleteInvitation,
    isPending: isDeleting,
  } = useDeleteInvitation(
    selectedWeddingId
  );


  // ===================================================
  // GET LATEST INVITATION
  // ===================================================

  const invitation = useMemo(() => {

    if (
      !Array.isArray(invitationData) ||
      invitationData.length === 0
    ) {
      return null;
    }

    const sortedInvitations = [
      ...invitationData,
    ].sort(
      (first, second) =>
        second.id - first.id
    );

    return sortedInvitations[0];

  }, [invitationData]);


  // ===================================================
  // FORMAT WEDDING DATA
  // ===================================================

  const wedding = useMemo(() => {

    if (!weddingData) {
      return null;
    }

    const coupleNames = [
      weddingData.first_partner,
      weddingData.second_partner,
    ]
      .filter(Boolean)
      .join(" & ");


    return {
      coupleNames:
        coupleNames ||
        "Wedding Couple",

      date:
        weddingData.wedding_date
          ? new Date(
              `${weddingData.wedding_date}T00:00:00`
            ).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }
            )
          : "-",

      time: "-",

      venue:
        weddingData.wedding_venue ||
        "-",

      status:
        "Published",

      invitationUrl:
        invitation?.invitation_url ||
        "",
    };

  }, [
    weddingData,
    invitation,
  ]);


  // ===================================================
  // CREATE INVITATION
  // ===================================================

  const handleCreateInvitation = (
    invitationFormData
  ) => {

    if (!selectedWeddingId) {
      return;
    }

    createInvitation(
      invitationFormData,
      {
        onSuccess: () => {

          setIsCreateModalOpen(
            false
          );

        },
      }
    );
  };


  // ===================================================
  // OPEN EDIT MODAL
  // ===================================================

  const handleEditInvitation = (
    invitationData
  ) => {

    setSelectedInvitation(
      invitationData
    );

    setIsEditModalOpen(
      true
    );
  };


  // ===================================================
  // SAVE EDITED INVITATION
  // ===================================================

  const handleSaveInvitation = (
    invitationFormData
  ) => {

    if (
      !selectedInvitation ||
      !selectedWeddingId
    ) {
      return;
    }

    updateInvitation(
      {
        invitationId:
          selectedInvitation.id,

        invitationData:
          invitationFormData,
      },
      {
        onSuccess: () => {

          setIsEditModalOpen(
            false
          );

          setSelectedInvitation(
            null
          );

        },
      }
    );
  };


  // ===================================================
  // OPEN DELETE MODAL
  // ===================================================

  const handleDeleteInvitation = (
    invitationData
  ) => {

    setSelectedInvitation(
      invitationData
    );

    setIsDeleteModalOpen(
      true
    );
  };


  // ===================================================
  // CONFIRM DELETE
  // ===================================================

  const handleConfirmDelete = () => {

    if (
      !selectedInvitation ||
      !selectedWeddingId
    ) {
      return;
    }

    deleteInvitation(
      selectedInvitation.id,
      {
        onSuccess: () => {

          setIsDeleteModalOpen(
            false
          );

          setSelectedInvitation(
            null
          );

        },
      }
    );
  };


  // ===================================================
  // CLOSE EDIT MODAL
  // ===================================================

  const handleCloseEditModal = () => {

    if (isUpdating) {
      return;
    }

    setIsEditModalOpen(
      false
    );

    setSelectedInvitation(
      null
    );
  };


  // ===================================================
  // CLOSE DELETE MODAL
  // ===================================================

  const handleCloseDeleteModal = () => {

    if (isDeleting) {
      return;
    }

    setIsDeleteModalOpen(
      false
    );

    setSelectedInvitation(
      null
    );
  };


  // ===================================================
  // NO WEDDING SELECTED
  // ===================================================

  if (!selectedWeddingId) {

    return (
      <main className="p-8">

        <div className="rounded-[20px] border border-[#eee8e8] bg-white px-6 py-10 text-center">

          <p className="text-sm font-semibold text-[#302b29]">
            No wedding selected
          </p>

          <p className="mt-2 text-sm text-[#817976]">
            Please select a wedding first.
          </p>

        </div>

      </main>
    );
  }


  // ===================================================
  // LOADING
  // ===================================================

  if (
    isWeddingLoading ||
    isInvitationLoading
  ) {

    return (
      <main className="p-8">

        <div className="flex min-h-[400px] items-center justify-center">

          <p className="text-sm font-medium text-[#817976]">
            Loading invitations...
          </p>

        </div>

      </main>
    );
  }


  // ===================================================
  // ERROR
  // ===================================================

  if (
    isWeddingError ||
    isInvitationError
  ) {

    return (
      <main className="p-8">

        <div className="rounded-[20px] border border-[#f0d7d7] bg-white px-6 py-10 text-center">

          <p className="text-sm font-semibold text-[#9b2635]">
            Failed to load invitations
          </p>

          <p className="mt-2 text-sm text-[#817976]">
            {invitationError?.message ||
              weddingError?.message ||
              "Something went wrong while loading invitations."}
          </p>

        </div>

      </main>
    );
  }


  // ===================================================
  // NO WEDDING DATA
  // ===================================================

  if (!wedding) {

    return (
      <main className="p-8">

        <div className="rounded-[20px] border border-[#eee8e8] bg-white px-6 py-10 text-center">

          <p className="text-sm font-semibold text-[#302b29]">
            Wedding not found
          </p>

        </div>

      </main>
    );
  }


  // ===================================================
  // MAIN UI
  // ===================================================

  return (
    <main className="p-8">

      {/* =========================================
          PAGE HEADER
      ========================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-[#171717]">
            Invitations
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Create and share your digital wedding invitation.
          </p>

        </div>


        {/* CREATE INVITATION */}

        {!invitation && (
          <button
            type="button"
            onClick={() =>
              setIsCreateModalOpen(
                true
              )
            }
            className="
              rounded-xl
              bg-[#7a0719]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#650515]
            "
          >
            Create Invitation
          </button>
        )}

      </div>


      {/* =========================================
          INVITATION
      ========================================== */}

      {invitation ? (

        <>
          <InvitationCard
            wedding={wedding}
            invitation={invitation}
            onEdit={
              handleEditInvitation
            }
            onDelete={
              handleDeleteInvitation
            }
          />


          <div className="mt-6">

            <InvitationLink
              url={
                invitation.invitation_url
              }
            />

          </div>
        </>

      ) : (

        <div className="rounded-[22px] border border-[#eee8e8] bg-white px-6 py-16 text-center shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

          <p className="text-sm font-semibold text-[#302b29]">
            No invitation found
          </p>

          <p className="mt-1 text-sm text-[#817976]">
            Create your first wedding invitation.
          </p>

        </div>

      )}


      {/* =================================================
          CREATE INVITATION MODAL
      ================================================== */}

      <CreateInvitationModal
        isOpen={
          isCreateModalOpen
        }
        onClose={() =>
          setIsCreateModalOpen(
            false
          )
        }
        onCreate={
          handleCreateInvitation
        }
        isLoading={
          isCreating
        }
        error={
          isCreateError
            ? createError?.message ||
              "Failed to create invitation."
            : ""
        }
      />


      {/* =================================================
          EDIT INVITATION MODAL
      ================================================== */}

      <EditInvitationModal
        isOpen={
          isEditModalOpen
        }
        onClose={
          handleCloseEditModal
        }
        invitation={
          selectedInvitation
        }
        onSave={
          handleSaveInvitation
        }
        isLoading={
          isUpdating
        }
        error={
          isUpdateError
            ? updateError?.message ||
              "Failed to update invitation."
            : ""
        }
      />


      {/* =================================================
          DELETE INVITATION MODAL
      ================================================== */}

      <DeleteInvitationModal
        isOpen={
          isDeleteModalOpen
        }
        onClose={
          handleCloseDeleteModal
        }
        invitation={
          selectedInvitation
        }
        onConfirm={
          handleConfirmDelete
        }
        isLoading={
          isDeleting
        }
      />

    </main>
  );
}