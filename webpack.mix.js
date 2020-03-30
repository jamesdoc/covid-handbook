let mix = require('laravel-mix');

// Paths
const paths = {
  sass: {
    source: './src/assets/scss/main.scss',
    dest: './dist/assets/css/',
  },
};

// Run mix
mix
  .sass(paths.sass.source, paths.sass.dest)
  .minify(paths.sass.dest + 'main.css')
  .sourceMaps();

