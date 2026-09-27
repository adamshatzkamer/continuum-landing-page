import { useEffect, Suspense, lazy } from 'react';
import { Toaster } from '@/components/Toaster';
import { useMinWidthMd } from '@/hooks/useMinWidthMd';

const LandingPage = lazy(() => import('@/pages/LandingPage'));
const LandingPageMobile = lazy(() => import('@/pages/LandingPageMobile'));

export default function App() {
  const isDesktop = useMinWidthMd();

  useEffect(() => {
    if (window.location.hash) {
      // The hash is user-controlled and often not a valid CSS selector (#1, #/, #a?b),
      // so look it up as a plain id instead of passing it to querySelector.
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        // malformed %-escape: fall back to the raw value
      }
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      history.replaceState(null, '', window.location.pathname);
    }
  }, [isDesktop]);

  return (
    <>
      <main className="relative w-full overflow-x-hidden bg-[#f9fafb]">
        <Suspense fallback={<div className="min-h-screen bg-[#f9fafb]" />}>
          {isDesktop ? (
            <LandingPage />
          ) : (
            <div className="w-full overflow-x-hidden bg-[#f9fafb]">
              <div className="relative mx-auto w-full max-w-[402px] overflow-x-hidden">
                <LandingPageMobile />
              </div>
            </div>
          )}
        </Suspense>
      </main>
      <Toaster />
    </>
  );
}
