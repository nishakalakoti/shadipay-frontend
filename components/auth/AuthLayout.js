import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  Gift,
  Heart,
  Sparkles,
  Users,
} from "lucide-react";

const highlights = [
  { icon: Gift, label: "Gift tracking" },
  { icon: Users, label: "Guest coordination" },
  { icon: CreditCard, label: "Secure payments" },
];

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#faf8f7] px-4 py-5 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[30px] border border-[#eee8e8] bg-white shadow-[0_24px_60px_rgba(122,7,25,0.06)]">
          <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
            <div className="relative hidden overflow-hidden bg-gradient-to-br from-[#fff8f7] via-[#fdf1f2] to-[#f7e7e8] p-8 lg:flex lg:flex-col lg:justify-between">
              <div className="absolute inset-0 opacity-70">
                <div className="absolute -left-14 top-14 h-52 w-52 rounded-full bg-[#f8dfe1] blur-2xl" />
                <div className="absolute right-6 top-24 h-40 w-40 rounded-full bg-[#f9ece5] blur-2xl" />
                <div className="absolute bottom-10 left-10 h-56 w-56 rounded-full bg-[#f4d3d7] blur-2xl" />
              </div>

              <div className="relative z-10">
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7a0719] text-sm font-semibold text-white shadow-sm">
                    S
                  </div>
                  <span className="text-2xl font-semibold tracking-tight text-[#7a0719]">
                    ShadiPay
                  </span>
                </Link>
              </div>

              <div className="relative z-10 max-w-md space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#f0dfe2] bg-white/70 px-3 py-1.5 text-xs font-medium text-[#7a0719] backdrop-blur-sm">
                  <Heart className="h-3.5 w-3.5" fill="currentColor" />
                  Thoughtful wedding planning
                </div>

                <div className="space-y-4">
                  <h1 className="font-[Georgia,serif] text-5xl leading-[1.05] text-[#171717]">
                    Celebrate every blessing.
                    <span className="mt-2 block text-[#7a0719]">
                      Keep every gift remembered.
                    </span>
                  </h1>

                  <p className="max-w-sm text-base leading-7 text-[#5f5755]">
                    ShadiPay helps you manage wedding gifts, payments, guests and
                    your wedding registry in one beautiful place.
                  </p>
                </div>
              </div>

              <div className="relative z-10 space-y-4">
                <div className="flex items-center gap-3 text-sm font-medium text-[#171717]">
                  <Sparkles className="h-4 w-4 text-[#7a0719]" />
                  Made for modern love stories
                </div>

                <div className="grid gap-3">
                  {highlights.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-3 rounded-2xl border border-[#f1e9e9] bg-white/70 px-3 py-2.5 text-sm text-[#2a2523] shadow-sm"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f8e8ea] text-[#7a0719]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center bg-white p-5 sm:p-7 md:p-9 lg:p-10">
              <div className="w-full max-w-md">
                <div className="mb-8 flex items-center justify-center lg:hidden">
                  <Link href="/" className="inline-flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7a0719] text-sm font-semibold text-white shadow-sm">
                      S
                    </div>
                    <span className="text-[22px] font-semibold tracking-tight text-[#7a0719]">
                      ShadiPay
                    </span>
                  </Link>
                </div>

                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
