/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#C0392B',
                background: '#F5F0EB',
                charcoal: '#2C2C2C',
                amberSoft: '#F6C667',
                success: '#2F9E44',
            },
            fontFamily: {
                rounded: ['Nunito', 'Poppins', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
