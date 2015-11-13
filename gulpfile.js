var gulp = require('gulp');
var del = require('del');
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

var tmpFolder = 'client/tmp';
var srcFolder = 'client/src';
var distFolder = 'client/wwwroot';

gulp.task('clean-tmp', function() {
   return del(
     [tmpFolder + '/styles', tmpFolder + '/js', tmpFolder + '/img']
   );
});

gulp.task('clean-dist', function() {
  return del(
    [distFolder + '/styles', distFolder + '/js', distFolder + '/img']
  );
});

gulp.task('build-css', function() {
  return gulp.src(srcFolder + '/styles/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest(tmpFolder + '/styles'));
});

gulp.task('build-js', function() {
  gulp.src(srcFolder + '/js/**.*')
    .pipe(gulp.dest(tmpFolder + '/js'));
});

gulp.task('dev', ['clean-dist', 'clean-tmp', 'build-js', 'build-css'], function() {
  gulp.src([tmpFolder + '/**'])
    .pipe(gulp.dest(distFolder));
});
