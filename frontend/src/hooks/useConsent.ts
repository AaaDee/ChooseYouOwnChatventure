import { useEffect, useState } from 'react';
import { initGtm } from '../gtm';

const STORAGE_KEY = 'cookie-consent';

export type ConsentStatus = 'granted' | 'denied' | 'undecided';

function readStoredConsent(): ConsentStatus {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : 'undecided';
  } catch {
    // localStorage can throw (private mode, disabled storage) — treat as undecided.
    return 'undecided';
  }
}

function storeConsent(status: Exclude<ConsentStatus, 'undecided'>): void {
  try {
    localStorage.setItem(STORAGE_KEY, status);
  } catch {
    // Ignore storage failures; consent simply won't persist across reloads.
  }
}

// Tracks cookie-consent state and loads GTM only once consent is granted.
// The choice is persisted in localStorage so returning visitors aren't asked
// again (and GTM loads automatically for them).
export function useConsent() {
  const [status, setStatus] = useState<ConsentStatus>(readStoredConsent);

  useEffect(() => {
    if (status === 'granted') {
      initGtm();
    }
  }, [status]);

  function accept() {
    storeConsent('granted');
    setStatus('granted');
  }

  function decline() {
    storeConsent('denied');
    setStatus('denied');
  }

  return { status, accept, decline };
}
