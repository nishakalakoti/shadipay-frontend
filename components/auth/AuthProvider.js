"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "@/lib/firebase";

const TOKEN_REFRESH_INTERVAL_MS = 30 * 60 * 1000;
const INACTIVITY_TIMEOUT_MS = 20 * 60 * 1000;
const LAST_ACTIVITY_KEY = "shadipay:last-activity";
const LOGOUT_EVENT_KEY = "shadipay:logout";

const AuthContext = createContext({
  user: null,
  loading: true,
  refreshSession: async () => false,
  signOutUser: async () => {},
});

function readLastActivity() {
  if (typeof window === "undefined") {
    return Date.now();
  }

  const value = Number(window.localStorage.getItem(LAST_ACTIVITY_KEY));
  return Number.isFinite(value) ? value : Date.now();
}

function writeLastActivity(timestamp = Date.now()) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(LAST_ACTIVITY_KEY, String(timestamp));
}

function clearLastActivity() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(LAST_ACTIVITY_KEY);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const refreshTimerRef = useRef(null);
  const inactivityTimerRef = useRef(null);
  const lastActivityRef = useRef(readLastActivity());

  const clearTimers = () => {
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
      refreshTimerRef.current = null;
    }

    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = null;
    }
  };

  const signOutUser = async (broadcast = true) => {
    clearTimers();
    clearLastActivity();

    if (auth?.currentUser) {
      try {
        await signOut(auth);
      } catch (error) {
        // Ignore sign-out failures during cleanup.
      }
    }

    if (broadcast && typeof window !== "undefined") {
      window.localStorage.setItem(LOGOUT_EVENT_KEY, String(Date.now()));
    }
  };

  const refreshSession = async (force = false) => {
    if (!auth || !auth.currentUser) {
      return false;
    }

    try {
      await auth.currentUser.getIdToken(force);
      const now = Date.now();
      lastActivityRef.current = now;
      writeLastActivity(now);
      return true;
    } catch (error) {
      await signOutUser(true);
      return false;
    }
  };

  const restartInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }

    const now = Date.now();
    lastActivityRef.current = now;
    writeLastActivity(now);

    inactivityTimerRef.current = setTimeout(async () => {
      if (typeof document !== "undefined" && document.visibilityState === "hidden") {
        return;
      }

      const elapsed = Date.now() - lastActivityRef.current;

      if (elapsed >= INACTIVITY_TIMEOUT_MS) {
        await signOutUser(true);
      }
    }, INACTIVITY_TIMEOUT_MS);
  };

  const scheduleRefresh = () => {
    if (!auth || !auth.currentUser) {
      return;
    }

    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
    }

    refreshTimerRef.current = setInterval(async () => {
      const elapsedSinceActivity = Date.now() - lastActivityRef.current;

      if (elapsedSinceActivity >= INACTIVITY_TIMEOUT_MS) {
        await signOutUser(true);
        return;
      }

      await refreshSession(true);
    }, TOKEN_REFRESH_INTERVAL_MS);
  };

  useEffect(() => {
    if (!auth) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(null);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      clearTimers();
      clearLastActivity();
      return undefined;
    }

    const handleActivity = () => {
      const now = Date.now();
      const elapsed = now - lastActivityRef.current;

      if (elapsed < 1000) {
        return;
      }

      lastActivityRef.current = now;
      writeLastActivity(now);
      restartInactivityTimer();
    };

    const handleVisibilityChange = () => {
      if (typeof document === "undefined" || document.visibilityState !== "visible") {
        return;
      }

      const elapsedSinceActivity = Date.now() - lastActivityRef.current;

      if (elapsedSinceActivity >= INACTIVITY_TIMEOUT_MS && auth.currentUser) {
        signOutUser(true);
        return;
      }

      restartInactivityTimer();
    };

    const handleStorage = (event) => {
      if (event.key === LAST_ACTIVITY_KEY && event.newValue) {
        const value = Number(event.newValue);

        if (Number.isFinite(value)) {
          lastActivityRef.current = value;
          restartInactivityTimer();
        }
      }

      if (event.key === LOGOUT_EVENT_KEY && event.newValue && auth?.currentUser) {
        signOutUser(false);
      }
    };

    const activityEvents = [
      "pointerdown",
      "pointermove",
      "keydown",
      "scroll",
      "touchstart",
      "touchmove",
      "click",
      "focus",
    ];

    activityEvents.forEach((eventName) => {
      window.addEventListener(eventName, handleActivity, { passive: true });
    });

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("storage", handleStorage);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser) {
        lastActivityRef.current = Date.now();
        writeLastActivity(lastActivityRef.current);
        scheduleRefresh();
        restartInactivityTimer();
      } else {
        clearTimers();
        clearLastActivity();
      }
    });

    return () => {
      unsubscribe();
      activityEvents.forEach((eventName) => {
        window.removeEventListener(eventName, handleActivity);
      });
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("storage", handleStorage);
      clearTimers();
    };
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      refreshSession,
      signOutUser,
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
