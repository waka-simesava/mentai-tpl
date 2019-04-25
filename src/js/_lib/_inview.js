// ------------------------------
// jQuery Inview 設定
// ------------------------------

const minSize = {
  xs: 480,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1600,
}
const breakPoint = {
  xxs: 480,
  xs: 768,
  sm: 992,
  md: 1200,
  lg: 1600,
}
const $window = $(window)
let viewportWith = $window.width()
let animateEffect

module.exports.inviewSetting = () => {

  // --------------------------------------------------
  // inView event の引き金となるカスタムデータ属性
  // --------------------------------------------------
  $('[data-inview]').on('inview', function(event, isInView) {
    if (isInView) {
      $(this).addClass('is-inview')
    } else {
      $(this).removeClass('is-inview')
    }
  })

  // --------------------------------------------------
  // [data-animated] へのクラス付与
  // --------------------------------------------------
  $window.on('load resize', function() {
    viewportWith = $window.width()

    $('[data-animated]').each(function(){
      $(this).addClass('animated')
    })
  })

  // --------------------------------------------------
  // 対象の要素の CSS によるアニメーション処理
  // --------------------------------------------------
  $('[data-animated]').on('inview', function(event, isInView) {
    if (isInView) {
      animateEffect = this.getAttribute('data-animated')
      $(this).addClass(animateEffect).addClass('is-inview')
    } else {
      animateEffect = this.getAttribute('data-animated')
      $(this).removeClass(animateEffect).removeClass('is-inview')
    }
  })
}
