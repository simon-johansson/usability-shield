
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

gulp.task('default', ['browser-sync'], function () {
});

gulp.task('browser-sync', ['nodemon'], function() {
  return browserSync.init(null, {
    proxy: "http://localhost:5000",
      files: ["public/**/*.*", 'views/**/*.jade'],
      port: 8080,
  });
});

gulp.task('nodemon', function (cb) {

  var started = false;

  return nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['public/*']})
  .on('start', function () {
    // to avoid nodemon being started multiple times
    // thanks @matthisk
    if (!started) {
      cb();
      started = true;
    }
  });
});
