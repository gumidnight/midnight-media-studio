import type { Metadata } from 'next';
import './globals.css';
import { LiveChat } from '@/components/chat/LiveChat';
import { CookieConsent } from '@/components/CookieConsent';
import { ScrollProgress } from '@/components/ScrollProgress';
import { ReCaptchaProvider } from '@/components/ReCaptchaProvider';

export const metadata: Metadata = {
  title: 'Midnight Media Studio | Premium Web Development',
  description: 'Professional web development studio specializing in modern, high-performance websites and web applications. Next.js, React, TypeScript experts.',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  keywords: ['web development', 'Next.js', 'React', 'TypeScript', 'web design', 'digital studio'],
  authors: [{ name: 'Midnight Media Studio' }],
  creator: 'Midnight Media Studio',
  publisher: 'Midnight Media Studio',
  metadataBase: new URL('https://studio.midnightclub.media'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studio.midnightclub.media',
    siteName: 'Midnight Media Studio',
    title: 'Midnight Media Studio | Premium Web Development',
    description: 'Professional web development studio specializing in modern, high-performance websites and web applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Midnight Media Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Midnight Media Studio | Premium Web Development',
    description: 'Professional web development studio specializing in modern, high-performance websites.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans">
        <ReCaptchaProvider>
          <ScrollProgress />
          {children}
          <LiveChat />
          <CookieConsent />
        </ReCaptchaProvider>
      </body>
    </html>
  );
}
