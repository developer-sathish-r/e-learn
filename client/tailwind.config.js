/** @type {import('tailwindcss').Config} */
const { COLORS } = require('./src/Config/variables');

module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: {
          100: COLORS.PRIMARY_COLOR[100],
          250: COLORS.PRIMARY_COLOR[250],
          500: COLORS.PRIMARY_COLOR[500],
        },
        primaryBackground: COLORS.PRIMARY_BACKGROUND_COLOR,
        primaryButton: COLORS.PRIMARY_BUTTON_COLOR,
        primaryLight: COLORS.PRIMARY_LIGHT_COLOR,
        white: COLORS.WHITE,
        black: COLORS.BLACK,
      },
    },
  },
  plugins: [],
};
