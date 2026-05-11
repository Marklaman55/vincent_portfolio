import { Helmet } from "react-helmet-async";

const SEO = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title} | Vincent Kamau</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Vincent Kamau" />
    </Helmet>
  );
};

export default SEO;