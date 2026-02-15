'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

// Replace with your actual reCAPTCHA v3 site key from https://www.google.com/recaptcha/admin
export const RECAPTCHA_SITE_KEY = '6LesiWwsAAAAABx8hyDs5HxMe9sSQq8j9jHAAKd2';

interface ReCaptchaContextType {
  executeRecaptcha: (action: string) => Promise<string | null>;
  isLoaded: boolean;
}

const ReCaptchaContext = createContext<ReCaptchaContextType>({
  executeRecaptcha: async () => null,
  isLoaded: false,
});

export function useReCaptcha() {
  return useContext(ReCaptchaContext);
}

export function ReCaptchaProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Skip if already loaded or if using placeholder key
    if (RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_SITE_KEY') {
      console.warn('reCAPTCHA: Using placeholder key. Replace RECAPTCHA_SITE_KEY with your actual key.');
      setIsLoaded(true); // Allow form to work without reCAPTCHA for demo
      return;
    }

    if (window.grecaptcha) {
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    
    script.onload = () => {
      window.grecaptcha.ready(() => {
        setIsLoaded(true);
      });
    };

    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount if needed
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  const executeRecaptcha = async (action: string): Promise<string | null> => {
    // Return dummy token if using placeholder key (for demo purposes)
    if (RECAPTCHA_SITE_KEY === 'YOUR_RECAPTCHA_SITE_KEY') {
      return 'demo_token_replace_with_real_recaptcha';
    }

    if (!isLoaded || !window.grecaptcha) {
      console.error('reCAPTCHA not loaded');
      return null;
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return null;
    }
  };

  return (
    <ReCaptchaContext.Provider value={{ executeRecaptcha, isLoaded }}>
      {children}
    </ReCaptchaContext.Provider>
  );
}
