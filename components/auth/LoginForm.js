"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
} from "lucide-react";

import { loginUser, loginWithGoogle } from "@/lib/auth";
import { apiRequest } from "@/lib/api";
import { getFriendlyAuthError } from "@/lib/firebaseErrors";

import AuthLayout from "./AuthLayout";

const initialForm = {
  email: "",
  password: "",
  remember: true,
};

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const validate = () => {
    const nextErrors = {};

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    if (status.type) {
      setStatus({
        type: "",
        message: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please correct the highlighted fields and try again.",
      });

      return;
    }

    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      // 1. Login with Firebase
      await loginUser({
        email: formData.email,
        password: formData.password,
      });

      // 2. Call backend /me
      // apiRequest() automatically gets Firebase ID token
      // and sends it as Authorization: Bearer <token>
      const currentUser = await apiRequest("/api/auth/me");

      // 3. Make sure backend authenticated the user
      if (!currentUser?.uid) {
        throw new Error("Backend authentication failed.");
      }

      // 4. Login successful only after backend verification
      setStatus({
        type: "success",
        message:
          "Signed in successfully. Redirecting to your dashboard...",
      });

      // 5. Open dashboard
      router.push("/wedding");
    } catch (error) {
      console.error("Login error:", error);

      setStatus({
        type: "error",
        message:
          error?.message || getFriendlyAuthError(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);

    setStatus({
      type: "",
      message: "",
    });

    try {
      // 1. Login with Google through Firebase
      await loginWithGoogle();

      // 2. Call backend /me
      const currentUser = await apiRequest("/api/auth/me");

      // 3. Backend must return Firebase UID
      if (!currentUser?.uid) {
        throw new Error("Backend authentication failed.");
      }

      // 4. Open dashboard only after backend verification
      router.push("/wedding");
    } catch (error) {
      console.error("Google login error:", error);

      setStatus({
        type: "error",
        message:
          error?.message || getFriendlyAuthError(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div className="space-y-2 text-center lg:text-left">
          <p className="text-sm font-medium text-[#7a0719]">
            Welcome back
          </p>

          <h2 className="font-[Georgia,serif] text-4xl leading-tight text-[#171717]">
            Welcome back
          </h2>

          <p className="text-sm text-[#817976]">
            Sign in to manage your wedding registry.
          </p>
        </div>

        {status.message ? (
          <div
            className={`flex items-start gap-2 rounded-2xl border px-3.5 py-3 text-sm ${
              status.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : null}

            <span>{status.message}</span>
          </div>
        ) : null}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
          noValidate
        >
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#171717]"
            >
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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                aria-invalid={Boolean(errors.email)}
              />
            </div>

            {errors.email ? (
              <p className="text-xs text-red-600">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#171717]"
            >
              Password
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
                placeholder="Enter your password"
                className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                aria-invalid={Boolean(errors.password)}
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((current) => !current)
                }
                className="rounded-md p-1 text-[#817976] transition hover:text-[#7a0719]"
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password ? (
              <p className="text-xs text-red-600">
                {errors.password}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-3">
            <label className="inline-flex items-center gap-2 text-sm text-[#171717]">
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-[#d9d0d0] bg-white text-[#7a0719] focus:ring-[#7a0719]"
              />

              Remember me
            </label>

            <Link
              href="/forgot-password"
              className="text-sm font-medium text-[#7a0719] transition hover:text-[#650515]"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a0719] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(122,7,25,0.18)] transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="relative my-3 flex items-center justify-center">
          <div className="h-px flex-1 bg-[#eee8e8]" />

          <span className="mx-3 text-[11px] font-semibold tracking-[0.18em] text-[#817976] uppercase">
            Or continue with
          </span>

          <div className="h-px flex-1 bg-[#eee8e8]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#eee8e8] bg-white px-4 py-3 text-sm font-medium text-[#171717] transition hover:border-[#d9d0d0] hover:bg-[#faf8f7] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#7a0719]/30 border-t-[#7a0719]" />
              Connecting...
            </>
          ) : (
            <>
              <Globe className="h-4 w-4 text-[#7a0719]" />
              Continue with Google
            </>
          )}
        </button>

        <p className="text-center text-sm text-[#5f5755]">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-[#7a0719] hover:text-[#650515]"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}