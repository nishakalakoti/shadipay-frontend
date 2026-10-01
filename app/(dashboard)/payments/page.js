"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import PaymentStats from "@/components/payments/PaymentStats";
import PaymentFilters from "@/components/payments/PaymentFilters";
import PaymentTable from "@/components/payments/PaymentTable";
import EditPaymentModal from "@/components/payments/EditPaymentModal";
import DeletePaymentModal from "@/components/payments/DeletePaymentModal";

import {
  usePayments,
  useUpdatePayment,
  useDeletePayment,
} from "@/hooks/usePayments";


// =====================================================
// FORMAT PAYMENT DATE
// =====================================================

function formatPaymentDate(paymentDate) {
  if (!paymentDate) {
    return "-";
  }

  return new Date(
    paymentDate
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}


// =====================================================
// PAYMENTS PAGE
// =====================================================

export default function PaymentsPage() {

  // ===================================================
  // STATE
  // ===================================================

  const [
    selectedWeddingId,
    setSelectedWeddingId,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");


  // ===================================================
  // SELECTED PAYMENT
  // ===================================================

  const [
    selectedPayment,
    setSelectedPayment,
  ] = useState(null);

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);

  const [
    isDeleteModalOpen,
    setIsDeleteModalOpen,
  ] = useState(false);


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
  // GET PAYMENTS
  // ===================================================

  const {
    data: paymentData,
    isLoading,
    isError,
    error,
  } = usePayments(
    selectedWeddingId
  );


  // ===================================================
  // UPDATE PAYMENT
  // ===================================================

  const {
    mutate: updatePayment,
    isPending: isUpdatingPayment,
  } = useUpdatePayment(
    selectedWeddingId
  );


  // ===================================================
  // DELETE PAYMENT
  // ===================================================

  const {
    mutate: deletePayment,
    isPending: isDeletingPayment,
  } = useDeletePayment(
    selectedWeddingId
  );


  // ===================================================
  // CONVERT BACKEND DATA → UI DATA
  // ===================================================

  const payments = useMemo(() => {

    if (!Array.isArray(paymentData)) {
      return [];
    }

    return paymentData.map(
      (payment) => ({

        id: payment.id,

        transactionId:
          payment.transaction_id,

        guestName:
          payment.guest_name,

        amount:
          Number(payment.amount) || 0,

        method:
          payment.method,

        status:
          payment.status,

        // Formatted date for table
        date:
          formatPaymentDate(
            payment.payment_date
          ),

        // Original date for Edit modal
        paymentDate:
          payment.payment_date,
      })
    );

  }, [paymentData]);


  // ===================================================
  // SEARCH + STATUS FILTER
  // ===================================================

  const filteredPayments =
    useMemo(() => {

      return payments.filter(
        (payment) => {

          const searchText =
            search
              .trim()
              .toLowerCase();

          const matchesSearch =
            payment.guestName
              .toLowerCase()
              .includes(searchText) ||

            payment.transactionId
              .toLowerCase()
              .includes(searchText);

          const matchesFilter =
            activeFilter === "All" ||
            payment.status ===
              activeFilter;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );

    }, [
      payments,
      search,
      activeFilter,
    ]);


  // ===================================================
  // EDIT PAYMENT
  // ===================================================

  const handleEditPayment = (
    payment
  ) => {

    setSelectedPayment(
      payment
    );

    setIsEditModalOpen(
      true
    );
  };


  // ===================================================
  // DELETE PAYMENT
  // ===================================================

  const handleDeletePayment = (
    payment
  ) => {

    setSelectedPayment(
      payment
    );

    setIsDeleteModalOpen(
      true
    );
  };


  // ===================================================
  // SAVE UPDATED PAYMENT
  // ===================================================

  const handleSavePayment = (
    paymentData
  ) => {

    if (!selectedPayment) {
      return;
    }

    updatePayment(
      {
        paymentId:
          selectedPayment.id,

        paymentData,
      },
      {
        onSuccess: () => {

          setIsEditModalOpen(
            false
          );

          setSelectedPayment(
            null
          );
        },
      }
    );
  };


  // ===================================================
  // CONFIRM DELETE PAYMENT
  // ===================================================

  const handleConfirmDelete = () => {

    if (!selectedPayment) {
      return;
    }

    deletePayment(
      selectedPayment.id,
      {
        onSuccess: () => {

          setIsDeleteModalOpen(
            false
          );

          setSelectedPayment(
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

    if (isUpdatingPayment) {
      return;
    }

    setIsEditModalOpen(
      false
    );

    setSelectedPayment(
      null
    );
  };


  // ===================================================
  // CLOSE DELETE MODAL
  // ===================================================

  const handleCloseDeleteModal = () => {

    if (isDeletingPayment) {
      return;
    }

    setIsDeleteModalOpen(
      false
    );

    setSelectedPayment(
      null
    );
  };


  // ===================================================
  // LOADING
  // ===================================================

  if (isLoading) {

    return (
      <main className="p-8">

        <div className="flex min-h-[400px] items-center justify-center">

          <p className="text-sm font-medium text-[#817976]">
            Loading payments...
          </p>

        </div>

      </main>
    );
  }


  // ===================================================
  // ERROR
  // ===================================================

  if (isError) {

    return (
      <main className="p-8">

        <div className="rounded-[20px] border border-[#f0d7d7] bg-white px-6 py-10 text-center">

          <p className="text-sm font-semibold text-[#9b2635]">
            Failed to load payments
          </p>

          <p className="mt-2 text-sm text-[#817976]">
            {error?.message ||
              "Something went wrong while loading payments."}
          </p>

        </div>

      </main>
    );
  }


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
            Payments
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Track all online payments received for your wedding.
          </p>

        </div>


        {/* Export */}
        <button
          type="button"
          className="rounded-xl border border-[#e8dfdd] bg-white px-5 py-3 text-sm font-semibold text-[#625b59] transition hover:border-[#7a0719] hover:text-[#7a0719]"
        >
          Export Payments
        </button>

      </div>


      {/* =========================================
          STATS
      ========================================== */}

      <PaymentStats
        payments={payments}
      />


      {/* =========================================
          FILTERS
      ========================================== */}

      <div className="mt-6">

        <PaymentFilters
          search={search}
          setSearch={setSearch}
          activeFilter={activeFilter}
          setActiveFilter={
            setActiveFilter
          }
        />

      </div>


      {/* =========================================
          PAYMENT TABLE
      ========================================== */}

      <div className="mt-5">

        <PaymentTable
          payments={filteredPayments}
          onEditPayment={
            handleEditPayment
          }
          onDeletePayment={
            handleDeletePayment
          }
        />

      </div>


      {/* =========================================
          EDIT PAYMENT MODAL
      ========================================== */}

      <EditPaymentModal
        isOpen={
          isEditModalOpen
        }
        onClose={
          handleCloseEditModal
        }
        payment={
          selectedPayment
        }
        onSave={
          handleSavePayment
        }
        isLoading={
          isUpdatingPayment
        }
      />


      {/* =========================================
          DELETE PAYMENT MODAL
      ========================================== */}

      <DeletePaymentModal
        isOpen={
          isDeleteModalOpen
        }
        onClose={
          handleCloseDeleteModal
        }
        payment={
          selectedPayment
        }
        onConfirm={
          handleConfirmDelete
        }
        isLoading={
          isDeletingPayment
        }
      />

    </main>
  );
}