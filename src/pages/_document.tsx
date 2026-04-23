import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    "name": "Ikosi-Ejinrin Local Council Development Area",
    "alternateName": "Ikosi-Ejinrin LCDA",
    "url": "https://www.ikosi-ejinrin.gov.ng",
    "description": "Official local government council for Ikosi-Ejinrin, Lagos State",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ikosi-Ejinrin",
      "addressRegion": "Lagos State",
      "addressCountry": "NG"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "areaServed": "NG",
      "availableLanguage": "English"
    },
    "sameAs": [
      "https://facebook.com/ikosilejinrinlcda",
      "https://twitter.com/ikosilejinrin"
    ]
  };

  return (
    <Html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <body className="antialiased text-text-base bg-surface font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
