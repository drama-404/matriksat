import {
  Inter,
  Phudu,
  Chelsea_Market,
  DM_Sans,
  Space_Grotesk,
} from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const phudu = Phudu({
  subsets: ['latin'],
  weight: ['800'],
  variable: '--font-phudu',
  display: 'swap',
});

export const chelseaMarket = Chelsea_Market({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-chelsea-market',
  display: 'swap',
});

// Satoshi fallback - DM Sans is a similar geometric sans-serif
// TODO: Replace with actual Satoshi font files when available
export const satoshi = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-satoshi',
  display: 'swap',
});

// Euclid Circular B fallback - Space Grotesk is a similar geometric font
// TODO: Replace with actual Euclid Circular B font files when available
export const euclidCircularB = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-euclid',
  display: 'swap',
});
