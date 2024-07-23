/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                yellowOiches: '#FFB500',
                purpleOiches: '#9333FF',
                greyOiches: '#8591A5',
            },
            backgroundImage: {
                'oiches-live':
                    "url('/oiches/front/src/assets/oiches-Live.jpg')",
                'hero-image': "url('../Live.jpg')",
            },
            background404: {
                'oiches-404': "url('/oiches/front/src/assets/404Pages.jpg')",
                'hero-image-404': "url('../404Pages.jpg')",
            },
        },
    },
    plugins: [],
};
