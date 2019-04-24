const
  { src, dest, series, parallel, watch } = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  minifyCSS = require('gulp-csso'),
  concat = require('gulp-concat'),
  browser = require('browser-sync')

// ========================================
// 必須タスク
// ========================================

function html() {
  return src('./src/pug/*.pug')
    .pipe(pug())
    .pipe(dest('./dest/html'))
}

function css() {
  return src('./src/sass/*.scss')
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(dest('./dest/_assets/css'))
}

function js() {
  return src('./src/js/*.js', { sourcemaps: true })
    .pipe(concat('app.min.js'))
    .pipe(dest('./dest/_assets/js', { sourcemaps: true }))
}

// ========================================
// 補助タスク
// ========================================

// ----------------------------------------
// ブラウザ関連
// ----------------------------------------

const BS_OPTION = {
  // port: 8080,
  server: {
    baseDir: './dest/',
    index: 'index.html',
  },
  reloadOnRestart: true,
}
function browsersync(done) {
  browser.init(BS_OPTION)
  done()
}

function watchFiles(done) {
  const browserReload = () => {
    browser.reload()
    done()
  }
  // gulp.watch(paths.styles.src).on('change', gulp.series(styles, browserReload))

  watch('./src/sass/**/*.scss').on('change', series(css, browserReload))



  // gulp.watch(paths.styles.src).on('change', gulp.series(styles, browserReload))
  // gulp.watch(paths.scripts.src).on('change', gulp.series(scripts, esLint, browserReload))
  // gulp.watch(paths.html.src).on('change', gulp.series(html, browserReload))
}


// function reload() {
//   browser.reload()
// }


// exports.js = js
// exports.css = css
// exports.html = html
// exports.default = parallel(html, css, js)

// gulp.task('default', gulp.series(gulp.parallel(scripts, styles, html), gulp.series(browsersync, watchFiles)));

exports.default = series(parallel(js, css, html), series(browsersync, watchFiles))

// exports.default = parallel(html, css, js, )
// exports.default = css
