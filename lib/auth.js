import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  verifyPasswordResetCode,
  confirmPasswordReset,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

function ensureAuth() {
  if (!auth) {
    throw new Error(
      "Firebase is not configured yet. Add your NEXT_PUBLIC_FIREBASE_* values to .env.local."
    );
  }

  return auth;
}

export async function registerUser({
  firstName,
  lastName,
  email,
  password,
}) {
  const currentAuth = ensureAuth();

  const userCredential = await createUserWithEmailAndPassword(
    currentAuth,
    email,
    password
  );

  const fullName = [firstName, lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  if (fullName) {
    await updateProfile(userCredential.user, {
      displayName: fullName,
    });
  }

  return userCredential.user;
}

export async function loginUser({
  email,
  password,
}) {
  const currentAuth = ensureAuth();

  const userCredential = await signInWithEmailAndPassword(
    currentAuth,
    email,
    password
  );

  return userCredential.user;
}

export async function logoutUser() {
  const currentAuth = ensureAuth();

  await signOut(currentAuth);
}

export async function sendPasswordReset(email) {
  const currentAuth = ensureAuth();

  await sendPasswordResetEmail(
    currentAuth,
    email
  );
}

export function getCurrentUser() {
  return auth?.currentUser || null;
}

export function subscribeToAuthChanges(callback) {
  if (!auth) {
    return () => {};
  }

  return onAuthStateChanged(auth, callback);
}

export async function loginWithGoogle() {
  const currentAuth = ensureAuth();

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account",
  });

  const result = await signInWithPopup(
    currentAuth,
    provider
  );

  return result.user;
}

export async function verifyResetCode(oobCode) {
  const currentAuth = ensureAuth();

  return verifyPasswordResetCode(
    currentAuth,
    oobCode
  );
}

export async function updatePasswordWithReset(
  oobCode,
  newPassword
) {
  const currentAuth = ensureAuth();

  return confirmPasswordReset(
    currentAuth,
    oobCode,
    newPassword
  );
}

export async function getCurrentUserToken(forceRefresh = false) {
  const currentAuth = ensureAuth();

  const user = currentAuth.currentUser;

  if (!user) {
    throw new Error("User is not authenticated.");
  }

  return await user.getIdToken(forceRefresh);
} 