import type { Config } from 'tailwindcss';
const config: Config = { content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { cream: '#fff7ed', ink: '#1f2937', herb: '#166534', tomato: '#dc2626' } } }, plugins: [] };
export default config;
