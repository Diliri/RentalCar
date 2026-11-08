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
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('rentalcar-theme');if(t!=='dark'&&t!=='light')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}catch(e){var t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t;document.documentElement.style.colorScheme=t;}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className={manrope.className}>
        <QueryProvider>
          <Header />
          <main>{children}</main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--white)',
                color: 'var(--main)',
                border: '1px solid var(--border)',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  );
}
