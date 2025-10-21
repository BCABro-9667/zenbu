import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/cart-context';
<<<<<<< HEAD
=======
import { AuthProvider } from '@/context/auth-context';
>>>>>>> bfa73560c963825c1b4db1797da8f2ef50b4bb74

export const metadata: Metadata = {
  title: 'zenbu',
  description: 'A modern e-commerce application created with Firebase Studio.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
<<<<<<< HEAD
        <CartProvider>
          {children}
        </CartProvider>
=======
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
>>>>>>> bfa73560c963825c1b4db1797da8f2ef50b4bb74
        <Toaster />
      </body>
    </html>
  );
}
