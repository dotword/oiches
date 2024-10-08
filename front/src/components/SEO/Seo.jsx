import { Helmet } from 'react-helmet-async';

const Seo = ({ title, description, keywords, url, image, type }) => {
    return (
        <Helmet>
            {/* Etiquetas SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph para redes sociales */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />

            {/* Datos estructurados (JSON-LD) para SEO  */}
            <script type="application/ld+json">
                {JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'Organization',
                    name: 'Oiches',
                    url: url,
                    logo: image,
                    description: description,
                    sameAs: ['https://www.instagram.com/oiches_musica/'],
                })}
            </script>
        </Helmet>
    );
};
export default Seo;
