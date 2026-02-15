'use client';

import { ReactNode, useEffect, useState, useContext, createContext } from 'react';

const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LesiWwsAAAAABx8hyDs5HxMe9sSQq8j9jHAAKd2';

interface ReCaptchaContextType {
  isLoaded: boolean;
  executeRecaptcha: (action: string) => Promise<string>;
}

const ReCaptchaContext = createContext<ReCaptchaContextType>({
  isLoaded: true,
  executeRecaptcha: async () => '',
});

interface ReCaptchaProviderProps {
  children: ReactNode;
}

declare global {
  interface Window {
    grecaptcha: any;
  }
}

export function ReCaptchaProvider({ children }: ReCaptchaProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isPlaceholder = RECAPTCHA_SITE_KEY === '6LesiWwsAAAAABx8hyDs5HxMe9sSQq8j9jHAAKd2' || 
                          !process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (isPlaceholder) {
      console.warn('reCAPTCHA: Using placeholder key. Replace NEXT_PUBLIC_RECAPTCHA_SITE_KEY with your actual key.');
      setIsLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.error('Failed to load reCAPTCHA script');
      setIsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const executeRecaptcha = async (action: string): Promise<string> => {
    if (!window.grecaptcha) {
      console.warn('reCAPTCHA not loaded');
      return '';
    }

    try {
      const token = await window.grecaptcha.execute(RECAPTCHA_SITE_KEY, { action });
      return token;
    } catch (error) {
      console.error('reCAPTCHA execution failed:', error);
      return '';
    }
  };

  return (
    <ReCaptchaContext.Provider value={{ isLoaded, executeRecaptcha }}>
      {children}
    </ReCaptchaContext.Provider>
  );
}

export function useReCaptcha() {
  const context = useContext(ReCaptchaContext);
  if (!context) {
    return {
      isLoaded: true,
      executeRecaptcha: async () => '',
    };
  }
  return context;
}

export { RECAPTCHA_SITE_KEY };
