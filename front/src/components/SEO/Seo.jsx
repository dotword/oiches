import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo } from 'react';

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
    // 📌 Datos estructurados básicos para SEO y Google
    const commonStructuredData = useMemo(
        () => [
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
        ],
        [title, description, url, image]
    );

    // 📌 Actualizar dinámicamente el título y la descripción en una SPA
    useEffect(() => {
        document.title = title;
        document
            .querySelector("meta[name='description']")
            ?.setAttribute('content', description);
        document.querySelector('html')?.setAttribute('lang', 'es');
    }, [title, description]);

    return (
        <Helmet>
            {/* 🔹 Etiquetas SEO */}
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta
                name="robots"
                content={noIndex ? 'noindex, nofollow' : 'index, follow'}
            />
            <link rel="canonical" href={url} />

            {/* 🔹 Open Graph (Facebook, WhatsApp) */}
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

            {/* 🔹 Twitter Cards */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* 🔹 Datos estructurados básicos */}
            {commonStructuredData.map((data, index) => (
                <script
                    key={`common-structured-data-${index}`}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
                />
            ))}

            {/* 🔹 Datos estructurados dinámicos */}
            {structuredData && typeof structuredData === 'object' && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(structuredData, null, 2),
                    }}
                />
            )}
        </Helmet>
    );
};

export default Seo;
