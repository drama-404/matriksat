import type { Metadata } from 'next';
import { inter, phudu, satoshi, euclidCircularB, chelseaMarket, jetbrainsMono } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Denada | Full-Stack Developer & AI Engineer',
  description: 'I build AI-powered web applications, chatbots, and custom tools. Based in Tirana, Albania. From idea to production in weeks.',
};

const fontVariables = [
  inter.variable,
  phudu.variable,
  satoshi.variable,
  euclidCircularB.variable,
  chelseaMarket.variable,
  jetbrainsMono.variable,
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
