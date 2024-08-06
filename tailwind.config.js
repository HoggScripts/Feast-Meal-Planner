const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "submission-blue": "#a0ced9",
        yellowish: "#ffee93",
        "destructive-red": "#ffc09f",
        whiteish: "#fcf5c7",
        greenish: "#adf7b6",
        blackish: "#333333",
        closewhite: "#FAFAFA",
        blueprimary: "#51B2D4",
        bluesecondary: "#7FC8E0",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        flip: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        flipBack: {
          "0%": { transform: "rotateY(180deg)" },
          "100%": { transform: "rotateY(0deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        flip: "flip 0.6s forwards",
        flipBack: "flipBack 0.6s forwards",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    nextui({
      themes: {
        light: {
          colors: {
            "pale-leaf": "#CCD4BF",
            "burly-wood": "#E7CBA9",
            zinnwaldite: "#EEBAB2",
            "ecru-white": "#F5F3E7",
            "vanilla-ice": "#F5E2E4",
            "greyish-black": "#333333",
            background: "#ffffff",
            foreground: "#000000",
            primary: {
              DEFAULT: "#a0ced9",
              foreground: "#ffffff",
            },
            secondary: {
              DEFAULT: "#ffee93",
              foreground: "#000000",
            },
            destructive: {
              DEFAULT: "#ffc09f",
              foreground: "#ffffff",
            },
            muted: {
              DEFAULT: "#fcf5c7",
              foreground: "#000000",
            },
            accent: {
              DEFAULT: "#adf7b6",
              foreground: "#000000",
            },
            popover: {
              DEFAULT: "#ffffff",
              foreground: "#000000",
            },
            card: {
              DEFAULT: "#ffffff",
              foreground: "#000000",
            },
            border: "#e5e7eb",
            input: "#e5e7eb",
            ring: "#e5e7eb",
          },
        },
        dark: {
          colors: {
            "pale-leaf": "#CCD4BF",
            "burly-wood": "#E7CBA9",
            zinnwaldite: "#EEBAB2",
            "ecru-white": "#F5F3E7",
            "vanilla-ice": "#F5E2E4",
            "greyish-black": "#333333",
            background: "#000000",
            foreground: "#ffffff",
            primary: {
              DEFAULT: "#a0ced9",
              foreground: "#000000",
            },
            secondary: {
              DEFAULT: "#ffee93",
              foreground: "#000000",
            },
            destructive: {
              DEFAULT: "#ffc09f",
              foreground: "#000000",
            },
            muted: {
              DEFAULT: "#fcf5c7",
              foreground: "#000000",
            },
            accent: {
              DEFAULT: "#adf7b6",
              foreground: "#000000",
            },
            popover: {
              DEFAULT: "#000000",
              foreground: "#ffffff",
            },
            card: {
              DEFAULT: "#000000",
              foreground: "#ffffff",
            },
            border: "#4b5563",
            input: "#4b5563",
            ring: "#4b5563",
          },
        },
      },
    }),
  ],
};
