import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = "Ikosi-Ejinrin LCDA", 
  description = "Welcome to the official portal of Ikosi-Ejinrin Local Council Development Area. Discover news, projects, and administrative resources.", 
  keywords = "Ikosi-Ejinrin, LCDA, Lagos, Local Government, Community, Development, Administration, Nigeria", 
  image = "/images/assets/logo.jpeg", 
  url = "https://ikosiejinrin.lg.gov.ng" 
}: SEOProps) {
  const fullTitle = title === "Ikosi-Ejinrin LCDA" ? title : `${title} | Ikosi-Ejinrin LCDA`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
}
