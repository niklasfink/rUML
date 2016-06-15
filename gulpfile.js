var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var gls = require('gulp-live-server');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
	gulp.run(['html', 'js', 'css', 'server', 'once']);
});

gulp.task('once', function() {
	gulp.src('src/rb/**/*')
		.pipe(gulp.dest('dist/rb'));
	gulp.src('src/img/**/*')
		.pipe(gulp.dest('dist/public/img'));
	gulp.src('node_modules/codemirror/lib/codemirror.css')
		.pipe(gulp.dest('dist/public/css'));
	gulp.src('node_modules/codemirror/theme/monokai.css')
		.pipe(gulp.dest('dist/public/css'));
	gulp.src('node_modules/viz.js/viz.js')
		.pipe(gulp.dest('dist/public/js'));
});

gulp.task('html', function() {
	gulp.src('src/html/*.html')
		.pipe(gulp.dest('dist/public'));
});

gulp.task('server', function() {
	gulp.src('src/server.js')
		.pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
	//gulp.src(['src/**/*.js', '!src/server.js', '!src/*.min.js'])
	//	.pipe(uglify())
	//	.pipe(gulp.dest('dist/public'));
	return browserify({
			entries: ['src/js/script.js', 'src/js/helperfunctions.js']
		})
		.bundle()
		.on('error', function(err) {
			console.log(err.toString());
			this.emit("end");
		})
		.pipe(source('main.bundled.js'))
		.pipe(gulp.dest('dist/public/js'));
});

gulp.task('css', function() {
	gulp.src('src/css/*.css')
		.pipe(uglifycss({
			"uglyComments": true
		}))
		.pipe(concat('styles.css'))
		.pipe(gulp.dest('dist/public/css'));
});

gulp.task('watch', function() {
	gulp.watch('src/server.js', ['server']);
	gulp.watch('src/js/*.js', ['js']);
	gulp.watch('src/css/*.css', ['css']);
	gulp.watch('src/html/*.html', ['html']);
});

gulp.task('serve', ['default', 'watch'], function() {
	//1. run your script as a server
	var server = gls.new('dist/server.js');
	server.start();

	//use gulp.watch to trigger server actions(notify, start or stop)
	gulp.watch(['dist/public/**/*'], function(file) {
		server.notify.apply(server, [file]);
	});
	//gulp.watch('dist/server.js', server.start.bind(server)); //restart my server

	//Note: try wrapping in a function if getting an error like `TypeError: Bad argument at TypeError (native) at ChildProcess.spawn`
	gulp.watch('dist/server.js', function() {
		server.start.bind(server)();
	});
});
