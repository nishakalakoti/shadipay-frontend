export function getFriendlyAuthError(error) {
  const code = error?.code || "";

  const errorMap = {
    "auth/email-already-in-use": "An account with this email already exists.",
    "auth/invalid-email": "Please enter a valid email address.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/invalid-credential": "Invalid email or password.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Invalid email or password.",
    "auth/too-many-requests": "Too many attempts. Please try again later.",
    "auth/network-request-failed": "Network error. Please check your internet connection.",
    "auth/popup-closed-by-user": "Google sign-in was cancelled.",
    "auth/cancelled-popup-request": "Google sign-in was cancelled.",
    "auth/account-exists-with-different-credential": "This account is already linked to a different sign-in method.",
    "auth/operation-not-allowed": "This sign-in method is not enabled yet.",
    "auth/requires-recent-login": "Please sign in again to continue.",
  };

  return errorMap[code] || "Something went wrong. Please try again.";
}
