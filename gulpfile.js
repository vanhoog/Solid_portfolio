/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    plumber = require('gulp-plumber'),
    del = require('del'),
    project = require('./project.json'),
    ts = require("gulp-typescript"),
    tsProject = ts.createProject("tsconfig.json"),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    tsify = require("tsify"),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    buffer = require('vinyl-buffer'),
    paths = {
    pages:
        ['src/*.html']
    };

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("src/assets/js"));
});

gulp.task("ts", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ['resources/ts/main.ts'],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest("src/assets/js"))
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("src/assets/js"));
});


var siteStaticPath = project.websiteRoot,
    siteStaticScriptsPath = siteStaticPath + "/assets/js",
    siteStaticCssPath = siteStaticPath + "/assets/css";

// Styles
gulp.task('sass', function () {
    gulp.src('resources/scss/styles.scss')
         .pipe(sass({

          }))
        .pipe(gulp.dest(siteStaticCssPath))

        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('vendor-scripts', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.js',
        siteStaticPath + '/src/scripts/vendor/flexibility.js', //Fix IE9 Flex Columns
    ])
    .pipe(plumber())
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest(siteStaticScriptsPath))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest(siteStaticScriptsPath))
    .pipe(notify({ message: 'Vendor scripts bundle task complete' }));
});

//TS

// Clean
gulp.task('clean', function (cb) {
    del([siteStaticScriptsPath, siteStaticCssPath, siteStaticPath + '/images'], { force: true }, cb)
});

//// Default task
gulp.task('default', function () {
    gulp.start('sass', 'ts', 'copy-html');
});

// Watch
gulp.task('watch', function () {

    // Watch .scss files
    gulp.watch('resources/scss/**/*.scss', ['sass']);



    // Watch .ts files
    gulp.watch('resources/ts/**/*.ts', ['ts']);

});
