// global.d.ts
interface Gtag {
  (command: 'config', targetId: string, config?: object): void;
  (command: 'set', config: object): void;
  (command: 'event', action: string, eventParams?: object): void;
}

interface Fbq {
  (method: 'init', pixelId: string): void;
  (method: 'track', eventName: string, parameters?: object): void;
  (method: 'trackCustom', eventName: string, parameters?: object): void;
}

declare global {
  interface Window {
    REACT_APP_API_URL: string;
    REACT_APP_TRANSCRIPTIONS_QUEUE_API_URL: string;
    REACT_APP_API_WS_PATH: string;
    REACT_APP_QUEUE_WS_PATH: string;
    REACT_APP_WS_TRANSPORTS: string;
    REACT_APP_FRONTEND_URL: string;
    REACT_PUBLIC_FACEBOOK_PIXEL_ID: string;
    gtag: Gtag;
    gtag_report_conversion: (url?: string) => void;
    $crisp: string[];
    CRISP_WEBSITE_ID: string;
    opera: string;
    fbq: Fbq;
    metaPixelLoaded: boolean;
  }
}

export {};
