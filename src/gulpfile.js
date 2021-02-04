var gulp = require('gulp');
var sass = require('gulp-sass');
var htmlreplace = require('gulp-html-replace');
var minify = require('gulp-minify');

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
        './scss/**/*.scss'
    ])
        //.pipe(concat('app.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('../build/css/'));
    done();
});

gulp.task('html', function (done) {
    gulp.src('index.html')
        .pipe(htmlreplace({
            'stylesheetLink': './css/styles.css',
            'minjsLink': './js/myList-min.js'
        }))
        .pipe(gulp.dest('../build/'));
    done();
})


gulp.task('js', function (done) {
    gulp.src(['./js/*.js'])
        .pipe(minify())
        .pipe(gulp.dest('../build/js/'))
    done();
});



gulp.task('default',
    gulp.series(
        gulp.series('js', gulp.parallel(['sass', 'html'])), //build
        (done) => {
            gulp.watch(['./scss/**/*.scss', './index.html'], //watch for updates
                gulp.series('js', gulp.parallel(['sass', 'html']))); //build updates
            done();
        }
    )
);
