"use client";

import { useEffect, useState } from "react";
import { X, Heart } from "lucide-react";

export default function EditInvitationModal({
  isOpen,
  onClose,
  invitation,
  onSave,
  isLoading = false,
  error = "",
}) {
  const [form, setForm] = useState({
    title: "",
    message: "",
    theme: "Classic",
  });

  useEffect(() => {
    if (invitation && isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({
        title: invitation.title || "",
        message: invitation.message || "",
        theme: invitation.theme || "Classic",
      });
    }
  }, [invitation, isOpen]);

  if (!isOpen) {
    return null;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      title: form.title.trim(),
      message: form.message.trim(),
      theme: form.theme,
    };

    if (!payload.title || !payload.message) {
      return;
    }

    onSave(payload);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-[26px] bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#eee8e8] px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f5eeee]">
              <Heart
                size={19}
                className="text-[#7a0719]"
              />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#171717]">
                Edit Invitation
              </h2>

              <p className="mt-1 text-sm text-[#817976]">
                Update your wedding invitation details.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#817976] transition hover:bg-[#f5eeee] hover:text-[#7a0719] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={19} />
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Title */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#403a38]">
              Invitation Title
            </label>

            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Wedding Invitation"
              disabled={isLoading}
              className="w-full rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />
          </div>

          {/* Message */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#403a38]">
              Invitation Message
            </label>

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              placeholder="Write a beautiful message for your guests..."
              disabled={isLoading}
              className="w-full resize-none rounded-xl border border-[#e8dfdd] bg-white px-4 py-3 text-sm leading-6 text-[#302b29] outline-none transition placeholder:text-[#aaa19e] focus:border-[#7a0719] disabled:bg-[#faf8f7]"
            />
          </div>

          {/* Theme */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-[#403a38]">
              Choose Invitation Theme
            </label>

            <div className="grid grid-cols-3 gap-3">

              {["Classic", "Elegant", "Minimal"].map((theme) => (
                <button
                  key={theme}
                  type="button"
                  onClick={() =>
                    setForm((previous) => ({
                      ...previous,
                      theme,
                    }))
                  }
                  disabled={isLoading}
                  className={`rounded-xl border px-4 py-4 text-sm font-semibold transition ${
                    form.theme === theme
                      ? "border-[#7a0719] bg-[#f9eeee] text-[#7a0719]"
                      : "border-[#e8dfdd] text-[#625b59] hover:border-[#cdb9b6]"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                >
                  {theme}
                </button>
              ))}

            </div>
          </div>

          {/* Info */}
          <div className="rounded-xl bg-[#faf8f7] p-4">
            <p className="text-xs leading-5 text-[#817976]">
              Your wedding date, venue and couple names remain connected
              to your wedding details.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-[#f9e8e9] px-4 py-3 text-sm font-medium text-[#9b2635]">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="rounded-xl border border-[#e8dfdd] px-5 py-3 text-sm font-semibold text-[#625b59] transition hover:bg-[#faf8f7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-xl bg-[#7a0719] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading
                ? "Updating..."
                : "Update Invitation"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}