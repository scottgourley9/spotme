var gulp = require('gulp'),
    del = require('del'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    print = require('gulp-print'),
    babel = require('gulp-babel');

var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();


// gulp.task('clean', function (cb) {
//     del([
//         'build'
//     ], cb);
// });

gulp.task('build-css', function () {
    return gulp.src('public/css/*')
        // .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cachebust.resources())
        .pipe(concat('styles.css'))
        // .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./public/build/css'));
});


gulp.task('build-js', function() {
   return gulp.src(['public/js/controllers/**/*.js', 'public/js/services/**/*.js'])
      // .pipe(sourcemaps.init())
      .pipe(print())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      // .pipe(sourcemaps.write('./maps'))
      .pipe(gulp.dest('./public/build/js'));
});

gulp.task('build', ['build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('./public/build'));
});

gulp.task('default', function() {
    return gulp.watch(['./public/index.html','./public/partials/*.html', './public/styles/*.*css', './public/js/**/*.js'], ['build']);
});
