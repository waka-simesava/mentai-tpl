// ------------------------------
// スムーススクロール
// ------------------------------

let
  hHeight = 0,
  windowWidth = window.innerWidth

const
  minSize = {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1600,
  }

// // --------------------------------------------------
// // スクロール位置の調整
// // --------------------------------------------------
// // ヘッダーがある場合はスクロール位置をヘッダーの高さ分、ずらす
// if ($('.l-header').length) {
//   hHeight += $('.l-header').height() - 2
// }

// --------------------------------------------------
// トリガーとターゲット
// --------------------------------------------------
// スクロールの引き金となる要素
const scrollTorigger = $('a[href*="#"]')
// ハッシュ（URLからみたスクロール先）
let urlHash = location.hash
// ハッシュに半角スペースを含む場合の正規表現
urlHash = urlHash.replace('%20','\\ ')

// --------------------------------------------------
// スムーススクロールを実行する関数
// --------------------------------------------------
function smoothScroll(hash) {
  var target = $(hash)
  var position = target.offset().top - hHeight
  $('body,html').stop().animate({scrollTop:position}, 600)
}

module.exports.smoothScroll = () => {
  // --------------------------------------------------
  // URLにハッシュがある場合
  // --------------------------------------------------
  if(urlHash) {
    setTimeout(() => {
      smoothScroll(urlHash)
    }, 100)
  }

  // --------------------------------------------------
  // アンカーリンクをクリックした場合
  // --------------------------------------------------
  scrollTorigger.click(function() {
    let href = $(this).attr('href')
    let hash = href == "#" ? 'html' : href

    // ハッシュに半角スペースを含む場合の対策
    hash = hash.replace(/ /g,'\\ ')

    // URLからスクロール先となるハッシュを取得し代入
    if (hash.match('#').length) {
      let urlData = hash.split('#')
      hash = '#'+urlData[1]
    }
    smoothScroll(hash)
    return false
  })
}
