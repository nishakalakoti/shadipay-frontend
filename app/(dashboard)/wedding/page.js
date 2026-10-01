"use client";

import { useEffect, useState } from "react";

import {
  Plus,
  ChevronDown,
} from "lucide-react";

import WeddingOverview from "@/components/wedding/WeddingOverview";
import CreateWeddingModal from "@/components/wedding/CreateWeddingModal";
import EditWeddingModal from "@/components/wedding/EditWeddingModal";

import { useWeddings } from "@/hooks/useWeddings";
import { useWeddingOverview } from "@/hooks/useWeddingOverview";


export default function WeddingPage() {

  // =====================================================
  // MODAL STATES
  // =====================================================

  const [
    isCreateModalOpen,
    setIsCreateModalOpen,
  ] = useState(false);

  const [
    isEditModalOpen,
    setIsEditModalOpen,
  ] = useState(false);


  // =====================================================
  // SELECTED WEDDING
  // =====================================================

  const [
    selectedWeddingId,
    setSelectedWeddingId,
  ] = useState(null);


  // =====================================================
  // GET ALL WEDDINGS
  // =====================================================

  const {
    data: weddings = [],
    isLoading,
    isError,
    error,
  } = useWeddings();


  // =====================================================
  // GET SELECTED WEDDING OVERVIEW
  // GET /api/weddings/{wedding_id}/overview
  // =====================================================

  const {
    data: weddingOverview,
    isLoading: isOverviewLoading,
    isError: isOverviewError,
    error: overviewError,
  } = useWeddingOverview(
    selectedWeddingId
  );


  // =====================================================
  // SET DEFAULT WEDDING
  // =====================================================

  useEffect(() => {
    if (weddings.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedWeddingId(null);
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedWeddingId((currentId) => {

      const currentWeddingExists =
        currentId &&
        weddings.some(
          (item) => item.id === currentId
        );

      if (currentWeddingExists) {
        return currentId;
      }

      return weddings[0].id;
    });

  }, [weddings]);


  // =====================================================
  // SAVE ACTIVE WEDDING
  // =====================================================

  useEffect(() => {
    if (!selectedWeddingId) {
      return;
    }

    localStorage.setItem(
      "selectedWeddingId",
      String(selectedWeddingId)
    );

  }, [selectedWeddingId]);


  // =====================================================
  // SELECTED WEDDING DATA
  // =====================================================

  const wedding = weddings.find(
    (item) =>
      item.id === selectedWeddingId
  );


  const hasWedding =
    Boolean(wedding);


  // =====================================================
  // CREATE WEDDING
  // =====================================================

  const handleCreateWedding = (
    createdWedding
  ) => {

    setSelectedWeddingId(
      createdWedding.id
    );

    setIsCreateModalOpen(false);
  };


  // =====================================================
  // UPDATE WEDDING
  // =====================================================

  const handleUpdateWedding = (
    updatedWedding
  ) => {

    setSelectedWeddingId(
      updatedWedding.id
    );

    setIsEditModalOpen(false);
  };


  // =====================================================
  // RENDER
  // =====================================================

  return (
    <main className="p-8">

      {/* =================================================
          PAGE HEADER
      ================================================== */}

      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        {/* =================================================
            LEFT
        ================================================== */}

        <div>

          <h1 className="text-3xl font-semibold text-[#171717]">
            My Wedding
          </h1>

          <p className="mt-1 text-sm text-[#77706e]">
            Manage your wedding registry, guests and gifts.
          </p>

        </div>


        {/* =================================================
            RIGHT
        ================================================== */}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

          {/* =================================================
              WEDDING DROPDOWN
          ================================================== */}

          <div className="relative">

            <select
              value={
                selectedWeddingId ?? ""
              }
              onChange={(e) =>
                setSelectedWeddingId(
                  Number(e.target.value)
                )
              }
              disabled={
                isLoading ||
                weddings.length === 0
              }
              className="
                h-11
                min-w-[240px]
                appearance-none
                rounded-xl
                border
                border-[#e8dfdd]
                bg-white
                pl-4
                pr-10
                text-sm
                font-medium
                text-[#403a38]
                outline-none
                transition
                focus:border-[#7a0719]
                disabled:cursor-not-allowed
                disabled:bg-[#f7f4f3]
                disabled:text-[#aaa19e]
              "
            >

              {weddings.length === 0 ? (

                <option value="">
                  No weddings created
                </option>

              ) : (

                weddings.map((item) => (

                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.first_partner} &amp;{" "}
                    {item.second_partner}
                  </option>

                ))

              )}

            </select>


            <ChevronDown
              size={17}
              className="
                pointer-events-none
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-[#817976]
              "
            />

          </div>


          {/* =================================================
              CREATE WEDDING BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setIsCreateModalOpen(true)
            }
            className="
              inline-flex
              h-11
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-[#7a0719]
              px-5
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-[#650515]
              active:scale-[0.98]
            "
          >

            <Plus size={17} />

            Create Wedding

          </button>

        </div>

      </div>


      {/* =====================================================
          LOADING
      ====================================================== */}

      {isLoading && (

        <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-[#ded5d2] bg-white">

          <p className="text-sm text-[#817976]">
            Loading weddings...
          </p>

        </div>

      )}


      {/* =====================================================
          ERROR
      ====================================================== */}

      {!isLoading &&
        isError && (

          <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-[#ded5d2] bg-white">

            <p className="text-sm text-red-600">
              {error?.message ||
                "Failed to load weddings."}
            </p>

          </div>

        )}


      {/* =====================================================
          WEDDING DATA
      ====================================================== */}

      {!isLoading &&
        !isError &&
        hasWedding && (

          <WeddingOverview
            wedding={wedding}
            overview={weddingOverview}
            isOverviewLoading={
              isOverviewLoading
            }
            isOverviewError={
              isOverviewError
            }
            overviewError={
              overviewError
            }
            onEdit={() =>
              setIsEditModalOpen(true)
            }
          />

        )}


      {/* =====================================================
          NO WEDDING
      ====================================================== */}

      {!isLoading &&
        !isError &&
        !hasWedding && (

          <div className="flex min-h-[420px] items-center justify-center rounded-[24px] border border-dashed border-[#ded5d2] bg-white">

            <div className="max-w-md text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f5eeee]">

                <Plus
                  size={26}
                  className="text-[#7a0719]"
                />

              </div>


              <h2 className="mt-5 text-xl font-semibold text-[#302b29]">
                Create your wedding registry
              </h2>


              <p className="mt-2 text-sm leading-6 text-[#817976]">
                Add your wedding details and create a unique registry
                where your guests can send gifts and payments.
              </p>


              <button
                type="button"
                onClick={() =>
                  setIsCreateModalOpen(true)
                }
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-[#7a0719]
                  px-6
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#650515]
                  active:scale-[0.98]
                "
              >

                <Plus size={17} />

                Create Wedding

              </button>

            </div>

          </div>

        )}


      {/* =====================================================
          CREATE WEDDING MODAL
      ====================================================== */}

      <CreateWeddingModal
        isOpen={
          isCreateModalOpen
        }
        onClose={() =>
          setIsCreateModalOpen(false)
        }
        onCreate={
          handleCreateWedding
        }
      />


      {/* =====================================================
          EDIT WEDDING MODAL
      ====================================================== */}

      {hasWedding && (

        <EditWeddingModal
          isOpen={
            isEditModalOpen
          }
          onClose={() =>
            setIsEditModalOpen(false)
          }
          wedding={wedding}
          onSave={
            handleUpdateWedding
          }
        />

      )}

    </main>
  );
}