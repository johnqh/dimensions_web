/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Scan installed npm packages for dynamic Tailwind classes
    './node_modules/@sudobility/components/**/*.{js,jsx,ts,tsx}',
    './node_modules/@sudobility/design/**/*.{js,jsx,ts,tsx}',
    './node_modules/@sudobility/devops-components/**/*.{js,jsx,ts,tsx}',
    './node_modules/@sudobility/subscription-components/**/*.{js,jsx,ts,tsx}',
    './node_modules/@sudobility/building_blocks/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          'bg-primary': 'var(--color-bg-primary)',
          'bg-secondary': 'var(--color-bg-secondary)',
          'bg-tertiary': 'var(--color-bg-tertiary)',
          'text-primary': 'var(--color-text-primary)',
          'text-secondary': 'var(--color-text-secondary)',
          'text-tertiary': 'var(--color-text-tertiary)',
          border: 'var(--color-border)',
          'border-light': 'var(--color-border-light)',
          'hover-bg': 'var(--color-hover-bg)',
          'hover-border': 'var(--color-hover-border)',
        },
        // Dimensions custom colors (used by landing content components)
        primary: {
          purple: '#5A4898',
          blue: '#7C6BC4',
        },
        accent: {
          cyan: '#5AC8FA',
          pink: '#AF52DE',
        },
        dark: {
          bg: '#0F172A',
          card: '#1E293B',
          border: '#334155',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5A4898 0%, #7C6BC4 100%)',
        'gradient-accent': 'linear-gradient(135deg, #5AC8FA 0%, #AF52DE 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spin: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        blob: 'blob 7s infinite',
        float: 'float 6s ease-in-out infinite',
        fadeIn: 'fadeIn 0.3s ease-in-out',
        spin: 'spin 1s linear infinite',
      },
    },
  },
  plugins: [],
};
