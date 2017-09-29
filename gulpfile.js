/**
 * Basic gulp file for static site development.
 * 
 */
/* eslint-env node */

'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var prefix = require('gulp-autoprefixer');
var connect = require('gulp-connect');
var eyeglass = require("eyeglass");
var kss = require('kss');

var sassOptions = {
  outputStyle: 'expanded',
  eyeglass: {
    enableImportOnce: false
  }
};

var sassPattern = 'src/sass/**/*.scss';
var sgPattern = [sassPattern, 'src/sass/**/*.html'];
var htmlPattern = ['src/**/*.html', '!src/styleguide/**/*.html'];

//
// Begin Gulp Tasks.
//

//
// SASS Task
//
gulp.task('styles:dev', function () {
  return gulp.src(sassPattern)
    .pipe(sourcemaps.init())
    .pipe(sass(eyeglass(sassOptions)).on('error', sass.logError))
    .pipe(prefix(["last 2 versions"]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('src/css'))
    .pipe(connect.reload());
});

//
// HTML task
//
gulp.task('html', function () {
  return gulp.src(htmlPattern)
    .pipe(connect.reload());
});

//
// Watch task
//
gulp.task('watch', function () {
  gulp.watch(sassPattern, ['styles:dev']);
  gulp.watch(htmlPattern, ['html']);
  gulp.watch(sgPattern, ['styleguide']);
});

//
// Gulp Connect dev server
//
gulp.task('connect', function() {
  connect.server({
    livereload: true,
    root: 'src'
  });
});

//
// KSS Styleguide task
//

gulp.task('styleguide', function() {
  return kss({
    source: 'src/sass',
    destination: 'src/styleguide',
    css: '../css/styles.css',
    homepage: 'styleguide.md'
  });
});

//
// Task declarations.
//
gulp.task('dev', ['styles:dev', 'styleguide', 'connect', 'watch']);
