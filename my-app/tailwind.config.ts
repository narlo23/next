import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'main-navy': '#0d1c4b',
                'main-blue': '#243d8d',
                error: '#d01e17',
                'border-gray': '#e5e7eb',
                'active-blue': '#e4e8f9',
                secondary: '#122e87',
                danger: '#ff4d26',
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
export default config;
