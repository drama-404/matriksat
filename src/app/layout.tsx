import type { Metadata } from 'next';
import { inter, phudu, satoshi, euclidCircularB, chelseaMarket } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'MATRIKS - AI & Full-Stack Development Agency',
  description: 'AI that actually works. Custom chatbots, automation, and full-stack development for businesses in Albania and Europe.',
};

const fontVariables = [
  inter.variable,
  phudu.variable,
  satoshi.variable,
  euclidCircularB.variable,
  chelseaMarket.variable,
].join(' ');

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${fontVariables} antialiased`}>
        {children}
      </body>
    </html>
  );
}
