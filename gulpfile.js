var gulp = require('gulp'),
  gls = require('gulp-live-server'),
  jshint = require('gulp-jshint'),
  open = require('open'),
  paths = {
    scripts: ['app/server/**/*.js', '!lib/**/*.js']
  };


gulp.task('start', function() {
  var server = gls.new('./bin/www');
  server.start();
})

//'lint' task to lint all JS
gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('open', function() {
  open("http://localhost:3000");
})

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint', 'start']);
})

gulp.task('default', ['watch', 'lint', 'start', 'open'])
