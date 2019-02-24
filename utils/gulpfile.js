const gulp = require('gulp');
const { src, dest, series, watch } = require('gulp');
var sass = require('gulp-sass');
var gulpIf = require('gulp-if')
var cssNano = require('gulp-cssnano');

sass.compiler = require('node-sass');

function clean(cb) {
  // place code for clean task here
  cb();
}

function compileSass() {
  return src('../scss/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulpIf('*.css', cssNano()))
  .pipe(dest('../'));
}

function watchBuild() {
  watch('../scss/**/*.scss', { ignoreInitial: false }, series(clean, compileSass));
  // other watchers
}

exports.sass = series(clean, compileSass);
exports.watch = watchBuild;
exports.default = watchBuild;