import type { Metadata } from "next";
import { OfferClient } from "./offer-client";

export const metadata: Metadata = {
  title: "See It Before You Pay — Free Website Build & Audit",
  description:
    "We design and build your homepage or prototype up front — you pay only if you love it. Or get a free, no-obligation audit of your current site. Senior engineering from Karachi at offshore rates.",
  alternates: { canonical: "https://codeeee.com/offer" },
  openGraph: {
    title: "See It Before You Pay — Free Website Build & Audit",
    description:
      "We build your homepage or prototype first. Pay only if you love it. Or claim a free audit of your existing site.",
    url: "https://codeeee.com/offer",
    type: "website",
  },
};

export default function OfferPage() {
  return <OfferClient />;
}
