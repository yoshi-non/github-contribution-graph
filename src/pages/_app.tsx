import { AuthProvider } from '@/context/auth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { AnimatePresence } from 'framer-motion';

export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <RecoilRoot>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </AnimatePresence>
    </RecoilRoot>
  );
}
