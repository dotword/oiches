/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                yellowOiches: '#FFB500',
                purpleOiches: '#9333FF',
                oichesBGMovil: '#6E3482',
                purpleClaro: '#A775F7',
                greyOiches: '#8591A5',
                orangecolor: '#FFBC8E',
                moradoOiches: '#A33ABD',
                footercolor: '#1f2937',
                grayLight: '#F5F7FA',
            },
            fontSize: {
                xxs: '0.625rem', // 10px
                xs: '0.75rem', // 12px
            },
            fontWeight: {
                normal: '400',
            },
            backgroundImage: {
                'oiches-live': "url('/oiches/front/src/assets/Live.jpg')",
                'hero-image': "url('/Live.jpg')",
                'hero-grupos': "url('/bandas-hero.jpg')",
                'hero-salas': "url('/salas-hero.webp')",
                'hero-home': "url('/hero-home.jpg')",
                'hero-oiches': "url('/hero-oiches.webp')",
                'hero-maintenance': "url('/oiches-maintenance.jpg')",
                'hero-contacto': "url('/Oiches-contacto.jpg')",
                'hero-promotor': "url('/Oiches-promotor.jpg')",
                'hero-concurso': "url('/ConcursoBanner.jpg')",
                'hero-concierto': "url('/banner-concierto-background.jpg')",
                'custom-gradient': `radial-gradient(at 73.43206989717466% 38.71306071404778%, hsla(268.2352941176471, 60%, 30%, 1) 0%, hsla(268.2352941176471, 60%, 30%, 0) 100%), 
                radial-gradient(at 89.9887167747092% 82.56757313841099%, hsla(0, 0%, 5%, 1) 0%, hsla(0, 0%, 5%, 0) 100%), 
                radial-gradient(at 17.61635310074432% 88.52848566820387%, hsla(0, 0%, 8%, 1) 0%, hsla(0, 0%, 8%, 0) 100%), 
                radial-gradient(at 88.05256840851888% 34.09674018701876%, hsla(268.2352941176471, 60%, 25%, 1) 0%, hsla(268.2352941176471, 60%, 25%, 0) 100%), 
                radial-gradient(at 34.20431409626383% 4.547208654994606%, hsla(0, 0%, 3%, 1) 0%, hsla(0, 0%, 3%, 0) 100%), 
                radial-gradient(at 91.53086367466986% 77.5806953084986%, hsla(0, 0%, 6%, 1) 0%, hsla(0, 0%, 6%, 0) 100%), 
                radial-gradient(at 72.58521302231112% 60.56937398008413%, hsla(268.2352941176471, 60%, 20%, 1) 0%, hsla(268.2352941176471, 60%, 20%, 0) 100%), 
                radial-gradient(at 89.42010316673291% 32.45948874686404%, hsla(0, 0%, 4%, 1) 0%, hsla(0, 0%, 4%, 0) 100%), 
                radial-gradient(at 11.180879477155425% 40.85013166527555%, hsla(0, 0%, 7%, 1) 0%, hsla(0, 0%, 7%, 0) 100%), 
                radial-gradient(at 51.429262189747234% 56.07056955047194%, hsla(268.2352941176471, 60%, 15%, 1) 0%, hsla(268.2352941176471, 60%, 15%, 0) 100%), 
                radial-gradient(at 55.749840948826034% 18.002035719577737%, hsla(0, 0%, 2%, 1) 0%, hsla(0, 0%, 2%, 0) 100%), 
                radial-gradient(at 48.5815822751161% 75.50891851437932%, hsla(0, 0%, 5%, 1) 0%, hsla(0, 0%, 5%, 0) 100%)`
            },
            background404: {
                'oiches-404': "url('/oiches/front/src/assets/404Pages.jpg')",
                'hero-image-404': "url('../404Pages.jpg')",
            },
            

            spacing: {
                700: '700px',
                900: '900px',
                1200: '1200px',
            },
        },
    },
    plugins: [],
};
