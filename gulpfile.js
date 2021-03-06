const
  static_dir_use = true, // <= 静的書き出しディレクトリを分ける場合は `true`
  static_dir_name = '__static' // <= 静的書き出しディレクトリの名前

const
  SRC = './_src',
  DST = './dest',
  DST_ASSETS = DST+'/_assets'

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
  browser = require('browser-sync'),
  browserify = require('browserify'),
  babelify   = require('babelify'),
  source = require('vinyl-source-stream'),
  favicons = require('favicons').stream

let DST_HTML = DST
if (static_dir_use) DST_HTML = DST+'/'+static_dir_name

const locals = {
  'site': JSON.parse(fs.readFileSync(SRC+'/data/site.json'))
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
      basedir: SRC+'/pug/',
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
  return browserify(SRC+'/js/_app.js', { debug: false })
    .transform(babelify, {presets: ['@babel/env']})
    .bundle()
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(source('app.js'))
    .pipe(dest(DST_ASSETS+'/js'))
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
  return src([
    SRC+'/img/**/*.+(jpg|jpeg|png|gif|svg)',
    '!'+SRC+'/img/favicon/*.ico'
  ])
    .pipe(changed(DST_ASSETS+'/img'))
    .pipe(imagemin(IMGMIN_OPTION))
    .pipe(dest(DST_ASSETS+'/img'))
}

// ----------------------------------------
// favicon
// ----------------------------------------

const favicon = () => {
  return src(SRC+'/img/favicon/*.ico')
    .pipe(dest(DST_ASSETS+'/img/favicon'))
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
      DST+'/'+static_dir_name
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
  watch(SRC+'/img/favicon/*.ico',series(favicon))
}

// ========================================
// タスク
// ========================================

exports.favicon = favicon
exports.images = images
exports.js = js
exports.css = css
exports.default = series(parallel(js, css, plain_html, pug_html, images, favicon), series(browsersync, watchFiles))
