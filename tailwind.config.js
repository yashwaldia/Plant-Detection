/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        black: "#000",
        white: "#fff",
        gray: {
          "100": "rgba(255, 255, 255, 0.1)",
          "200": "rgba(255, 255, 255, 0.8)",
          "300": "rgba(21, 21, 29, 0.6)",
          "400": "rgba(0, 0, 0, 0.6)",
        },
        "very-light-grey": "#e7e9f7",
        cyan: "#00e5ff",
        "kinda-black": "#15151d",
        palevioletred: "#ff83b7",
        "light-grey": "#6a6e87",
        darkturquoise: "#4bd2e4",
      },
      fontFamily: {
        "subheader-1": "'Encode Sans'",
      },
      borderRadius: {
        "91xl": "110px",
        "81xl": "100px",
        "31xl": "50px",
        "214xl-5": "233.5px",
      },
    },
    fontSize: {
      "13xl": "2rem",
      sm: "0.88rem",
      base: "1rem",
      "11xl": "1.88rem",
      "41xl": "3.75rem",
      "53xl": "4.5rem",
      inherit: "inherit",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
