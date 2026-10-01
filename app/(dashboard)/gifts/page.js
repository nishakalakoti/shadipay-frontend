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

import GiftStats from "@/components/gifts/GiftStats";
import GiftFilters from "@/components/gifts/GiftFilters";
import GiftTable from "@/components/gifts/GiftTable";
import AddPhysicalGiftModal from "@/components/gifts/AddPhysicalGiftModal";
import EditGiftModal from "@/components/gifts/EditGiftModal";
import DeleteGiftModal from "@/components/gifts/DeleteGiftModal";

import {
  useGifts,
  useCreateGift,
  useUpdateGift,
  useDeleteGift,
} from "@/hooks/useGifts";


export default function GiftsPage() {

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
  // GET GIFTS
  // =====================================================

  const {
    data: gifts = [],
    isLoading,
    isError,
    error,
  } = useGifts(
    selectedWeddingId
  );


  // =====================================================
  // CREATE GIFT
  // =====================================================

  const {
    mutate: createGift,
    isPending: isCreatingGift,
  } = useCreateGift(
    selectedWeddingId
  );


  // =====================================================
  // UPDATE GIFT
  // =====================================================

  const {
    mutate: updateGift,
    isPending: isUpdatingGift,
  } = useUpdateGift(
    selectedWeddingId
  );


  // =====================================================
  // DELETE GIFT
  // =====================================================

  const {
    mutate: deleteGift,
    isPending: isDeletingGift,
  } = useDeleteGift(
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
  // GIFT TYPE FILTER
  // =====================================================

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");


  // =====================================================
  // ADD GIFT MODAL
  // =====================================================

  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);


  // =====================================================
  // SELECTED GIFT
  // =====================================================

  const [
    selectedGift,
    setSelectedGift,
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
  // CREATE GIFT
  // =====================================================

  const handleAddPhysicalGift = (
    giftData
  ) => {

    if (!selectedWeddingId) {
      toast.error(
        "Please select a wedding first."
      );

      return;
    }

    createGift(
      giftData,
      {
        onSuccess: () => {

          toast.success(
            "Gift added successfully!"
          );

          setIsModalOpen(
            false
          );
        },

        onError: (error) => {

          toast.error(
            error?.message ||
              "Failed to add gift."
          );
        },
      }
    );
  };


  // =====================================================
  // OPEN EDIT GIFT MODAL
  // =====================================================

  const handleEditGift = (
    gift
  ) => {

    setSelectedGift(
      gift
    );

    setIsEditModalOpen(
      true
    );
  };


  // =====================================================
  // SAVE EDITED GIFT
  // PATCH API
  // =====================================================

  const handleSaveGift = (
    giftData
  ) => {

    if (
      !selectedWeddingId ||
      !selectedGift?.id
    ) {
      toast.error(
        "Unable to update gift."
      );

      return;
    }

    updateGift(
      {
        giftId:
          selectedGift.id,

        giftData,
      },
      {
        onSuccess: () => {

          toast.success(
            "Gift updated successfully!"
          );

          setIsEditModalOpen(
            false
          );

          setSelectedGift(
            null
          );
        },

        onError: (error) => {

          toast.error(
            error?.message ||
              "Failed to update gift."
          );
        },
      }
    );
  };


  // =====================================================
  // CLOSE EDIT MODAL
  // =====================================================

  const handleCloseEditModal = () => {

    if (isUpdatingGift) {
      return;
    }

    setIsEditModalOpen(
      false
    );

    setSelectedGift(
      null
    );
  };


  // =====================================================
  // OPEN DELETE GIFT MODAL
  // =====================================================

  const handleDeleteGift = (
    gift
  ) => {

    setSelectedGift(
      gift
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
      !selectedGift?.id
    ) {
      toast.error(
        "Unable to delete gift."
      );

      return;
    }

    deleteGift(
      selectedGift.id,
      {
        onSuccess: () => {

          toast.success(
            "Gift deleted successfully!"
          );

          setIsDeleteModalOpen(
            false
          );

          setSelectedGift(
            null
          );
        },

        onError: (error) => {

          toast.error(
            error?.message ||
              "Failed to delete gift."
          );
        },
      }
    );
  };


  // =====================================================
  // CLOSE DELETE MODAL
  // =====================================================

  const handleCloseDeleteModal = () => {

    if (isDeletingGift) {
      return;
    }

    setIsDeleteModalOpen(
      false
    );

    setSelectedGift(
      null
    );
  };


  // =====================================================
  // FILTER GIFTS
  // =====================================================

  const filteredGifts =
    useMemo(() => {

      const searchText =
        search
          .trim()
          .toLowerCase();

      return gifts.filter(
        (gift) => {

          const guestName =
            gift.guest_name || "";

          const giftName =
            gift.gift || "";

          const giftType =
            gift.gift_type || "";


          const matchesSearch =
            guestName
              .toLowerCase()
              .includes(searchText) ||

            giftName
              .toLowerCase()
              .includes(searchText);


          const matchesFilter =
            activeFilter === "All" ||
            giftType ===
              activeFilter;


          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );

    }, [
      gifts,
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
            Gifts & Registry
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Track all gifts and contributions received for your wedding.
          </p>

        </div>


        {/* =================================================
            ADD PHYSICAL GIFT
        ================================================== */}

        <button
          type="button"
          onClick={() =>
            setIsModalOpen(
              true
            )
          }
          disabled={
            !selectedWeddingId ||
            isCreatingGift
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
          + Log Physical Gift
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
              Loading gifts...
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
                "Failed to load gifts."}
            </p>

          </div>

        )}


      {/* =================================================
          GIFT DATA
      ================================================== */}

      {selectedWeddingId &&
        !isLoading &&
        !isError && (

          <>

            {/* =================================================
                STATS
            ================================================== */}

            <GiftStats
              gifts={gifts}
            />


            {/* =================================================
                FILTERS
            ================================================== */}

            <div className="mt-6">

              <GiftFilters
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

              <GiftTable
                gifts={
                  filteredGifts
                }
                onEditGift={
                  handleEditGift
                }
                onDeleteGift={
                  handleDeleteGift
                }
              />

            </div>

          </>

        )}


      {/* =================================================
          ADD GIFT MODAL
      ================================================== */}

      <AddPhysicalGiftModal
        isOpen={
          isModalOpen
        }
        onClose={() =>
          setIsModalOpen(
            false
          )
        }
        onAdd={
          handleAddPhysicalGift
        }
        isLoading={
          isCreatingGift
        }
      />


      {/* =================================================
          EDIT GIFT MODAL
      ================================================== */}

      <EditGiftModal
        isOpen={
          isEditModalOpen
        }
        onClose={
          handleCloseEditModal
        }
        gift={
          selectedGift
        }
        onSave={
          handleSaveGift
        }
        isLoading={
          isUpdatingGift
        }
      />


      {/* =================================================
          DELETE GIFT MODAL
      ================================================== */}

      <DeleteGiftModal
        isOpen={
          isDeleteModalOpen
        }
        onClose={
          handleCloseDeleteModal
        }
        gift={
          selectedGift
        }
        onConfirm={
          handleConfirmDelete
        }
        isLoading={
          isDeletingGift
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