var gulp, less, path, paths, minicss, rename, sourcemaps, browserSync;

gulp        = require('gulp');
browserSync = require('browser-sync');
less        = require('gulp-less');
path        = require('path');
rename      = require('gulp-rename');
filter      = require('gulp-filter');
mincss      = require('gulp-minify-css');
concat      = require('gulp-concat'),
uglify      = require('gulp-uglify'),
sourcemaps  = require('gulp-sourcemaps');

paths = {
  less: [
    './build/less/app.less'
  ],
  angular : [
    './build/js/app.js',
    './build/js/App/factories/*.js',
    './build/js/App/directives/*.js',
    './build/js/App/controllers/*.js'
  ]
};

gulp.task('browser-sync', function(){
  browserSync({
    server: {
      baseDir: "./public/"
    }
  });
});

gulp.task('less', function(){
  gulp.src(paths.less)
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

gulp.task('angular', function(){
  gulp.src(paths.angular)
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('watch', function(){
  gulp.watch('./public/*.html', ['reload']);
  gulp.watch('./public/data/*.json', ['angular']);
  gulp.watch('./build/js/**/*.js', ['angular']);
  gulp.watch('./build/less/**/*.less', ['less']);
});

gulp.task('default', ['browser-sync', 'less', 'watch']);
