import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string;
}

const SEO = ({ title, description, keywords }: SEOProps) => {
  const fullTitle = `${title} | Vincent Kamau - Software Engineer & Architect`;
  const defaultDescription = "Passionate Software Engineer specialized in building high-performance web systems and futuristic digital experiences.";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

export default SEO;
