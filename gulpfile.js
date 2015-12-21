var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    header = require('gulp-header'),
    del = require('del'),
    args = require('yargs').argv,
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    uglifyjs = require('gulp-uglify'),
    addsrc = require('gulp-add-src'),
    concat = require('gulp-concat');

var pkg = JSON.parse(require('fs').readFileSync('./package.json'));
var banner = '/*! ThodaCSS v<%= pkg.version %> | <%= pkg.license %> License | <%= pkg.homepage %> */\n';

gulp.task('clean', function() {
    var destination = args.production ? 'dist/' : 'build/';
    return del.sync([destination]);
});

gulp.task('css', function() {
    return gulp.src('src/styles/*.{css,scss}')
        .pipe(sass({errLogToConsole: true, precision: 3}))
        .pipe(autoprefixer())
        .pipe(header(banner, {pkg: pkg}))
        .pipe(addsrc.prepend('src/styles/vendor/**'))
        .pipe(gulpif(args.production, minifyCss()))
        .pipe(gulpif(args.production, concat('thoda.min.css')))
        .pipe(gulpif(args.production, gulp.dest('dist/css/'), gulp.dest('build/css/')));
});

gulp.task('js', function() {
    return gulp.src('src/scripts/*.js')
        .pipe(header(banner, {pkg: pkg}))
        .pipe(gulpif(args.production, uglifyjs({preserveComments: 'license'})))
        .pipe(gulpif(args.production, gulp.dest('dist/js/'), gulp.dest('build/js/')));
});

gulp.task('build', ['css', 'js']);

gulp.task('watch', ['default'], function() {
    gulp.watch('src/styles/*.{scss,css}', ['css']);
    gulp.watch('src/scripts/*.js', ['js']);
});

gulp.task('default', ['clean'], function() {
    gulp.run('build');
});
