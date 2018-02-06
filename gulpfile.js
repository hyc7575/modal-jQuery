var gulp = require('gulp');
var sass = require('gulp-sass')
var babel = require('gulp-babel');

gulp.task('js', function() {
	return gulp.src('./js/*.js')
			.pipe(babel())
        	.pipe(gulp.dest('./'));
});

gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./'));
});

gulp.task('watch', function() {
    gulp.watch('./js/*.js', ['js']);
    gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['js', 'sass', 'watch']);
