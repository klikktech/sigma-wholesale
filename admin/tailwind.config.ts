import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        shadow: "#A5A4A433",
        card_hover: "#F3F2F5",
      },
    },
  },
  plugins: [
    nextui({
      addCommonColors: false,
      layout: {},
      themes: {
        sigmaTheme: {
          extend: "light",
          colors: {
            primary: {
              DEFAULT: "#F5A524",
            },
            secondary: {
              100: "#FEDFD9",
              200: "#FDB9B3",
              300: "#FA8C8D",
              400: "#F66F7D",
              500: "#F14164",
              600: "#CF2F5E",
              700: "#AD2057",
              800: "#8B144E",
              900: "#730C48",
              DEFAULT: "#F14164",
            },
          },
          layout: {
            fontSize: {
              large: "2rem",
            },
          },
        },
      },
    }),
  ],
};
export default config;
