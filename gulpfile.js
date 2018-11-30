// inject dependecies
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');
    
var browserSync = require('browser-sync').create();
    
// create object with all paths
var paths = {
  css: {
    src: './src/scss/*.scss',
    dest: './dist/css/'
  },
  js: {
    src: './src/js/*.js',
    dest: './dist/js/'
  },
  html: {
    src: './*.html'
  }
};

// create function for css task
function css(){
  return (
    gulp
      .src(paths.css.src)
      .pipe(sass({
        errorLogToConsole: true,
        outputStyle: 'compressed'
      }))
      .on('error', console.error.bind(console))
      .pipe(rename({
        suffix: '.min'
      }))
      .pipe(gulp.dest(paths.css.dest))
      .pipe(browserSync.stream())
  );
}

// create function for scripts task
function scripts() {
    return (
        gulp
            .src(paths.js.src)
            .pipe(uglify())
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(gulp.dest(paths.js.dest))
            .pipe(browserSync.stream())
    );
}

// create function for watch tasks
function watch(){
  css();
  scripts();
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch(paths.css.src, css);
  gulp.watch(paths.js.src, scripts);
  gulp.watch(paths.html.src, reload);
}

// create reload function for browser sync
function reload(){
  browserSync.reload();
}

// export functions to tasks
exports.css = css;
exports.scripts = scripts;
exports.watch = watch;




