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
      fontSize: {
        xxs: "0.65rem",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      boxShadow: {
        primary: "var(--shadow-primary)",
        secondary: "var(--shadow-secondary)",
        "primary-light": "var(--shadow-light)",
        "secondary-light": "var(--shadow-light-secondary)",
        top: "var(--shadow-top)",
        "only-top": "var(--shadow-only-top)",
        bottom: "var(--shadow-bottom)",
        left: "var(--shadow-left)",
        right: "var(--shadow-right)",
        inset: "var(--shadow-inset)",
        no: "0 0 0 0 rgba(0, 0, 0, 0)",
      },

      colors: {
        border: {
          DEFAULT: "rgba(var(--border))",
          secondary: "rgba(var(--border-secondary))",
        },
        input: "rgba(var(--input))",
        ring: "rgba(var(--ring))",
        background: "rgba(var(--background))",
        foreground: "rgba(var(--foreground))",
        content: {
          DEFAULT: "rgba(var(--content))",
          secondary: "rgba(var(--content-secondary))",
        },
        primary: {
          DEFAULT: "rgba(var(--primary))",
          dark: "rgba(var(--primary-dark))",
          accent: "rgba(var(--primary-accent))",
          "accent-dark": "rgba(var(--primary-accent-dark))",
          foreground: "rgba(var(--primary-foreground))",
          text: "rgba(var(--primary-text))",
        },
        secondary: {
          DEFAULT: "rgba(var(--secondary))",

          text: "rgba(var(--secondary-text))",
        },
        destructive: {
          DEFAULT: "rgba(var(--destructive))",
          secondary: "rgba(var(--destructive-secondary))",
        },
        accent: {
          DEFAULT: "rgba(var(--accent))",
          secondary: "rgba(var(--accent-secondary))",
        },
        element: {
          DEFAULT: "rgba(var(--element))",
          light: "rgba(var(--element-light))",
        },
        inventory: {
          DEFAULT: "rgba(var(--inventory))",
          accent: "rgba(var(--inventory-accent))",
          light: "rgba(var(--inventory-light))",
        },
        battle: {
          DEFAULT: "rgba(var(--battle-primary))",
          secondary: "rgba(var(--battle-secondary))",
          accent: "rgba(var(--battle-accent))",
          "accent-dark": "rgba(var(--battle-accent-dark))",
          border: "rgba(var(--battle-border))",
          text: "rgba(var(--battle-text))",
          rare: "rgba(var(--battle-rare))",
        },
      },

      width: {
        xs: "var(--xs)",
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
