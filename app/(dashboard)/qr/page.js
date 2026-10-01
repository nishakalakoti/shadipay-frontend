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

import WeddingQRCode from "@/components/qr/WeddingQRCode";
import QRInfo from "@/components/qr/QRInfo";
import CreateQRCodeModal from "@/components/qr/CreateQRCodeModal";
import EditQRCodeModal from "@/components/qr/EditQRCodeModal";
import DeleteQRCodeModal from "@/components/qr/DeleteQRCodeModal";

import {
  useQRCode,
  useCreateQRCode,
  useUpdateQRCode,
  useDeleteQRCode,
} from "@/hooks/useQr";

import { useWedding } from "@/hooks/useWeddings";


export default function QRPage() {

  // =====================================================
  // STATE
  // =====================================================

  const [
    selectedWeddingId,
    setSelectedWeddingId,
  ] = useState(null);

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);


  // =====================================================
  // GET SELECTED WEDDING ID
  // =====================================================

  useEffect(() => {
    const weddingId =
      window.localStorage.getItem(
        "selectedWeddingId"
      );

    if (weddingId) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWeddingId(weddingId);
    }
  }, []);


  // =====================================================
  // GET QR
  // QR API IS ONLY FOR QR DATA
  // =====================================================

  const qrQuery =
    useQRCode(selectedWeddingId);


  // =====================================================
  // GET WEDDING
  // WEDDING API IS FOR WEDDING DETAILS
  // =====================================================

  const weddingQuery =
    useWedding(selectedWeddingId);


  // =====================================================
  // CREATE QR
  // =====================================================

  const createQRMutation =
    useCreateQRCode(selectedWeddingId);


  // =====================================================
  // UPDATE QR
  // =====================================================

  const updateQRMutation =
    useUpdateQRCode(selectedWeddingId);


  // =====================================================
  // DELETE QR
  // =====================================================

  const deleteQRMutation =
    useDeleteQRCode(selectedWeddingId);


  // =====================================================
  // DATA
  // =====================================================

  const qrData =
    qrQuery.data || null;

  const weddingData =
    weddingQuery.data || null;


  // =====================================================
  // WEDDING DATA FOR UI
  //
  // Wedding details always come from Wedding API.
  // QR-specific data comes from QR API.
  // =====================================================

  const wedding = useMemo(() => {

    if (!weddingData) {
      return null;
    }

    return {

      // ---------------------------------------------------
      // WEDDING DATA
      // ---------------------------------------------------

      coupleNames:
        `${weddingData.first_partner} & ${weddingData.second_partner}`,

      date:
        weddingData.wedding_date
          ? new Date(
              `${weddingData.wedding_date}T00:00:00`
            ).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })
          : "-",

      venue:
        weddingData.wedding_venue || "-",

      weddingId:
        weddingData.id,


      // ---------------------------------------------------
      // QR DATA
      // ---------------------------------------------------

      registryUrl:
        qrData?.registry_link || "",

      qrImageUrl:
        qrData?.qr_image_url || "",

      description: "",
    };

  }, [
    weddingData,
    qrData,
  ]);


  // =====================================================
  // QR EXISTS
  // =====================================================

  const hasQRCode =
    Boolean(
      qrData?.qr_image_url
    );


  // =====================================================
  // QR NOT FOUND
  // =====================================================

  const qrNotFound =
    qrQuery.isError &&
    qrQuery.error?.message ===
      "QR Code not found";


  // =====================================================
  // LOADING
  // =====================================================

  const isLoading =
    qrQuery.isLoading ||
    weddingQuery.isLoading;


  // =====================================================
  // REAL GET ERROR
  // =====================================================

  const hasError =
    qrQuery.isError &&
    !qrNotFound;


  // =====================================================
  // CREATE QR
  // =====================================================

  const handleCreateQR = async (
    formData
  ) => {

    if (!selectedWeddingId) {
      toast.error(
        "Please select a wedding first."
      );
      return;
    }

    try {

      await createQRMutation.mutateAsync(
        formData
      );

      setIsCreateModalOpen(false);

      toast.success(
        "QR Code created successfully."
      );

    } catch (error) {

      console.error(
        "Create QR failed:",
        error
      );

      toast.error(
        error?.message ||
          "Failed to create QR Code."
      );
    }
  };


  // =====================================================
  // OPEN EDIT
  // =====================================================

  const handleEditQR = () => {
    setIsEditModalOpen(true);
  };


  // =====================================================
  // UPDATE QR
  // =====================================================

  const handleUpdateQR = async (
    formData
  ) => {

    if (!selectedWeddingId) {
      toast.error(
        "Please select a wedding first."
      );
      return;
    }

    try {

      await updateQRMutation.mutateAsync(
        formData
      );

      setIsEditModalOpen(false);

      toast.success(
        "QR Code updated successfully."
      );

    } catch (error) {

      console.error(
        "Update QR failed:",
        error
      );

      toast.error(
        error?.message ||
          "Failed to update QR Code."
      );
    }
  };


  // =====================================================
  // OPEN DELETE
  // =====================================================

  const handleDeleteQR = () => {
    setIsDeleteModalOpen(true);
  };


  // =====================================================
  // DELETE QR
  // =====================================================

  const handleConfirmDeleteQR =
    async () => {

      if (!selectedWeddingId) {
        toast.error(
          "Please select a wedding first."
        );
        return;
      }

      try {

        await deleteQRMutation.mutateAsync();

        setIsDeleteModalOpen(false);

        toast.success(
          "QR Code deleted successfully."
        );

      } catch (error) {

        console.error(
          "Delete QR failed:",
          error
        );

        toast.error(
          error?.message ||
            "Failed to delete QR Code."
        );
      }
    };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="p-8">

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
        theme="light"
      />


      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>

          <h1 className="text-3xl font-semibold text-[#171717]">
            QR Code
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Generate and share your wedding registry QR code.
          </p>

        </div>


        {/* =================================================
            CREATE BUTTON
        ================================================= */}

        {!hasQRCode && (
          <button
            type="button"
            onClick={() =>
              setIsCreateModalOpen(true)
            }
            disabled={
              !selectedWeddingId ||
              isLoading ||
              createQRMutation.isPending
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
            + Create QR Code
          </button>
        )}

      </div>


      {/* =================================================
          NO WEDDING
      ================================================== */}

      {!selectedWeddingId && (
        <div className="rounded-[20px] border border-[#eee8e8] bg-white px-6 py-10 text-center">

          <p className="text-sm font-semibold text-[#403a38]">
            Please select a wedding first.
          </p>

          <p className="mt-1 text-sm text-[#817976]">
            Your QR code is connected to the selected wedding.
          </p>

        </div>
      )}


      {/* =================================================
          LOADING
      ================================================== */}

      {selectedWeddingId &&
        isLoading && (
          <div className="mb-6 rounded-xl border border-[#eee8e8] bg-white px-5 py-4 text-sm text-[#77706e]">
            Loading QR code...
          </div>
        )}


      {/* =================================================
          GET ERROR
      ================================================== */}

      {selectedWeddingId &&
        hasError && (
          <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm text-red-600">
            {qrQuery.error?.message ||
              "Unable to load QR code."}
          </div>
        )}


      {/* =================================================
          NO QR CODE
      ================================================== */}

      {selectedWeddingId &&
        !isLoading &&
        !hasQRCode &&
        !hasError && (

          <div className="rounded-[24px] border border-[#eee8e8] bg-white px-6 py-14 text-center shadow-[0_2px_12px_rgba(60,30,30,0.03)]">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5eeee]">

              <span className="text-2xl font-semibold text-[#7a0719]">
                QR
              </span>

            </div>


            <h2 className="mt-4 text-lg font-semibold text-[#171717]">
              No QR Code yet
            </h2>


            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#817976]">
              Create a QR code for your wedding registry.
            </p>


            <button
              type="button"
              onClick={() =>
                setIsCreateModalOpen(true)
              }
              disabled={
                !selectedWeddingId ||
                createQRMutation.isPending
              }
              className="
                mt-6
                rounded-xl
                bg-[#7a0719]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:bg-[#650515]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              + Create QR Code
            </button>

          </div>
        )}


      {/* =================================================
          QR LAYOUT
      ================================================== */}

      {wedding && (
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">

          <WeddingQRCode
            wedding={wedding}
            hasQRCode={hasQRCode}
            onEdit={handleEditQR}
            onDelete={handleDeleteQR}
          />

          <QRInfo
            wedding={wedding}
          />

        </div>
      )}

      {/* =================================================
          CREATE MODAL
      ================================================== */}

      <CreateQRCodeModal
        isOpen={isCreateModalOpen}
        onClose={() =>
          setIsCreateModalOpen(false)
        }
        onCreate={handleCreateQR}
        isCreating={
          createQRMutation.isPending
        }
        wedding={wedding}
      />


      {/* =================================================
          EDIT MODAL
      ================================================== */}

      <EditQRCodeModal
        isOpen={isEditModalOpen}
        onClose={() =>
          setIsEditModalOpen(false)
        }
        onSave={handleUpdateQR}
        isSaving={
          updateQRMutation.isPending
        }
        wedding={wedding}
      />


      {/* =================================================
          DELETE MODAL
      ================================================== */}

      <DeleteQRCodeModal
        isOpen={isDeleteModalOpen}
        onClose={() =>
          setIsDeleteModalOpen(false)
        }
        onConfirm={
          handleConfirmDeleteQR
        }
        isDeleting={
          deleteQRMutation.isPending
        }
        wedding={wedding}
      />

    </main>
  );
}