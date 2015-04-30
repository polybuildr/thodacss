var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('css', function() {
    return gulp.src('src/styles/*.{css,scss}')
        .pipe(sass({errLogToConsole: true, precision: 3}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('build', ['css']);

gulp.task('default', ['build'], function() {
    gulp.watch('src/styles/*.{scss,css}', ['css']);
});
