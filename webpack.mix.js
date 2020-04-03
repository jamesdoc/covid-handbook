const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");
require("@ayctor/laravel-mix-svg-sprite");

// Set up purgeCSS to rip all the excess that Tailwind creates
const purgecss = require("@fullhuman/postcss-purgecss")({
  // Specify the paths to all of the template files in your project
  content: ["./src/**/*.njk"],

  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
});

// Paths
const paths = {
  sass: {
    source: "./src/assets/scss/main.scss",
    dest: "./dist/assets/css/"
  },
  svg: {
    source: "./src/assets/svg/**/*.svg",
    dest: "./dist/assets/svg/sprite.svg"
  }
};

mix.setPublicPath("covid-church/dist/assets/");

mix.options({
  processCssUrls: false,
  postCss: [
    tailwindcss("./tailwind.config.js"),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : []) // Only run purgeCSS in production
  ],
  autoprefixer: {
    options: {
      browsers: ["last 2 versions"]
    }
  }
});

// Run mix
mix
  .js("./src/assets/js/app.js", "./dist/assets/app.js")
  .svgSprite(paths.svg.source, paths.svg.dest)
  .sass(paths.sass.source, paths.sass.dest)
  .minify(paths.sass.dest + "main.css")
  .sourceMaps();
