const
  wp = true // <= WprdPress 利用の場合は true（HTML吐き出し先が `__static` に）

const
  fs = require('fs'),
  data = require('gulp-data'),
  { src, dest, series, parallel, watch, lastRun } = require('gulp'),
  pug = require('gulp-pug'),
  sass = require('gulp-sass'),
  sassGlob = require('gulp-sass-glob'),
  autoprefixer = require('gulp-autoprefixer'),
  minifyCSS = require('gulp-csso'),
  concat = require('gulp-concat'),
  notify = require('gulp-notify'),
  plumber = require('gulp-plumber'),
  path = require('path'),
  imagemin = require('gulp-imagemin'),
  mozjpeg = require('imagemin-mozjpeg'),
  pngquant = require('imagemin-pngquant'),
  changed = require('gulp-changed'),
  browser = require('browser-sync')

const
  SRC = './src',
  DST = './dest',
  DST_ASSETS = DST+'/_assets'

let DST_HTML = DST
if (wp) DST_HTML = DST+'/__static'

const locals = {
  'site': JSON.parse(fs.readFileSync('./src/data/site.json'))
}

// ========================================
// 必須タスク（コンパイル）
// ========================================

// ----------------------------------------
// Pug
// ----------------------------------------

const pug_html = () => {
  return src([
    SRC+'/pug/**/*.pug',
    '!'+SRC+'/pug/**/_*.pug'
  ])
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(data(function(file) {
      locals.relativePath = path.relative(
        file.base,
        file.path.replace(/.pug$/,'.html')
      )
      locals.currentDir = path.relative(
        file.base,
        file.path.replace(/index.pug$/,'')
      )
      // If lower page
      if ( locals.currentDir.length > 1 ) {
        locals.currentDir += "/";
      }
      let namedPug = 0;
      let dirCount = 0;
      locals.depth = ""
      if ( locals.currentDir.length ) {
        if ( locals.currentDir.match('.pug') ) {namedPug = 1}
        dirCount = locals.currentDir.match(/\//gm).length - namedPug;
        for (var i = 0; i < dirCount; i++) {locals.depth += '../'}
      }
      return locals
    }))
    .pipe(pug({
      locals: locals,
      basedir: './src/pug/',
      pretty: '  ',
    }))
    .pipe(dest(DST_HTML))
}

// ----------------------------------------
// Plain HTML
// ----------------------------------------

const plain_html = () => {
  return src(SRC+'/html/*.html')
    .pipe(dest(DST_HTML))
}

// ----------------------------------------
// SCSS
// ----------------------------------------

const css = () => {
  return src(SRC+'/sass/*.scss', { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(sassGlob())
    .pipe(sass({outputStyle: 'nested'}))
    .pipe(autoprefixer({browsers: [
      "last 3 versions",
      "ie >= 11",
      "Android >= 4",
      "ios_saf >= 10"
    ]}))
    // .pipe(minifyCSS())
    .pipe(dest(DST_ASSETS+'/css', { sourcemaps: './__maps' }))
}

// ----------------------------------------
// JS
// ----------------------------------------

const js = () => {
  return src(SRC+'/js/*.js', { sourcemaps: true })
    .pipe(plumber({errorHandler: notify.onError("<%= error.message %>")}))
    .pipe(concat('app.min.js'))
    .pipe(dest(DST_ASSETS+'/js', { sourcemaps: './__maps' }))
}

// ----------------------------------------
// Image
// ----------------------------------------

const IMGMIN_OPTION = [
  pngquant({
    quality: [0.7, 0.85],
  }),
  mozjpeg({
    quality: 85,
  }),
  imagemin.gifsicle(),
  imagemin.jpegtran(),
  imagemin.optipng(),
  imagemin.svgo({
    removeViewBox: false,
  }),
]

const images = () => {
  return src(SRC+'/img/**/*.+(jpg|jpeg|png|gif|svg)')
  // return src([
  //   SRC+'/img/**/*.+(jpg|jpeg|png|gif|svg)',
  //   '!'+SRC+'/img/favicon/**'
  // ],{since: lastRun(images)})
    .pipe(changed(DST_ASSETS+'/img'))
    .pipe(imagemin(IMGMIN_OPTION))
    .pipe(dest(DST_ASSETS+'/img'))
}

// ========================================
// 補助タスク
// ========================================

// ----------------------------------------
// ローカルサーバー・自動リロード
// ----------------------------------------

const BS_OPTION = {
  // port: 8080,
  server: {
    baseDir: [
      DST,
      DST+'/__static'
    ]
  },
  reloadOnRestart: true,
}

const browsersync = (done) => {
  browser.init(BS_OPTION)
  done()
}

// ========================================
// ファイルの監視
// ========================================

const watchFiles = (done) => {

  const RELOAD = () => {
    browser.reload()
    done()
  }

  // ----------------------------------------
  // DST 配下の監視 → 自動リロード
  // ----------------------------------------

  watch(DST).on('change', series(RELOAD))

  // ----------------------------------------
  // 自動コンパイル
  // ----------------------------------------

  watch(SRC+'/**/*.pug').on('change', series(pug_html))
  watch(SRC+'/**/*.html').on('change', series(plain_html))
  watch(SRC+'/**/*.scss').on('change', series(css))
  watch(SRC+'/**/*.js').on('change', series(js))
  watch(SRC+'/img/**/*.+(jpg|jpeg|png|gif|svg)',series(images))
}

// ========================================
// タスク
// ========================================

exports.images = images
exports.js = js
exports.css = css
exports.default = series(parallel(js, css, plain_html, pug_html, images), series(browsersync, watchFiles))
