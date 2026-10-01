import "./globals.css";

import { AuthProvider } from "@/components/auth/AuthProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Providers from "./providers";


export const metadata = {
  title: "ShadiPay",
  description: "Wedding Gift & Payment Management Platform",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthProvider>
            <ProtectedRoute>
              {children}
            </ProtectedRoute>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}