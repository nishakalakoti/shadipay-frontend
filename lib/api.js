import { getCurrentUserToken, logoutUser } from "@/lib/auth";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function apiRequest(endpoint, options = {}) {
  const token = await getCurrentUserToken();

  const isFormData =
    typeof FormData !== "undefined" &&
    options.body instanceof FormData;

  const headers = {
    ...(isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        }),

    ...(options.headers || {}),

    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers,
    }
  );

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      try {
        await logoutUser();
      } catch {
        // Ignore background sign-out failures.
      }
    }

    let errorMessage = "API request failed.";

    try {
      const errorData = await response.json();

      if (typeof errorData?.detail === "string") {
        errorMessage = errorData.detail;
      } else if (Array.isArray(errorData?.detail)) {
        errorMessage = errorData.detail
          .map((item) => item?.msg || "Validation error")
          .join(", ");
      } else if (errorData?.detail) {
        errorMessage = JSON.stringify(errorData.detail);
      }
    } catch {
      // Ignore JSON parsing error.
    }

    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}