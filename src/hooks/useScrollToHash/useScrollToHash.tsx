import { useEffect } from 'react';
import { useLocation } from 'react-router';

export function useScrollToHash() {
  const location = useLocation();
  const { hash } = location;

  // Keep --scroll-padding-top in sync with the sticky header height so the
  // browser's native hash scroll (e.g. pressing Enter on the same URL in the
  // address bar) also clears the navbar automatically.
  useEffect(() => {
    const header = document.getElementById('app-header');
    if (!header) return;

    const update = () => {
      document.documentElement.style.setProperty('--scroll-padding-top', `${header.offsetHeight}px`);
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

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

    // Wait for all currently-pending images to load before the first scroll.
    // On initial page load images haven't loaded yet, so positions are wrong
    // until they do. On in-app navigation images are already loaded, so this
    // resolves immediately.
    const images = Array.from(document.querySelectorAll('img'));
    const pending = images.filter((img) => !img.complete);

    if (pending.length === 0) {
      scrollToEl();
    } else {
      let remaining = pending.length;
      const onSettled = () => {
        remaining--;
        if (remaining === 0 && !cancelled) scrollToEl();
      };
      pending.forEach((img) => {
        img.addEventListener('load', onSettled, { once: true });
        img.addEventListener('error', onSettled, { once: true });
      });
    }

    // ResizeObserver as a safety net for any late layout changes (e.g. fonts,
    // dynamically-added content). Debounced so rapid resizes don't produce
    // competing smooth-scroll animations that cancel each other.
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        if (!cancelled) scrollToEl();
      }, 100);
    });
    observer.observe(document.body);
    const stopTimer = setTimeout(() => observer.disconnect(), 10_000);

    return () => {
      cancelled = true;
      observer.disconnect();
      clearTimeout(stopTimer);
      clearTimeout(debounceTimer);
    };
  }, [hash, location.key]); // location.key changes on every navigation, even to the same URL

  // When the user clicks an anchor whose hash is already active, the hash in
  // useLocation() doesn't change so the effect above won't re-run — but the
  // browser would still scroll to the element natively, without our offset.
  // Intercept that specific case and apply the offset ourselves.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const targetHash = anchor.hash; // includes the leading '#'
      if (!targetHash || targetHash !== window.location.hash) return;

      e.preventDefault();
      const el = document.getElementById(targetHash.slice(1));
      if (!el) return;

      const stickyHeader = document.getElementById('app-header');
      const offset = stickyHeader ? stickyHeader.offsetHeight : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);
}
