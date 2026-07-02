import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;

    let cancelled = false;

    const scrollToEl = () => {
      const el = document.getElementById(hash.replace('#', ''));
      if (!el || cancelled) return;
      const stickyHeader = document.getElementById('app-header');
      const offset = stickyHeader ? stickyHeader.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    scrollToEl();

    const observer = new ResizeObserver(() => {
      if (!cancelled) scrollToEl();
    });
    observer.observe(document.body);

    // Stop observing after 10s — enough for even a slow connection
    const stopTimer = setTimeout(() => observer.disconnect(), 10_000);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(stopTimer);
    };
  }, [hash]);
}
