"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ToastContainer,
  toast,
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import GuestStats from "@/components/guests/GuestStats";
import GuestFilters from "@/components/guests/GuestFilters";
import GuestTable from "@/components/guests/GuestTable";
import AddGuestModal from "@/components/guests/AddGuestModal";
import EditGuestModal from "@/components/guests/EditGuestModal";
import DeleteGuestModal from "@/components/guests/DeleteGuestModal";

import {
  useGuests,
  useCreateGuest,
  useUpdateGuest,
  useDeleteGuest,
} from "@/hooks/useGuests";


export default function GuestsPage() {

  // =====================================================
  // SELECTED / ACTIVE WEDDING
  // =====================================================

  const [
    selectedWeddingId,
    setSelectedWeddingId,
  ] = useState(null);


  // =====================================================
  // READ ACTIVE WEDDING FROM LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    const savedWeddingId =
      localStorage.getItem(
        "selectedWeddingId"
      );

    if (savedWeddingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWeddingId(
        Number(savedWeddingId)
      );
    }
  }, []);


  // =====================================================
  // GET GUESTS
  // =====================================================

  const {
    data: guests = [],
    isLoading,
    isError,
    error,
  } = useGuests(
    selectedWeddingId
  );


  // =====================================================
  // CREATE GUEST
  // =====================================================

  const {
    mutate: createGuest,
    isPending: isCreatingGuest,
  } = useCreateGuest(
    selectedWeddingId
  );


  // =====================================================
  // UPDATE GUEST
  // =====================================================

  const {
    mutate: updateGuest,
    isPending: isUpdatingGuest,
  } = useUpdateGuest(
    selectedWeddingId
  );


  // =====================================================
  // DELETE GUEST
  // =====================================================

  const {
    mutate: deleteGuest,
    isPending: isDeletingGuest,
  } = useDeleteGuest(
    selectedWeddingId
  );


  // =====================================================
  // SEARCH
  // =====================================================

  const [
    search,
    setSearch,
  ] = useState("");


  // =====================================================
  // RSVP FILTER
  // =====================================================

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");


  // =====================================================
  // ADD GUEST MODAL
  // =====================================================

  const [
    isAddModalOpen,
    setIsAddModalOpen,
  ] = useState(false);


  // =====================================================
  // SELECTED GUEST
  // =====================================================

  const [
    selectedGuest,
    setSelectedGuest,
  ] = useState(null);


  // =====================================================
  // EDIT MODAL
  // =====================================================

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);


  // =====================================================
  // DELETE MODAL
  // =====================================================

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);


  // =====================================================
  // ADD GUEST
  // =====================================================

  const handleAddGuest = (
    guestData
  ) => {

    if (!selectedWeddingId) {
      toast.error(
        "Please select a wedding first."
      );

      return;
    }

    createGuest(
      guestData,
      {
        onSuccess: () => {

          toast.success(
            "Guest added successfully!"
          );

          setIsAddModalOpen(
            false
          );
        },

        onError: (error) => {

          toast.error(
            error?.message ||
              "Failed to add guest."
          );
        },
      }
    );
  };


  // =====================================================
  // OPEN EDIT MODAL
  // =====================================================

  const handleEditGuest = (
    guest
  ) => {

    setSelectedGuest(
      guest
    );

    setIsEditModalOpen(
      true
    );
  };


  // =====================================================
  // SAVE EDITED GUEST
  // PATCH API
  // =====================================================

  const handleSaveGuest = (
    guestData
  ) => {

    if (
      !selectedWeddingId ||
      !selectedGuest?.id
    ) {
      toast.error(
        "Unable to update guest."
      );

      return;
    }

    updateGuest(
      {
        guestId:
          selectedGuest.id,

        guestData,
      },
      {
        onSuccess: () => {

          toast.success(
            "Guest updated successfully!"
          );

          setIsEditModalOpen(
            false
          );

          setSelectedGuest(
            null
          );
        },

        onError: (error) => {

          toast.error(
            error?.message ||
              "Failed to update guest."
          );
        },
      }
    );
  };


  // =====================================================
  // CLOSE EDIT MODAL
  // =====================================================

  const handleCloseEditModal = () => {

    if (isUpdatingGuest) {
      return;
    }

    setIsEditModalOpen(
      false
    );

    setSelectedGuest(
      null
    );
  };


  // =====================================================
  // OPEN DELETE MODAL
  // =====================================================

  const handleDeleteGuest = (
    guest
  ) => {

    setSelectedGuest(
      guest
    );

    setIsDeleteModalOpen(
      true
    );
  };


  // =====================================================
  // CONFIRM DELETE
  // DELETE API
  // =====================================================

  const handleConfirmDelete = () => {

    if (
      !selectedWeddingId ||
      !selectedGuest?.id
    ) {
      toast.error(
        "Unable to delete guest."
      );

      return;
    }

    deleteGuest(
      selectedGuest.id,
      {
        onSuccess: () => {

          toast.success(
            "Guest deleted successfully!"
          );

          setIsDeleteModalOpen(
            false
          );

          setSelectedGuest(
            null
          );
        },

        onError: (error) => {

          toast.error(
            error?.message ||
              "Failed to delete guest."
          );
        },
      }
    );
  };


  // =====================================================
  // CLOSE DELETE MODAL
  // =====================================================

  const handleCloseDeleteModal = () => {

    if (isDeletingGuest) {
      return;
    }

    setIsDeleteModalOpen(
      false
    );

    setSelectedGuest(
      null
    );
  };


  // =====================================================
  // FILTER GUESTS
  // =====================================================

  const filteredGuests =
    useMemo(() => {

      const searchText =
        search
          .trim()
          .toLowerCase();

      return guests.filter(
        (guest) => {

          const guestName =
            guest.guest_name || "";

          const phone =
            guest.phone || "";

          const email =
            guest.email || "";

          const rsvpStatus =
            guest.rsvp_status || "";


          const matchesSearch =
            guestName
              .toLowerCase()
              .includes(searchText) ||

            phone.includes(
              searchText
            ) ||

            email
              .toLowerCase()
              .includes(searchText);


          const matchesFilter =
            activeFilter === "All" ||
            rsvpStatus ===
              activeFilter;


          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );

    }, [
      guests,
      search,
      activeFilter,
    ]);


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="p-8">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-[#171717]">
            Guests
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Manage your wedding guests, RSVP and attendance.
          </p>

        </div>


        {/* =================================================
            ADD GUEST BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={() =>
            setIsAddModalOpen(
              true
            )
          }
          disabled={
            !selectedWeddingId
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
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          + Add Guest
        </button>

      </div>


      {/* =================================================
          NO ACTIVE WEDDING
      ================================================== */}

      {!selectedWeddingId && (

        <div className="rounded-[20px] border border-[#eee8e8] bg-white p-8 text-center">

          <p className="text-sm text-[#817976]">
            Please select a wedding first.
          </p>

        </div>

      )}


      {/* =================================================
          LOADING
      ================================================== */}

      {selectedWeddingId &&
        isLoading && (

          <div className="rounded-[20px] border border-[#eee8e8] bg-white p-8 text-center">

            <p className="text-sm text-[#817976]">
              Loading guests...
            </p>

          </div>

        )}


      {/* =================================================
          ERROR
      ================================================== */}

      {selectedWeddingId &&
        !isLoading &&
        isError && (

          <div className="rounded-[20px] border border-[#eee8e8] bg-white p-8 text-center">

            <p className="text-sm text-red-600">
              {error?.message ||
                "Failed to load guests."}
            </p>

          </div>

        )}


      {/* =================================================
          GUEST DATA
      ================================================== */}

      {selectedWeddingId &&
        !isLoading &&
        !isError && (

          <>

            {/* =================================================
                STATS
            ================================================== */}

            <GuestStats
              guests={guests}
            />


            {/* =================================================
                FILTERS
            ================================================== */}

            <div className="mt-6">

              <GuestFilters
                search={search}
                setSearch={setSearch}
                activeFilter={
                  activeFilter
                }
                setActiveFilter={
                  setActiveFilter
                }
              />

            </div>


            {/* =================================================
                TABLE
            ================================================== */}

            <div className="mt-5">

              <GuestTable
                guests={
                  filteredGuests
                }
                onEditGuest={
                  handleEditGuest
                }
                onDeleteGuest={
                  handleDeleteGuest
                }
              />

            </div>

          </>

        )}


      {/* =================================================
          ADD GUEST MODAL
      ================================================== */}

      <AddGuestModal
        isOpen={
          isAddModalOpen
        }
        onClose={() =>
          setIsAddModalOpen(
            false
          )
        }
        onAdd={
          handleAddGuest
        }
        isLoading={
          isCreatingGuest
        }
      />


      {/* =================================================
          EDIT GUEST MODAL
      ================================================== */}

      <EditGuestModal
        isOpen={
          isEditModalOpen
        }
        onClose={
          handleCloseEditModal
        }
        guest={
          selectedGuest
        }
        onSave={
          handleSaveGuest
        }
        isLoading={
          isUpdatingGuest
        }
      />


      {/* =================================================
          DELETE GUEST MODAL
      ================================================== */}

      <DeleteGuestModal
        isOpen={
          isDeleteModalOpen
        }
        onClose={
          handleCloseDeleteModal
        }
        guest={
          selectedGuest
        }
        onConfirm={
          handleConfirmDelete
        }
        isLoading={
          isDeletingGuest
        }
      />


      {/* =================================================
          TOAST
      ================================================== */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
      />

    </main>
  );
}