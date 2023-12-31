/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      custScreen: "393px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
    },

    extend: {
      fontFamily: {
        KaushanScript: ["Kaushan Script"],
        Montserrat: ["Montserrat"],
        VarelaRound: ["Varela Round", "sans-serif"],
        RussoOne: ["Russo One"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      "light",
      {
        dark: {
          primary: "#0B0B0C",
          "base-100": "#0b0b0c",
          neutral: "#faf4fa",
        },
      },
    ],
  },
};
