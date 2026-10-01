"use client";

import { useEffect, useState } from "react";

import {
  X,
  Upload,
  QrCode,
} from "lucide-react";

export default function CreateQRCodeModal({
  isOpen,
  onClose,
  onCreate,
  isCreating = false,
  wedding,
}) {
  const [qrImage, setQrImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // =====================================================
  // RESET FORM
  // =====================================================

  useEffect(() => {
    if (!isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQrImage(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setImagePreview("");
    }
  }, [isOpen]);


  // =====================================================
  // CLEAN PREVIEW URL
  // =====================================================

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);


  // =====================================================
  // IMAGE CHANGE
  // =====================================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      alert(
        "Please upload a PNG, JPG, or WEBP image."
      );

      event.target.value = "";
      return;
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      alert(
        "QR image size must be less than 5MB."
      );

      event.target.value = "";
      return;
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }

    setQrImage(file);

    const previewUrl =
      URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };


  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!qrImage) {
      alert("Please upload a QR code image.");
      return;
    }

    const payload = new FormData();

    payload.append(
      "qr_image",
      qrImage
    );

    onCreate?.(payload);
  };


  if (!isOpen) {
    return null;
  }


  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-3 py-4 sm:px-4">

      {/* =================================================
          MODAL
      ================================================== */}

      <div
        className="
          flex
          max-h-[calc(100vh-2rem)]
          w-full
          max-w-xl
          flex-col
          overflow-hidden
          rounded-[20px]
          bg-white
          shadow-2xl
          sm:max-h-[calc(100vh-3rem)]
          sm:rounded-[24px]
        "
      >

        {/* =================================================
            HEADER
        ================================================== */}

        <div className="flex shrink-0 items-start justify-between border-b border-[#eee8e8] px-4 py-4 sm:px-6 sm:py-5">

          <div className="min-w-0">

            <div className="flex items-center gap-2">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5eeee]">
                <QrCode
                  size={18}
                  className="text-[#7a0719]"
                />
              </div>

              <h2 className="truncate text-base font-semibold text-[#171717] sm:text-lg">
                Create QR Code
              </h2>

            </div>

            <p className="mt-1 text-xs leading-5 text-[#817976] sm:text-sm">
              Upload the QR code for your wedding registry.
            </p>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={isCreating}
            aria-label="Close"
            className="
              ml-3
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-[#817976]
              transition
              hover:bg-[#f5eeee]
              hover:text-[#7a0719]
              disabled:cursor-not-allowed
              disabled:opacity-50
              sm:h-9
              sm:w-9
            "
          >
            <X size={18} />
          </button>

        </div>


        {/* =================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col"
        >

          {/* =================================================
              SCROLLABLE CONTENT
          ================================================== */}

          <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">

            {/* =================================================
                WEDDING INFO
            ================================================== */}

            <div className="rounded-2xl border border-[#eee8e8] bg-[#faf8f7] p-4 sm:p-5">

              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#a29a98] sm:text-xs">
                Selected Wedding
              </p>

              <h3 className="mt-2 break-words font-serif text-xl font-semibold text-[#171717] sm:text-2xl">
                {wedding?.coupleNames || "-"}
              </h3>

              <div className="mt-3 space-y-1 text-xs text-[#817976] sm:text-sm">

                <p className="break-words">
                  <span className="font-medium text-[#403a38]">
                    Date:
                  </span>{" "}
                  {wedding?.date || "-"}
                </p>

                <p className="break-words">
                  <span className="font-medium text-[#403a38]">
                    Venue:
                  </span>{" "}
                  {wedding?.venue || "-"}
                </p>

              </div>

            </div>


            {/* =================================================
                QR IMAGE
            ================================================== */}

            <div className="mt-5">

              <label className="mb-2 block text-sm font-semibold text-[#403a38]">
                QR Code Image
              </label>

              <label
                htmlFor="qr-image"
                className="
                  flex
                  min-h-[220px]
                  cursor-pointer
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border-2
                  border-dashed
                  border-[#e8dfdd]
                  bg-[#faf8f7]
                  px-4
                  py-6
                  text-center
                  transition
                  hover:border-[#7a0719]
                  sm:min-h-[260px]
                  sm:px-5
                  sm:py-8
                "
              >

                {imagePreview ? (
                  <>

                    <div
                      className="
                        flex
                        h-36
                        w-36
                        items-center
                        justify-center
                        rounded-xl
                        bg-white
                        p-3
                        shadow-sm
                        sm:h-44
                        sm:w-44
                      "
                    >
                      <img
                        src={imagePreview}
                        alt="QR Code Preview"
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <p className="mt-3 text-sm font-semibold text-[#403a38] sm:mt-4">
                      QR image selected
                    </p>

                    <p className="mt-1 text-xs text-[#817976]">
                      Click to replace the image
                    </p>

                  </>
                ) : (
                  <>

                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#f5eeee]">
                      <Upload
                        size={20}
                        className="text-[#7a0719]"
                      />
                    </div>

                    <p className="text-sm font-semibold text-[#403a38]">
                      Upload QR Code
                    </p>

                    <p className="mt-1 text-xs text-[#817976]">
                      PNG, JPG or WEBP
                    </p>

                    <p className="mt-1 text-[11px] text-[#a29a98]">
                      Maximum file size: 5MB
                    </p>

                  </>
                )}

              </label>

              <input
                id="qr-image"
                name="qrImage"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="hidden"
              />

            </div>


            {/* =================================================
                NOTE
            ================================================== */}

            <div className="mt-4 rounded-xl border border-[#eee8e8] bg-white px-4 py-3">

              <p className="text-xs leading-5 text-[#817976]">
                Wedding name, date, venue, and registry link
                are automatically connected to the selected
                wedding.
              </p>

            </div>

          </div>


          {/* =================================================
              FOOTER
          ================================================== */}

          <div
            className="
              flex
              shrink-0
              flex-col-reverse
              gap-2
              border-t
              border-[#eee8e8]
              px-4
              py-4
              sm:flex-row
              sm:justify-end
              sm:gap-3
              sm:px-6
              sm:py-5
            "
          >

            <button
              type="button"
              onClick={onClose}
              disabled={isCreating}
              className="
                w-full
                rounded-xl
                border
                border-[#e8dfdd]
                px-5
                py-3
                text-sm
                font-semibold
                text-[#625b59]
                transition
                hover:border-[#7a0719]
                hover:text-[#7a0719]
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Cancel
            </button>


            <button
              type="submit"
              disabled={
                isCreating ||
                !qrImage
              }
              className="
                w-full
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
                sm:w-auto
              "
            >
              {isCreating
                ? "Creating..."
                : "Create QR Code"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}