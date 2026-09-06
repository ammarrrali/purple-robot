import Script from "next/script";

// Google Analytics 4. The measurement ID is not a secret — it ships in the
// page source of every GA-instrumented site — so it lives here as the default
// rather than in an env file, which `.gitignore` excludes from the repo and
// therefore from the production build.
//
// Set NEXT_PUBLIC_GA_ID to override it (a staging property, for example).
// Loads after the page is interactive so it never competes with rendering.
// IP anonymization is on.
const DEFAULT_GA_ID = "G-7WCECFHXW1";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? DEFAULT_GA_ID;
  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
