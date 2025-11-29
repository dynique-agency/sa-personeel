import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['Playfair Display', 'Bodoni Moda', 'Georgia', 'serif'],
        'elegant': ['Cinzel', 'Playfair Display', 'serif'],
        'body': ['Cormorant Garamond', 'EB Garamond', 'Georgia', 'serif'],
        'serif': ['EB Garamond', 'Cormorant Garamond', 'Georgia', 'serif'],
        'sans': ['Cormorant Garamond', 'EB Garamond', 'serif'],
      },
      colors: {
        'pure-black': '#000000',
        'pure-white': '#FFFFFF',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'scroll': 'scroll 30s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;

