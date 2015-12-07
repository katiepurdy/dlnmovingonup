'use strict';

var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');

var paths = {
    scripts: ['js/**/module.js', 'js/**/*.js'],
    styles: 'css/scss/app.scss',
    images: 'assets/**/*'
};

// Delete existing files before building project
gulp.task('clean', function() {
	return del('dist/**/*');
});

// Concatenate and minify JS files
gulp.task('js', function () {
  return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/js'))
});

// Compile SCSS, minify, and prefix
gulp.task('scss', function() {
  return gulp.src(paths.styles)
  	.pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/css'));
});

// Compress images
gulp.task('images', function() {
	return gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('dist/images'));
});

// Watch for file changes
gulp.task('watch', ['js', 'scss'], function () {
  gulp.watch(paths.scripts, ['js']);
  gulp.watch(paths.styles, ['scss']);
});

// Default task
gulp.task('default', ['clean', 'watch', 'js', 'scss']);