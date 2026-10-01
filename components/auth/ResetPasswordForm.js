"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

import { updatePasswordWithReset, verifyResetCode } from "@/lib/auth";
import AuthLayout from "./AuthLayout";

const initialForm = {
  password: "",
  confirmPassword: "",
};

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [resetCode, setResetCode] = useState("");
  const [isCheckingCode, setIsCheckingCode] = useState(true);
  const [resetError, setResetError] = useState("");

  useEffect(() => {
    const code = searchParams.get("oobCode");

    if (!code) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResetError("Reset link is invalid or expired.");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsCheckingCode(false);
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResetCode(code);

    verifyResetCode(code)
      .then(() => {
        setResetError("");
      })
      .catch(() => {
        setResetError("Reset link is invalid or expired.");
      })
      .finally(() => {
        setIsCheckingCode(false);
      });
  }, [searchParams]);

  const passwordChecks = useMemo(
    () => [
      { label: "At least 8 characters", valid: formData.password.length >= 8 },
      { label: "One uppercase letter", valid: /[A-Z]/.test(formData.password) },
      { label: "One number", valid: /\d/.test(formData.password) },
      { label: "One special character", valid: /[^A-Za-z0-9]/.test(formData.password) },
    ],
    [formData.password]
  );

  const validate = () => {
    const nextErrors = {};

    if (!formData.password) {
      nextErrors.password = "New password is required.";
    } else {
      const passwordValid =
        formData.password.length >= 8 &&
        /[A-Z]/.test(formData.password) &&
        /\d/.test(formData.password) &&
        /[^A-Za-z0-9]/.test(formData.password);

      if (!passwordValid) {
        nextErrors.password = "Password does not meet the required criteria.";
      }
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your new password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || !resetCode) {
      return;
    }

    setIsSubmitting(true);

    try {
      await updatePasswordWithReset(resetCode, formData.password);
      setIsSuccess(true);
    } catch (error) {
      setResetError("Reset link is invalid or expired.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isCheckingCode) {
    return (
      <AuthLayout>
        <div className="flex min-h-[300px] items-center justify-center">
          <div className="flex items-center gap-3 rounded-2xl border border-[#eee8e8] bg-[#faf8f7] px-4 py-3 text-sm font-medium text-[#171717]">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#7a0719]/30 border-t-[#7a0719]" />
            Checking reset link...
          </div>
        </div>
      </AuthLayout>
    );
  }

  if (resetError) {
    return (
      <AuthLayout>
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
            <Lock className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-[Georgia,serif] text-4xl leading-tight text-[#171717]">
              Reset link is invalid or expired.
            </h2>
            <p className="text-sm text-[#5f5755]">
              Please request a new password reset link and try again.
            </p>
          </div>

          <Link
            href="/forgot-password"
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a0719] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(122,7,25,0.18)] transition hover:bg-[#650515]"
          >
            Request new reset link
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (isSuccess) {
    return (
      <AuthLayout>
        <div className="space-y-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-7 w-7" />
          </div>

          <div className="space-y-2">
            <h2 className="font-[Georgia,serif] text-4xl leading-tight text-[#171717]">
              Password updated successfully
            </h2>
            <p className="text-sm text-[#5f5755]">
              Your ShadiPay password has been updated. You can now sign in with your new credentials.
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.push("/login")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a0719] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(122,7,25,0.18)] transition hover:bg-[#650515]"
          >
            Continue to Sign In
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center lg:text-left">
          <p className="text-sm font-medium text-[#7a0719]">Security</p>
          <h2 className="font-[Georgia,serif] text-4xl leading-tight text-[#171717]">
            Create a new password
          </h2>
          <p className="text-sm text-[#817976]">
            Choose a strong password for your ShadiPay account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-[#171717]">
              New password
            </label>
            <div
              className={`flex items-center gap-3 rounded-2xl border bg-[#faf8f7] px-3.5 py-3 transition-all duration-200 ${
                errors.password
                  ? "border-red-300 bg-red-50"
                  : "border-[#eee8e8] focus-within:border-[#7a0719] focus-within:bg-white"
              }`}
            >
              <Lock className="h-4 w-4 text-[#817976]" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                aria-invalid={Boolean(errors.password)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="rounded-md p-1 text-[#817976] transition hover:text-[#7a0719]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password ? (
              <p className="text-xs text-red-600">{errors.password}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#171717]">
              Confirm new password
            </label>
            <div
              className={`flex items-center gap-3 rounded-2xl border bg-[#faf8f7] px-3.5 py-3 transition-all duration-200 ${
                errors.confirmPassword
                  ? "border-red-300 bg-red-50"
                  : "border-[#eee8e8] focus-within:border-[#7a0719] focus-within:bg-white"
              }`}
            >
              <Lock className="h-4 w-4 text-[#817976]" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                aria-invalid={Boolean(errors.confirmPassword)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((current) => !current)}
                className="rounded-md p-1 text-[#817976] transition hover:text-[#7a0719]"
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword ? (
              <p className="text-xs text-red-600">{errors.confirmPassword}</p>
            ) : null}
          </div>

          <div className="rounded-2xl border border-[#eee8e8] bg-[#faf8f7] p-3.5">
            <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-[#817976]">
              Password requirements
            </p>
            <ul className="grid gap-2 text-sm text-[#5f5755] sm:grid-cols-2">
              {passwordChecks.map(({ label, valid }) => (
                <li key={label} className={`flex items-center gap-2 ${valid ? "text-emerald-600" : "text-[#5f5755]"}`}>
                  <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border ${valid ? "border-emerald-500 bg-emerald-50 text-emerald-600" : "border-[#d7cdcd] bg-white text-[#817976]"}`}>
                    {valid ? "✓" : "•"}
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a0719] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(122,7,25,0.18)] transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                Updating password...
              </>
            ) : (
              <>
                Update Password
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
