var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

gulp.task('stylus', function () {
    gulp.src('./app/assets/stylus/index.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./app/assets/stylus/*.styl', ['stylus']);
});

gulp.task('default', ['stylus', 'watch']);