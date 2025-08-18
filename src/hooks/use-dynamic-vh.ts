
"use client";

import { useEffect } from 'react';

export function useDynamicVh() {
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();

    const handleResize = () => {
      setVh();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
}
