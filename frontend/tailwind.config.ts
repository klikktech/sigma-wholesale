// import { nextui } from "@nextui-org/react";
// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       backgroundImage: {
//         "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
//         "gradient-conic":
//           "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
//       },
//     },
//   },
//   darkMode: "class",
//   plugins: [nextui({
//     // themes: {
//     //   "purple-dark": {
//     //     extend: "dark", // <- inherit default values from dark theme
//     //     colors: {
//     //       background: "#0D001A",
//     //       foreground: "#ffffff",
//     //       primary: {
//     //         50: "#3B096C",
//     //         100: "#520F83",
//     //         200: "#7318A2",
//     //         300: "#9823C2",
//     //         400: "#c031e2",
//     //         500: "#DD62ED",
//     //         600: "#F182F6",
//     //         700: "#FCADF9",
//     //         800: "#FDD5F9",
//     //         900: "#FEECFE",
//     //         DEFAULT: "#DD62ED",
//     //         foreground: "#ffffff",
//     //       },
//     //       focus: "#F182F6",
//     //     },
//     //     layout: {
//     //       disabledOpacity: "0.3",
//     //       radius: {
//     //         small: "4px",
//     //         medium: "6px",
//     //         large: "8px",
//     //       },
//     //       borderWidth: {
//     //         small: "1px",
//     //         medium: "2px",
//     //         large: "3px",
//     //       },
//     //     },
//     //   },
//     // },
//     prefix: "nextui", // prefix for themes variables
//     addCommonColors: false, // override common colors (e.g. "blue", "green", "pink").
//     defaultTheme: "light", // default theme from the themes object
//     defaultExtendTheme: "light", // default theme to extend on custom themes
//     layout: {}, // common layout tokens (applied to all themes)
//     themes: {
//       light: {
//         layout: {
//           disabledOpacity: "0.3",
//           radius: {
//             small: "4px",
//             medium: "6px",
//             large: "8px",
//           },
//           borderWidth: {
//             small: "1px",
//             medium: "2px",
//             large: "3px",
//           },
//         },
//         colors: {
//           background: "#0D001A",
//           foreground: "#ffffff",
//           primary: {
//             50: "#3B096C",
//             100: "#520F83",
//             200: "#7318A2",
//             300: "#9823C2",
//             400: "#c031e2",
//             500: "#DD62ED",
//             600: "#F182F6",
//             700: "#FCADF9",
//             800: "#FDD5F9",
//             900: "#FEECFE",
//             DEFAULT: "#DD62ED",
//             foreground: "#ffffff",
//           },
//           focus: "#F182F6",
//         },
//       },
//       dark: {
//         layout: {}, // dark theme layout tokens
//         colors: {}, // dark theme colors
//       },
//     },
//   })],

// };
// export default config;
import { nextui } from "@nextui-org/react";
import type { Config } from "tailwindcss";

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
        button_hover: "#F4EFFF",
        stroke2: "#E5E4E5",
        icon1: "#141414",
        icon2: "#A5A8AC",
      },
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: false,
      layout: {},
      themes: {
        SigmaLTheme: {
          extend: "light",
          colors: {
            foreground:"#000000",
            primary: {
              100: "#FEDFD9",
              200: "#FDB9B3",
              300: "#FA8C8D",
              400: "#F66F7D",
              500: "#F14164",
              600: "#CF2F5E",
              700: "#AD2057",
              800: "#8B144E",
              900: "#730C48",
              DEFAULT: "#E0DC0D",
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

// themes: {
//   colors: {
//     primary: {
//       300: '#F14164E5',
//       500: '#F14164',
//     },
//     text: {
//       primary: '#3B3B3B',
//       secondary: '#626262',
//       disabled: '#141414',
//     },
//     other: {
//       stroke2: '#E5E4E5',
//       icon1: '#141414',
//       icon2: '#A5A8AC',
//     },
//     structural: {
//       blue: '#F8F9FA',
//       white: '#FFFFFF',
//       shadow: '#A5A4A433',
//       card_hover: '#F3F2F5',
//       button_hover: '#F4EFFF',
//     },
//   },
//   space: {},
//   fonts: {
//     sans: 'Poppins, sans-serif',
//   },
//   lineHeights: {
//     h1: '75px',
//     h3: '49px',
//     h4: '36px',
//     h5: '30px',
//     body: '27px',
//     caption1: '27px',
//     body2: '20px',
//     body3: '20px',
//     link_text: '13.3px',
//   },
//   fontWeights: {
//     regular: '400',
//     bold: '700',
//     bolder: '900',
//   },
//   fontSizes: {
//     h1: '64px',
//     h3: '36px',
//     h4: '24px',
//     h5: '20px',
//     body1: '16px',
//     body2: '12px',
//     body3: '12px',
//     caption1: '16px',
//     link_text: '14px',
//   },
// },
