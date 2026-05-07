'use client';

import { useEffect, useState } from 'react';
import type { TutorialPage } from '@/lib/tutorials';

const keyFor = (page: TutorialPage) => `lsr-tutorial-${page}`;

export function useTutorialState(page: TutorialPage) {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled) return;
      const dismissed = window.localStorage.getItem(keyFor(page)) === 'done';
      setOpen(!dismissed);
      setReady(true);
    });

    return () => {
      cancelled = true;
    };
  }, [page]);

  const dismiss = () => {
    window.localStorage.setItem(keyFor(page), 'done');
    setOpen(false);
  };

  const restart = () => {
    window.localStorage.removeItem(keyFor(page));
    setOpen(true);
  };

  return { ready, open, dismiss, restart };
}
