const defaultTheme = require("tailwindcss/defaultTheme");
const config = require("./config.js");

module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      black: "#1f1f20",
      grey: {
        default: "#cccccc",
        darker: "#717171"
      },
      white: "#ffffff",
      salmon: config.theme.brandColor
    },
    container: {
      center: true
    },
    fontFamily: {
      rubik: ["Rubik", ...defaultTheme.fontFamily.sans],
      oswald: ["Oswald", ...defaultTheme.fontFamily.sans]
    },
    fontWeight: {
      normal: 400,
      bold: 700
    },
    screens: {
      xs: "375px", // iPhone 8
      sm: "640px", // Fablet
      md: "768px", // iPad
      lg: "1024px",
      xl: "1280px"
    },
    extend: {}
  },
  variants: {
    opacity: ["responsive", "hover", "focus", "disabled"],
    cursor: ["disabled"]
  },
  plugins: []
};
