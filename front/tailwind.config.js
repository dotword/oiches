import { purple } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                yellowOiches: '#FFB500',
                purpleOiches: '#9333FF',
                purpleClaro: '#A775F7',
                greyOiches: '#8591A5',
                orangecolor: '#FFBC8E',
            },

            backgroundImage: {
                'oiches-live': "url('/oiches/front/src/assets/Live.jpg')",
                'hero-image': "url('/Live.jpg')",
                'hero-grupos': "url('/bandas-hero.jpg')",
                'hero-salas': "url('/salas-hero.webp')",
                'hero-home': "url('/hero-home.jpg')",
                'hero-oiches': "url('/hero-oiches.webp')",
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
