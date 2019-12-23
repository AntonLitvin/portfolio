//'use strict';

var gulp           = require('gulp'),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		autoprefixer   = require('gulp-autoprefixer'),
		concat         = require('gulp-concat'),
		rename         = require('gulp-rename'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		del            = require('del'),
		notify         = require('gulp-notify'),
		gutil          = require('gulp-util' ), // for deploy
		ftp            = require('vinyl-ftp'); // for deploy


// Стили проекта
gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.scss')
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(autoprefixer(['last 10 versions']))
	.pipe(gulp.dest('app/css'))//несжатый CSS
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});


// Скрипты проекта
gulp.task('common-js', function() {
	return gulp.src([
		'app/js/common.js',
		])
	.pipe(concat('common.min.js'))
	.pipe(uglify().on('error', notify.onError()))
	.pipe(gulp.dest('app/js'));
});

gulp.task('js', ['common-js'], function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js', // сюда добавляем библиотеки
		'app/libs/isotope/dist/isotope.pkgd.min.js',
		'app/libs/images-loaded/imagesloaded.pkgd.min.js',
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'app/libs/parallax.js-1.5.0/parallax.min.js',
		'app/libs/wow/dist/wow.min.js',
		//'app/js/common.min.js', // Всегда в конце, раскоментить, если хотим склеить весь js, удалить подключение common.js в index.html
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify()) // Минимизировать весь js (на выбор)
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});


// Оптимизация изображений
gulp.task('imagemin', function() {
	return gulp.src('app/img/**/*')
	.pipe(cache(imagemin({
		progressive: true, //сжатие .jpg
		svgoPlugins: [{removeViewBox: false}], //сжатие .svg
		interlaced: true, //сжатие .gif
		optimizationLevel: 3 //степень сжатия от 0 до 7
	})))
	.pipe(gulp.dest('dist/img')); 
});


// Локальный сервер
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});


// Слежение за изменениями
gulp.task('watch', ['sass', 'js', 'common-js', 'browser-sync'], function() {
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});


// Сборка проекта в директорию dist
gulp.task('build', ['removedist', 'imagemin', 'sass', 'js'], function() {

	var buildHTML = gulp.src([
		'app/*.html',
		'app/.htaccess',
		])
		.pipe(gulp.dest('dist'));

	var buildFiles = gulp.src([
		'app/files/**/*',
		]).pipe(gulp.dest('dist/files'));

	var buildCss = gulp.src([
		'app/css/**/*.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		'app/js/common.js',
		]).pipe(gulp.dest('dist/js'));

	var buildFonts = gulp.src([
		'app/fonts/**/*',
		]).pipe(gulp.dest('dist/fonts'));

});


gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);


// Deploy
gulp.task('deploy', function() {

	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10,
		log: gutil.log
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));

});