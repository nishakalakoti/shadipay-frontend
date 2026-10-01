"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { loginWithGoogle, registerUser } from "@/lib/auth";
import { getFriendlyAuthError } from "@/lib/firebaseErrors";
import AuthLayout from "./AuthLayout";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  terms: false,
};

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

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

    if (!formData.firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
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
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.terms) {
      nextErrors.terms = "You must agree to the Terms of Service and Privacy Policy.";
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
      setStatus({ type: "", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validate();

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus({
        type: "error",
        message: "Please fix the highlighted fields to continue.",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      setStatus({
        type: "success",
        message: "Account created successfully. Please sign in to continue.",
      });

      router.push("/login");
    } catch (error) {
      setStatus({
        type: "error",
        message: getFriendlyAuthError(error),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      await loginWithGoogle();
      router.push("/wedding");
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
        <div className="space-y-2 text-center lg:text-left">
          <p className="text-sm font-medium text-[#7a0719]">Create account</p>
          <h2 className="font-[Georgia,serif] text-4xl leading-tight text-[#171717]">
            Create your ShadiPay account
          </h2>
          <p className="text-sm text-[#817976]">
            Start managing your wedding gifts and payments effortlessly.
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

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="firstName" className="block text-sm font-medium text-[#171717]">
                First name
              </label>
              <div
                className={`flex items-center gap-3 rounded-2xl border bg-[#faf8f7] px-3.5 py-3 transition-all duration-200 ${
                  errors.firstName
                    ? "border-red-300 bg-red-50"
                    : "border-[#eee8e8] focus-within:border-[#7a0719] focus-within:bg-white"
                }`}
              >
                <User className="h-4 w-4 text-[#817976]" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="First name"
                  className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                  aria-invalid={Boolean(errors.firstName)}
                />
              </div>
              {errors.firstName ? (
                <p className="text-xs text-red-600">{errors.firstName}</p>
              ) : null}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="lastName" className="block text-sm font-medium text-[#171717]">
                Last name
              </label>
              <div
                className={`flex items-center gap-3 rounded-2xl border bg-[#faf8f7] px-3.5 py-3 transition-all duration-200 ${
                  errors.lastName
                    ? "border-red-300 bg-red-50"
                    : "border-[#eee8e8] focus-within:border-[#7a0719] focus-within:bg-white"
                }`}
              >
                <User className="h-4 w-4 text-[#817976]" />
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Last name"
                  className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                  aria-invalid={Boolean(errors.lastName)}
                />
              </div>
              {errors.lastName ? (
                <p className="text-xs text-red-600">{errors.lastName}</p>
              ) : null}
            </div>
          </div>

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
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
                aria-invalid={Boolean(errors.email)}
              />
            </div>
            {errors.email ? (
              <p className="text-xs text-red-600">{errors.email}</p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="phone" className="block text-sm font-medium text-[#171717]">
              Phone number <span className="text-[#817976]">(optional)</span>
            </label>
            <div className="flex items-center gap-3 rounded-2xl border border-[#eee8e8] bg-[#faf8f7] px-3.5 py-3 transition-all duration-200 focus-within:border-[#7a0719] focus-within:bg-white">
              <Phone className="h-4 w-4 text-[#817976]" />
              <input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(555) 123-4567"
                className="w-full border-0 bg-transparent text-sm text-[#171717] placeholder:text-[#9a918f] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-[#171717]">
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
                placeholder="Create a password"
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
              Confirm password
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
                placeholder="Confirm your password"
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

          <label className="flex items-start gap-3 rounded-2xl border border-[#eee8e8] bg-[#faf8f7] p-3 text-sm text-[#171717]">
            <input
              type="checkbox"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="mt-0.5 h-4 w-4 rounded border-[#d9d0d0] bg-white text-[#7a0719] focus:ring-[#7a0719]"
            />
            <span>
              I agree to the <span className="font-medium text-[#7a0719]">Terms of Service</span> and {" "}
              <span className="font-medium text-[#7a0719]">Privacy Policy.</span>
            </span>
          </label>
          {errors.terms ? <p className="text-xs text-red-600">{errors.terms}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#7a0719] px-4 py-3.5 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(122,7,25,0.18)] transition hover:bg-[#650515] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/60 border-t-white" />
                Creating account...
              </>
            ) : (
              <>
                Create Account
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
          onClick={handleGoogleSignup}
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
          Already have an account? {" "}
          <Link href="/login" className="font-semibold text-[#7a0719] hover:text-[#650515]">
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}