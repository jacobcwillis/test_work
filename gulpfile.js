var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlreplace = require('gulp-html-replace');
var minify = require('gulp-minify');
var concat = require('gulp-concat');
var image = require('gulp-image');
var flatpicker = require('flatpickr');
const express = require('./express');

sass.compiler = require('node-sass');

// function defaultTask(cb) {
//     // place code for your default task here
//     return gulp.src('./scss/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css'));

//     cb();
// }
// exports.default = defaultTask

gulp.task('sass', function (done) {
    return gulp.src([
        './src/scss/**/*.scss'
    ])
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/css/'));
    done();
});

gulp.task('html', function (done) {
    gulp.src('./src/*.html')
        .pipe(htmlreplace({
            'stylesheetLink': './css/styles.css',
            'minjsLink': './js/myList-min.js',
            'minjsOldLink': './js/myList_old-min.js',
            'stylesheetOldLink' : './css/styles_old.css'
        }))
        .pipe(gulp.dest('./build/'));
    done();
})

gulp.task('img', function (done) {
    gulp.src(['./src/img/**/*.png'])
        .pipe(image())
        .pipe(gulp.dest('./build/img/'));
    done();
})


gulp.task('js', function (done) {
    gulp.src(['./src/js/*.js'])
        .pipe(minify({noSource: true}))
        .pipe(gulp.dest('./build/js/'));
    done();
});

gulp.task('angular', function (done) {
    gulp.src(['./src/js/angular/*.js'])
        .pipe(gulp.dest('./build/js/angular/'));
    gulp.src(['./src/js/angular/*.map'])
        .pipe(gulp.dest('./build/js/angular/'));
    done();
})



gulp.task('default',
    gulp.series(
        gulp.series('js', 'angular', gulp.parallel(['sass', 'html'])), //build
        (done) => {
            express.server();
            gulp.watch(['./src/scss/**/*.scss', './src/index.html', './src/**/*.js'], //watch for updates
                gulp.series('js', gulp.parallel(['sass', 'html']))); //build updates
            done();
        }
    )
);
