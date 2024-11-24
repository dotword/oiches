import { Helmet } from 'react-helmet-async';

const Seo = ({
    title = 'Oiches - Conecta Músicos y Salas de Conciertos',
    description = 'Descubre los músicos mejor valorados y las salas de conciertos más populares en Oiches. Vive la mejor música en vivo y organiza eventos musicales inolvidables.',
    keywords = 'músicos, salas de conciertos, música en vivo, eventos musicales',
    url = 'https://oiches.com',
    image = 'https://oiches.com/Oiches-Conectamos-musicos-y-salasRRSS.jpg',
    type = 'website',
    noIndex = false,
    structuredData = null,
}) => {
    const commonStructuredData = [
        {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Oiches',
            alternateName: 'Oiches Música y Conciertos',
            url: url,
            logo: 'https://oiches.com/Oiches-logo-vertical.png',
            description: description,
            sameAs: [
                'https://www.instagram.com/oiches_musica/',
                'https://www.facebook.com/oiches/',
            ],
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: title,
            description: description,
            url: url,
            image: image,
            publisher: {
                '@type': 'Organization',
                name: 'Oiches',
                logo: {
                    '@type': 'ImageObject',
                    url: 'https://oiches.com/logo.png',
                },
            },
        },
    ];

    return (
        <Helmet>
            {/* Etiquetas SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta
                name="robots"
                content={noIndex ? 'noindex, nofollow' : 'index, follow'}
            />
            <link rel="canonical" href={url} />

            {/* Open Graph para redes sociales */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:image:type" content="image/jpeg" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:url" content={url} />
            <meta property="og:type" content={type} />
            <meta property="og:locale" content="es_ES" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Datos estructurados comunes */}
            {commonStructuredData.map((data, index) => (
                <script
                    key={`common-structured-data-${index}`}
                    type="application/ld+json"
                >
                    {JSON.stringify(data)}
                </script>
            ))}

            {/* Datos estructurados dinámicos */}
            {structuredData && typeof structuredData === 'object' && (
                <script type="application/ld+json">
                    {JSON.stringify(structuredData, null, 2)}
                </script>
            )}
        </Helmet>
    );
};

export default Seo;
