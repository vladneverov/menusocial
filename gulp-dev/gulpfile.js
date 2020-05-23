const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

function scssFiles() {
    return gulp.src('./src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(autoprefixer({
         overrideBrowserslist: ['> 0.1%'],
         cascade: false,
      }))
      .pipe(cleanCSS({
        level: 2,
      }))
      .pipe(gulp.dest('./build/css'))
      .pipe(browserSync.stream());
};

const jsFiles = [
    './src/js/jquery-3.5.1.min.js',
    './src/js/nav.js'
];

function scripts() {
    return gulp.src(jsFiles)
               .pipe(concat('all.js'))
               .pipe(uglify({
                   toplevel: true,
               }))
               .pipe(gulp.dest('./build/js'))
               .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

   gulp.watch('./src/scss/**/*.scss', scssFiles);
   gulp.watch('./src/js/**/*.js', scripts);
   gulp.watch('./*.html').on('change', browserSync.reload);
}

function clean() {
    return del(['build/css', 'build/js']);
}

gulp.task('watch', watch);

gulp.task('build', gulp.series(clean,
                      gulp.parallel(scssFiles, scripts)
                   ));

gulp.task('dev', gulp.series('build', 'watch'));