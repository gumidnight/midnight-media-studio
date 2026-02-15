"use client";
import { useState, useEffect } from "react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show if not already accepted
    if (typeof window !== "undefined") {
      setVisible(!localStorage.getItem("cookieConsent"));
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center">
      <div className="m-4 px-6 py-4 bg-midnight-950/95 border border-white/10 rounded-xl shadow-lg flex flex-col sm:flex-row items-center gap-4 max-w-2xl w-full">
        <span className="text-gray-200 text-sm">
          This website uses cookies to enhance your experience. By continuing to browse, you agree to our use of cookies. <a href="#" className="underline text-accent-primary">Learn more</a>.
        </span>
        <button
          onClick={acceptCookies}
          className="px-5 py-2 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary text-white font-semibold shadow hover:scale-105 transition-transform"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
