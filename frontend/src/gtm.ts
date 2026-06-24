// Google Tag Manager integration.
//
// GTM is loaded only when a container ID is configured at build time via the
// VITE_GTM_ID env var; when it is absent (e.g. local dev) GTM is not loaded and
// pushed events are simply discarded.

interface DataLayerEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
  }
}

// Pushes a custom event onto the GTM dataLayer. Safe to call even when GTM is
// not loaded — the event is queued on window.dataLayer and ignored.
export const pushDataLayerEvent = (
  event: string,
  data: Record<string, unknown> = {}
): void => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
};

let initialized = false;

// Loads GTM. Must only be called once the user has granted consent. Safe to
// call multiple times — the script is injected at most once.
export const initGtm = (): void => {
  const gtmId = import.meta.env.VITE_GTM_ID;
  if (!gtmId || initialized) {
    return;
  }
  initialized = true;

  // dataLayer + GTM script (equivalent to the official <head> snippet).
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'gtm.js',
    'gtm.start': new Date().getTime()
  });

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.insertBefore(script, document.head.firstChild);

  // <noscript> fallback iframe.
  const noscript = document.createElement('noscript');
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
  iframe.height = '0';
  iframe.width = '0';
  iframe.style.display = 'none';
  iframe.style.visibility = 'hidden';
  noscript.appendChild(iframe);
  document.body.insertBefore(noscript, document.body.firstChild);
};
