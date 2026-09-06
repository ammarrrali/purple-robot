// Thin wrapper over GA4's gtag. Every conversion path on the site reports
// through here, so "which keyword produced an enquiry" is answerable from the
// landing-page dimension rather than guessed at.
//
// No-ops safely when analytics is absent (NEXT_PUBLIC_GA_ID unset, or a
// blocker), so call sites never need to guard.

type GtagArgs =
  | ["event", string, Record<string, unknown>?]
  | ["config", string, Record<string, unknown>?]
  | ["js", Date];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
  }
}

export type LeadEvent =
  | "generate_lead"
  | "contact_email"
  | "contact_phone"
  | "contact_whatsapp"
  | "booking_start";

export function track(event: LeadEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, {
    // Landing page and referrer are what tie an enquiry back to the query
    // that produced it. GA4 keeps them; the contact API stores them too.
    page_path: window.location.pathname,
    ...params,
  });
}

/** Where this visitor entered the site, for lead-source attribution. */
export function leadSource() {
  if (typeof window === "undefined") return {};
  return {
    landingPage: window.location.pathname + window.location.search,
    referrer: document.referrer || "direct",
  };
}
