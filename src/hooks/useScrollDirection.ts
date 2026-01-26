'use client';

import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

export function useScrollDirection(threshold = 10) {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - prevScrollY;

      if (Math.abs(diff) < threshold) {
        return;
      }

      if (currentScrollY < 10) {
        setScrollDirection(null);
      } else if (diff > 0) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }

      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollY, threshold]);

  return scrollDirection;
}
