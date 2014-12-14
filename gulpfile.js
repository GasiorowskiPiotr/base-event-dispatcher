/// <vs AfterBuild='default' Clean='clean' />
var gulp = require('gulp');
var trayballoon = require('trayballoon');

var del			= require('del');
var tslint 		= require('gulp-tslint');
var concat 		= require('gulp-concat');
var uglify 		= require('gulp-uglify');
var rename 		= require('gulp-rename');
var ts			= require('gulp-typescript');
var typedoc		= require('gulp-typedoc');
var eventStream = require('event-stream');
var plumber     = require('gulp-plumber');
var runSequence = require('run-sequence');


var onError = function(err) {
    trayballoon({
        text: err.message,
        timeout: 5000,
        icon: 'evilduck.ico'
    });
};

gulp.task('clean', function(done) {
	del(['dist', 'doc', 'coverage'], done);
});

gulp.task('lint', function() {
	return gulp
		.src(['src/*.ts'])
		.pipe(tslint())
		.pipe(tslint.report('verbose'));
});

gulp.task('doc', function() {
	return gulp
		.src(['src/*.ts'])
		.pipe(typedoc({
			module: 'commonjs',
			out: './doc',
			name: 'Event Dispatcher - base classes',
			target: 'es5'
		}));
});

gulp.task('compile', function() {
	var tsResult = gulp
		.src(['src/*.ts'])
        .pipe(plumber({
            errorHandler: onError
        }))
		.pipe(ts({
			declarationFiles: 	true,
			noExternalResolve: 	false
		}));

	return eventStream.merge(
		tsResult.dts.pipe(gulp.dest('dist/dts')),
		tsResult.js.pipe(gulp.dest('dist/js/src')));
});

gulp.task('minify', function() {
	return gulp
		.src(['dist/js/src/*.js'])
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(rename('base-event-distpacher.min.js'))
		.pipe(gulp.dest('dist/js'));

});

gulp.task('info', function() {
    trayballoon({
        text: 'Build successful',
        timeout: 20000,
        icon: 'evilduck.ico'
    });
});

gulp.task('default', function(done) {
	runSequence('clean', ['lint', 'doc'], 'compile', 'minify', 'info', done);
});

gulp.task('fast', function(done) {
    runSequence('clean', 'compile', 'info', done);
});

gulp.task('watch', function() {
    gulp.watch(['src/**/*.ts', 'test/src/**/*.ts'], ['fast']);
});