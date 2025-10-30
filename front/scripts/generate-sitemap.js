
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

async function fetchDynamicData() {
    try {
        const apiUrlBase = import.meta.env.VITE_API_URL_BASE;

        // Llama a las rutas dinámicas de la API
        const groupResponse = await fetch(`${apiUrlBase}/grupos`);
        const salaResponse = await fetch(`${apiUrlBase}/salas`);

        // Convierte las respuestas en JSON
        const dynamicGroups = await groupResponse.json();
        const dynamicSalas = await salaResponse.json();

        return { dynamicGroups, dynamicSalas };
    } catch (error) {
        console.error('Error fetching dynamic data:', error);
        return { dynamicGroups: [], dynamicSalas: [] };
    }
}

(async () => {
    const { dynamicGroups, dynamicSalas } = await fetchDynamicData();

    // Define las rutas estáticas importantes
    const staticRoutes = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/register', changefreq: 'weekly', priority: 0.8 },
        { url: '/login', changefreq: 'weekly', priority: 0.7 },
        { url: '/sobre-oiches', changefreq: 'weekly', priority: 0.7 },
        { url: '/salas', changefreq: 'weekly', priority: 0.7 },
        { url: '/grupos', changefreq: 'weekly', priority: 0.7 },
        { url: '/aviso-legal', changefreq: 'yearly', priority: 0.5 },
        { url: '/politica-privacidad', changefreq: 'yearly', priority: 0.5 },
        { url: '/politica-cookies', changefreq: 'yearly', priority: 0.5 },
        { url: '/contacto', changefreq: 'monthly', priority: 0.6 },
    ];

    // Genera las rutas dinámicas de grupos y salas
    const dynamicRoutes = [
        ...dynamicGroups.map((group) => ({
            url: `/grupo/${group.id}`,
            changefreq: 'weekly',
            priority: 0.6,
        })),
        ...dynamicSalas.map((sala) => ({
            url: `/sala/${sala.id}`,
            changefreq: 'weekly',
            priority: 0.6,
        })),
    ];

    // Combina las rutas estáticas y dinámicas
    const routes = [...staticRoutes, ...dynamicRoutes];

    // Crea el flujo del sitemap
    const sitemapStream = new SitemapStream({
        hostname: import.meta.env.VITE_API_URL_BASE,
    });
    const writeStream = createWriteStream('./public/sitemap.xml');
    sitemapStream.pipe(writeStream);

    // Escribe cada ruta en el sitemap
    routes.forEach((route) => {
        sitemapStream.write(route);
    });

    sitemapStream.end();
    await streamToPromise(sitemapStream);
    console.log('Sitemap generado correctamente en ./public/sitemap.xml');
})();
