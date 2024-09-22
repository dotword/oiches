import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';

// Define las rutas como un array de objetos
const routes = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    { url: '/register', changefreq: 'weekly', priority: 0.8 },
    {
        url: '/users/validate/:registrationCode',
        changefreq: 'monthly',
        priority: 0.5,
    },
    { url: '/login', changefreq: 'weekly', priority: 0.7 },
    { url: '/sobre-oiches', changefreq: 'weekly', priority: 0.7 },
    { url: '/users/password/recover', changefreq: 'monthly', priority: 0.5 },
    { url: '/users/password', changefreq: 'monthly', priority: 0.5 },
    { url: '/users', changefreq: 'monthly', priority: 0.6 },
    { url: '/creacion-sala', changefreq: 'monthly', priority: 0.6 },
    { url: '/sala/:idSala/edit', changefreq: 'monthly', priority: 0.6 },
    { url: '/salas', changefreq: 'weekly', priority: 0.7 },
    { url: '/sala/:idSala', changefreq: 'monthly', priority: 0.6 },
    { url: '/creacion-grupo', changefreq: 'monthly', priority: 0.6 },
    { url: '/grupos/:idGrupo/edit', changefreq: 'monthly', priority: 0.6 },
    { url: '/grupo/:idGrupo', changefreq: 'monthly', priority: 0.6 },
    { url: '/grupos', changefreq: 'weekly', priority: 0.7 },
    { url: '/sala/:idSala/reservas', changefreq: 'monthly', priority: 0.6 },
    { url: '/grupo/:idGrupo/reservas', changefreq: 'monthly', priority: 0.6 },
    { url: '/validateUser', changefreq: 'monthly', priority: 0.5 },
    { url: '/aviso-legal', changefreq: 'yearly', priority: 0.5 },
    { url: '/politica-privacidad', changefreq: 'yearly', priority: 0.5 },
    { url: '/politica-cookies', changefreq: 'yearly', priority: 0.5 },
];

// Crea el flujo del sitemap
const sitemapStream = new SitemapStream({ hostname: 'https://www.oiches.com' });
const writeStream = createWriteStream('./public/sitemap.xml');

// Conectar el flujo para escribir en el archivo sitemap.xml
sitemapStream.pipe(writeStream);

// Escribe las rutas en el flujo del sitemap
routes.forEach((route) => sitemapStream.write(route));

// Termina el flujo y guarda el archivo
sitemapStream.end();
streamToPromise(sitemapStream).then(() =>
    console.log('Sitemap generado en public/sitemap.xml')
);
