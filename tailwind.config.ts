import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-up-delay': 'fadeInUp 0.8s ease-out 0.2s both',
        'fade-in-up-delay-2': 'fadeInUp 0.8s ease-out 0.4s both',
        'fade-in-up-delay-3': 'fadeInUp 0.8s ease-out 0.6s both',
        'slide-in-left': 'slideInLeft 1s ease-out 0.4s both',
        'slide-in-right': 'slideInRight 1s ease-out 0.6s both',
        'slide-in-up': 'slideInUp 1s ease-out 0.5s both',
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delay': 'float 7s ease-in-out 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-100px) scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100px) scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
        },
        slideInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(100px) scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
