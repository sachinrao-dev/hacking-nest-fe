declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

import { GOOGLE_ADS_CONVERSION_LABEL } from '../config';

const CONVERSION_ID = 'AW-18402335158';

let leadFired = false;

export interface LeadConversionParams {
  conversion_label?: string;
}

export function trackLead(params: LeadConversionParams = {}): void {
  if (typeof window === 'undefined') return;

  if (leadFired) {
    console.warn('[Google Ads] Lead conversion already fired, skipping duplicate');
    return;
  }

  if (!window.gtag) {
    console.error('[Google Ads] gtag not loaded');
    return;
  }

  const label = params.conversion_label ?? GOOGLE_ADS_CONVERSION_LABEL;

  if (!label) {
    console.error('[Google Ads] Conversion label is required. Set VITE_GOOGLE_ADS_CONVERSION_LABEL in .env or pass conversion_label parameter.');
    return;
  }

  window.gtag('event', 'conversion', {
    send_to: `${CONVERSION_ID}/${label}`,
    value: 1.0,
    currency: 'INR',
  });

  leadFired = true;
  console.log('[Google Ads] Lead conversion fired', { label, send_to: `${CONVERSION_ID}/${label}` });
}

export function resetLeadTracking(): void {
  leadFired = false;
}

export function isLeadFired(): boolean {
  return leadFired;
}