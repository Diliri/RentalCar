import type { Metadata } from "next";
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import QueryProvider from '@/providers/QueryProvider';
import { Toaster } from 'react-hot-toast';

const manrope = Manrope({ subsets: ['latin'] });

// динамічний тайтл на сторінках
export const metadata: Metadata = {
  title: {
    default: 'RentalCar - Easy & Fast Car Rental',
    template: '%s | RentalCar',
  },
  description: 'Reliable and budget-friendly rentals for any journey',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //заборонила Grammarly (і всім стороннім додаткам) змінювати html на клієнті
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={manrope.className}>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Toaster position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
