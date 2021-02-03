var gulp = require('gulp');
var sass = require('gulp-sass');

sass.compiler = require('node-sass');

// function defaultTask(cb) {
//     // place code for your default task here
//     return gulp.src('./scss/**/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('./css'));

//     cb();
// }
// exports.default = defaultTask

gulp.task('appCSS', function (done) {
    return gulp.src([
        './scss/**/*.scss'
    ])
        //.pipe(concat('app.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css/'));
    done();
});



gulp.task('default', gulp.series((done) => {
    // Watch SCSS
    gulp.watch('./scss/**/*.scss', gulp.series(['appCSS']));

}));
