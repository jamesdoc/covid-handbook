const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    theme: {
        colors: {
            transparent: 'transparent',
            black: '#1f1f20',
            white: '#ffffff',
        },
        container: {
            center: true,
        },
        fontFamily: {
            barlow: [...defaultTheme.fontFamily.sans],
        },
        fontWeight: {
            normal: 400,
            bold: 700,
        },
        screens: {
            'xs': '375px', // iPhone 8
            'sm': '640px', // Fablet
            'md': '768px', // iPad
            'lg': '1024px',
            'xl': '1280px',
        },
        extend: {
        }
    },
    variants: {
        opacity: ["responsive", "hover", "focus", "disabled"],
        cursor: ["disabled"]
    },
    plugins: []
};
