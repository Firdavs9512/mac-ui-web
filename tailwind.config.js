/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      colors: {
        primary: {
          DEFAULT: "var(--app-color-primary)",
          hsl: "hsl(var(--app-color-primary-hsl), <alpha-value>)",
          contrast: "var(--app-color-primary-contrast)",
          "contrast-hsl":
            "hsl(var(--app-color-primary-contrast-hsl), <alpha-value>)",
        },
        dark: {
          DEFAULT: "var(--app-color-dark)",
          hsl: "hsl(var(--app-color-dark-hsl), <alpha-value>)",
          contrast: "var(--app-color-dark-contrast)",
          "contrast-hsl":
            "hsl(var(--app-color-dark-contrast-hsl), <alpha-value>)",
        },
        light: {
          DEFAULT: "var(--app-color-light)",
          hsl: "hsl(var(--app-color-light-hsl), <alpha-value>)",
          contrast: "var(--app-color-light-contrast)",
          "contrast-hsl":
            "hsl(var(--app-color-light-contrast-hsl), <alpha-value>)",
        },
        grey: {
          50: "var(--app-color-grey-50)",
          "50-hsl": "hsl(var(--app-color-grey-50-hsl), <alpha-value>)",
          100: "var(--app-color-grey-100)",
          "100-hsl": "hsl(var(--app-color-grey-100-hsl), <alpha-value>)",
          200: "var(--app-color-grey-200)",
          "200-hsl": "hsl(var(--app-color-grey-200-hsl), <alpha-value>)",
          300: "var(--app-color-grey-300)",
          "300-hsl": "hsl(var(--app-color-grey-300-hsl), <alpha-value>)",
          400: "var(--app-color-grey-400)",
          "400-hsl": "hsl(var(--app-color-grey-400-hsl), <alpha-value>)",
          500: "var(--app-color-grey-500)",
          "500-hsl": "hsl(var(--app-color-grey-500-hsl), <alpha-value>)",
          600: "var(--app-color-grey-600)",
          "600-hsl": "hsl(var(--app-color-grey-600-hsl), <alpha-value>)",
          700: "var(--app-color-grey-700)",
          "700-hsl": "hsl(var(--app-color-grey-700-hsl), <alpha-value>)",
          800: "var(--app-color-grey-800)",
          "800-hsl": "hsl(var(--app-color-grey-800-hsl), <alpha-value>)",
          900: "var(--app-color-grey-900)",
          "900-hsl": "hsl(var(--app-color-grey-900-hsl), <alpha-value>)",
          A100: "var(--app-color-grey-A100)",
          "A100-hsl": "hsl(var(--app-color-grey-A100-hsl), <alpha-value>)",
          A200: "var(--app-color-grey-A200)",
          "A200-hsl": "hsl(var(--app-color-grey-A200-hsl), <alpha-value>)",
          A400: "var(--app-color-grey-A400)",
          "A400-hsl": "hsl(var(--app-color-grey-A400-hsl), <alpha-value>)",
          A700: "var(--app-color-grey-A700)",
          "A700-hsl": "hsl(var(--app-color-grey-A700-hsl), <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Inter",
          "Helvetica Neue",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      cursor: {
        "app-default": "var(--app-cursor-default)",
        "app-pointer": "var(--app-cursor-pointer)",
        "app-text-select": "var(--app-cursor-text-select)",
        "app-help-select": "var(--app-cursor-help-select)",
        "app-busy": "var(--app-cursor-busy)",
        "app-working-in-bg": "var(--app-cursor-working-in-bg)",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
