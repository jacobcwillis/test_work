function defaultTask(cb) {
    // place code for your default task here

    var gulp = require('gulp');
    var sass = require('gulp-sass');

    sass.compiler = require('node-sass');

    gulp.task('sass', function () {
        return gulp.src('./scss/**/*.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./css'));
    });

    gulp.task('sass:watch', function () {
        gulp.watch('./scss/**/*.scss', ['sass']);
    });





    cb();
}
exports.default = defaultTask

