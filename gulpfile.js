const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const resolver = require('stylus').resolver;

const params = {
    out: 'public',
    htmlSrc: 'app/index.html'
};

gulp.task('default', ['server', 'build'], function () {

});

gulp.task('server', function () {
    browserSync.init({
        server: params.out
    });

    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/js/**.*', ['js']);
    gulp.watch('app/blocks/**/*.*', ['css']);

    browserSync.watch('public/**/*.*').on('change', reload);
});

gulp.task('build', ['html', 'css', 'js', 'images', 'fonts'], function () {

});

gulp.task('html', function () {
    gulp.src(params.htmlSrc)
        .pipe(rename('index.html'))
        .pipe(gulp.dest(params.out));
});

gulp.task('fonts', function () {
    gulp.src('app/fonts/**/*.*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('js', function () {
    gulp.src('app/js/**/*.*')
        .pipe(gulp.dest('public/js'));
});

gulp.task('css', function () {
    return gulp.src('app/blocks/index.styl')
        .pipe(sourcemaps.init())
        .pipe(stylus({
            define: {
                url: resolver()
            },
            'include css': true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(params.out + '/styles'));
});

gulp.task('images', function () {
    gulp.src(['app/blocks/**/*.{jpg,png,gif,svg}'])
        .pipe(gulp.dest(params.out + '/styles'));
});