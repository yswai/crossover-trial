var gulp = require('gulp');
var del = require('del');
var srcFolder = 'client/src';
var distFolder = 'client/wwwroot';

gulp.task('clean', function() {
   return del([distFolder + '/css', distFolder + '/js', distFolder + '/img', ]);
});

gulp.task('dev', ['clean'], function() {
  gulp.src([srcFolder + '/**'])
    .pipe(gulp.dest(distFolder));
});
