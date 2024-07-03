// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
  return src('./app/scss/style.scss', { sourcemaps: true })
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }))
    .on('end', function() {
      console.log('scssTask completed');
    });
}

// JavaScript Task
const concat = require('gulp-concat');
const rollup = require('gulp-rollup');

function jsTask() {
  return src('app/js/**/*.js', { sourcemaps: true })
    .pipe(rollup({
      input: 'app/js/script.js', // Specify the entry point of your JavaScript bundle
      format: 'iife', // Output format: immediately-invoked function expression (IIFE)
    }))
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(concat('bundle.js')) // Concatenate all JS files into one file named bundle.js
    .pipe(terser()) // Minify the concatenated file
    .pipe(dest('dist', { sourcemaps: '.' })) // Output to dist directory with sourcemaps
    .on('end', function() {
      console.log('jsTask completed');
    });
}

exports.jsTask = jsTask;



// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch('*.html', browserSyncReload);
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
