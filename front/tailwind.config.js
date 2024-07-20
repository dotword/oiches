/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                yellowOiches: '#ffc800',
                purpleOiches: '#800080',
                greyOiches: '#5d5d5d',
            },
            backgroundImage: {
                'oiches-live':
                    "url('/oiches/front/src/assets/oiches-Live.jpg')",
                'hero-image': "url('../Live.jpg')",
            },
            background404: {
                'oiches-404': "url('/oiches/front/src/assets/404Pages.jpg')",
                'hero-image': "url('../404Pages.jpg')",
            },
        },
    },
    plugins: [],
};
