import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/ui/use-ripple.tsx",
  ],
  theme: {
    extend: {
      borderWidth: {
        DEFAULT: "1px",
      },
      boxShadow: {
        primary: "var(--shadow-primary)",
        secondary: "var(--shadow-secondary)",
        "primary-light": "var(--shadow-light)",
        "secondary-light": "var(--shadow-light-secondary)",
        no: "0 0 0 0 rgba(0, 0, 0, 0)",
      },

      colors: {
        border: {
          DEFAULT: "rgb(var(--border))",
          secondary: "rgb(var(--border-secondary))",
        },
        input: "rgb(var(--input))",
        ring: "rgb(var(--ring))",
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        content: {
          DEFAULT: "rgb(var(--content))",
          secondary: "rgb(var(--content-secondary))",
        },
        primary: {
          DEFAULT: "rgb(var(--primary))",
          dark: "rgb(var(--primary-dark))",
          foreground: "rgb(var(--primary-foreground))",
          text: "rgb(var(--primary-text))",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary))",
          foreground: "rgb(var(--secondary-foreground))",
          text: "rgb(var(--secondary-text))",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive))",
          secondary: "rgb(var(--destructive-secondary))",
        },
        accent: {
          DEFAULT: "rgb(var(--accent))",
          secondary: "rgb(var(--accent-secondary))",
        },
        element: {
          DEFAULT: "rgb(var(--element))",
          light: "rgb(var(--element-light))",
        },
      },
      width: {
        small: "var(--small)",
        semi: "var(--semi-small)",
        medium: "var(--medium)",
        large: "var(--large)",
      },
      height: {
        small: "var(--small)",
        semi: "var(--semi-small)",
        medium: "var(--medium)",
        large: "var(--large)",
      },
      sizes: {
        medium: "var(--medium)",
      },
      keyframes: {
        ripple: {
          "0%": {
            transform: "translate(-50%, -50%) scale(0)",
            opacity: "0.4",
          },
          "100%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "0",
          },
        },
      },
      animation: {
        ripple: "ripple 0.8s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [],
} satisfies Config;
