/** @type {import('tailwindcss').Config} */
export default {
  content: ["./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        neutralLighter: 'var(--color-neutralLighter)',
        neutral: 'var(--color-neutral)',
        neutralDarker: 'var(--color-neutralDarker)',
        neutralDark: 'var(--color-neutralDark)',

        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        footer: 'var(--color-footer)',
        background: 'var(--color-background)',
        textPrimary: 'var(--color-textPrimary)',
        textSecondary: 'var(--color-textSecondary)',
        surface: 'var(--color-surface)',
        surfaceUser: 'var(--color-surfaceUser)',
        hoverButton: 'var(--color-hoverButton)',
        hoverButton2: 'var(--color-hoverButton2)',
        whiteColor: 'var(--color-whiteColor)',

        danger: 'var(--color-danger)',
        hoverDanger: 'var(--color-hoverDanger)',
        edit: 'var(--color-edit)',
        hoverEdit: 'var(--color-hoverEdit)',
        success: 'var(--color-success)',
        hoverSuccess: 'var(--color-hoverSuccess)',
        warning: 'var(--color-warning)',
      }
    },
  },
  plugins: [],
};
