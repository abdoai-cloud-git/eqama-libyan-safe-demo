import type { Metadata } from 'next';
import { Cairo } from 'next/font/google';
import './globals.css';

const cairo = Cairo({ subsets: ['arabic', 'latin'], variable: '--font-cairo' });

export const metadata: Metadata = {
  title: 'الإقامة الليبية الآمنة | Demo',
  description: 'ديمو نظام إدارة حالات وخدمات عمالية',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full antialiased`}>
      <body className="min-h-full text-slate-950">{children}</body>
    </html>
  );
}
