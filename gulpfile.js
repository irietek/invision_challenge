var gulp, less, path, minicss, rename, sourcemaps, browserSync;

gulp        = require('gulp');
browserSync = require('browser-sync');
less        = require('gulp-less');
path        = require('path');
rename      = require('gulp-rename');
filter      = require('gulp-filter');
mincss      = require('gulp-minify-css');
sourcemaps  = require('gulp-sourcemaps');

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "./public/"
    }
  });
});

gulp.task('less', function(){
  gulp.src('./build/less/app.less')
    .pipe(sourcemaps.init())
    .pipe(less({
      paths : [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(mincss())
    .pipe(sourcemaps.write())
    .pipe(rename('app.css'))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('watch', function(){
  gulp.watch('./public/*.html', ['reload']);
  gulp.watch('./build/less/**/*.less', ['less']);
});

gulp.task('default', ['browser-sync', 'less', 'watch']);
