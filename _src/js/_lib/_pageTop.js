// ------------------------------
// ページ上部へのアニメーション
// ------------------------------

let
  scrollTop = $(window).scrollTop(),
  triggerTop = null
const
  windowHeight = $(window).height(),
  triggerElement = $('.p-closing'),
  triggerSubElement = $('.l-footer'),
  targetElement = $('.c-pagetop-button')

if (triggerElement.length) {
  triggerTop = triggerElement.offset().top
} else if (triggerSubElement.length) {
  triggerTop = triggerSubElement.offset().top
}

module.exports.pageTop = () => {

  // --------------------------------------------------
  // 読み込み時
  // --------------------------------------------------

  $(window).on('load',() => {
    if (triggerElement.length) {
      triggerTop = triggerElement.offset().top
    }
  })

  // --------------------------------------------------
  // 読み込み時およびスクロール時
  // --------------------------------------------------

  $(window).on('load scroll', () => {
    scrollTop = $(window).scrollTop()

    // スクロール 200 の時
    if ( scrollTop < 200 ) {
      targetElement.removeClass('is-active')
    } else {
      targetElement.addClass('is-active')
    }
  })
}

module.exports.scrollCat = () => {

  // --------------------------------------------------
  // スクロールキャット
  // --------------------------------------------------

  let
    n = 1,
    n_,
    steprate = 1
  if (targetElement.data('batabata')) {
    steprate = targetElement.data('batabata')
  }

  $(window).on('load scroll', () => {
    if (n <= 8) {
      n += steprate
    } else {
      n = steprate
    }
    n_ = Math.floor(n)
    if (n_ == 0) {
      n_ = 8
    } else if (n_ == 9) {
      n_ = 8
    }
    targetElement.css({
      backgroundPosition: -n_ * 160 + 160 + 'px 0px'
    })
  })
}
