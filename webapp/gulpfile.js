var gulp = require('gulp');
var stylus = require('gulp-stylus');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('compressAngular', function() {
    return gulp.src(
        [   // Modules need to be listed first to guarantee that they
            // are always available
            // list MODULES
            './app/app.js',
            // end MODULES
            // target .js files, but ignore test resources
            './app/components/**/*.js',
            './app/events/**/*.js'
            // Custom skips
        ]
    )
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(gulp.dest('./app/dist'))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./app/dist'))
        .pipe(livereload());
});

gulp.task('stylus', function () {
    gulp.src('./app/assets/stylus/index.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourcemaps.write('/'))
        .pipe(gulp.dest('./app/assets/css/'))
        .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('./app/assets/stylus/*.styl', ['stylus']);
    gulp.watch('./app/**/*.js', ['compressAngular']);
});

gulp.task('default', ['stylus', 'compressAngular', 'watch']);