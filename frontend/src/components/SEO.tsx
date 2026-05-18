import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function SEO({ title, description, keywords }: SEOProps) {
  const fullTitle = title ? `${title} | WEBHUB` : 'WEBHUB TECHNOLOGIES | Premium Digital Agency';
  const defaultDesc = "WebHub Technologies is a premium digital agency specializing in high-performance web applications, mobile apps, and creative UI/UX design built for Kenyan Businesses.";
  const defaultKeywords = "digital agency, web development, mobile apps, UI/UX design, custom software, WebHub Technologies";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Helmet>
  );
}
