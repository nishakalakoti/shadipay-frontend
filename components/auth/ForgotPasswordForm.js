"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, CheckCircle2, Mail } from "lucide-react";

import { sendPasswordReset } from "@/lib/auth";
import { getFriendlyAuthError } from "@/lib/firebaseErrors";
import AuthLayout from "./AuthLayout";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    return nextErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address to continue.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await sendPasswordReset(email);
      setIsSubmitted(true);
      setStatus({
        type: "success",
        message: "If an account exists with this email, we've sent instructions to reset your password.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: getFriendlyAuthError(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {!isSubmitted ? (
          <>
            <div className="space-y-2 text-center lg:text-left">
              <p className="text-sm font-medium text-[#7a0719]">Trouble signing in?</p>
              <h2 className="font-[Georgia,serif] text-4xl leading-tight text-[#171717]">
                Forgot your password?
              </h2>
              <p className="text-sm text-[#817976]">
                Enter your email and we&apos;ll help you reset your password.
              </p>
            </div>

            {status.message ? (
              <div className={`rounded-2xl border px-3.5 py-3 text-sm ${
                status.type === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}>
                {status.message}
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-[#171717]">
                  Email address
                </label>
                <div
                  className={`flex items-center gap-3 rounded-2xl border bg-[#faf8f7] px-3.5 py-3 transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-[#eee8e8] focus-within:border-[#7a0719] focus-within:bg-white"
                  }`}
                >
                  <Mail className="h-4 w-4 text-[#817976]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setErrors((current) => ({ ...current, email: "" }));
                      if (status.type) {
                        setStatus({ type: "", message: "" });
                      }
                    }}
                    placeholder="Enter your email address"
                    className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                    aria-invalid={Boolean(errors.email)}
                  />
                </div>
                {errors.email ? (
                  <p className="text-xs text-red-600">{errors.email}</p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a0719] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(122,7,25,0.18)] transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="space-y-5 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-[Georgia,serif] text-3xl text-[#171717]">Check your email</h3>
              <p className="text-sm leading-6 text-[#5f5755]">
                If an account exists with this email, we&apos;ve sent instructions to reset your password.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setEmail("");
                setErrors({});
                setIsSubmitted(false);
                setStatus({ type: "", message: "" });
              }}
              className="text-sm font-medium text-[#7a0719] transition hover:text-[#650515]"
            >
              Didn&apos;t receive the email? Try again
            </button>
          </div>
        )}

        <p className="text-center text-sm text-[#5f5755]">
          Remember your password? {" "}
          <Link href="/login" className="font-semibold text-[#7a0719] hover:text-[#650515]">
            Back to Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
