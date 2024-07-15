/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                yellowOiches: '#ffc800',
                purpleOiches: '#800080',
            },
            backgroundImage: {
                'oiches-live':
                    "url('/oiches/front/src/assets/oiches-Live.jpg')",
                'hero-image': "url('../public/Live.jpg')",
            },
        },
    },
    plugins: [],
};
