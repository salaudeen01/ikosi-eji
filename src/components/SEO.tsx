import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

export default function SEO({ 
  title = "Ikosi-Ejinrin LCDA | Official Government Website", 
  description = "Official website of Ikosi-Ejinrin Local Council Development Area, Lagos State, Nigeria. Access government services, news, projects, and council information.", 
  keywords = "Ikosi-Ejinrin LCDA, Ikosi Ejinrin, Lagos Local Government, LCDA Lagos, Kosofe LGA, Lagos State, Nigeria local government, Ikosi beach, Ejinrin market, Agboyi", 
  image = "/og/default.jpg", 
  url = "https://www.ikosi-ejinrin.gov.ng" 
}: SEOProps) {
  const fullTitle = title.includes("Ikosi-Ejinrin LCDA") ? title : `${title} | Ikosi-Ejinrin LCDA`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Ikosi-Ejinrin LCDA" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      <link rel="canonical" href={url} />
    </Head>
  );
}
