let mix = require('laravel-mix');
const tailwindcss = require("tailwindcss");

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
    source: './src/assets/scss/main.scss',
    dest: './dist/assets/css/',
  },
};

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
  .sass(paths.sass.source, paths.sass.dest)
  .minify(paths.sass.dest + 'main.css')
  .sourceMaps();

