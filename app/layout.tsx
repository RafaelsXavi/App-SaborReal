import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import './globals.css'; // Global styles
import {BottomNavigation} from '@/components/layout/bottom-navigation';
import {FloatingCartButton} from '@/components/cart/floating-cart-button';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});



export const metadata: Metadata = {
  title: 'Sabor Real Delivery',
  description: 'Um aplicativo de entrega de comida brasileiro, rápido e moderno.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR" className={`${inter.variable}`}>
      <body className="font-sans text-text-primary antialiased" suppressHydrationWarning>
        <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark max-w-md mx-auto shadow-2xl">
          {children}
          <BottomNavigation />
          <FloatingCartButton itemCount={3} /> {/* Mock item count for now */}
        </div>
      </body>
    </html>
  );
}
