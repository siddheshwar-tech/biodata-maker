import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Free Marathi Biodata Maker | Online Biodata Maker | मराठी बायोडेटा",
  description = "Free Marathi biodata maker online. Create your marriage biodata in 2 minutes with beautiful templates. No signup. Instant PDF download. Best online biodata maker.",
  canonical = "https://marathibiodatafree.com/",
  ogImage = "https://marathibiodatafree.com/og-image.png",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default SEOHead;