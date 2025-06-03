import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { CartProvider } from '@/contexts/CartContext';
import { queryClient } from '@/lib/queryClient';
import type { AppProps } from 'next/app';
import '@/app/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Component {...pageProps} />
        <Toaster position="top-right" />
      </CartProvider>
    </QueryClientProvider>
  );
} 