// ------------------------------
// TOPページ JS設定
// ------------------------------
const breakPoint = {
  xxs: 480,
  xs: 768,
  sm: 992,
  md: 1200,
  lg: 1600,
}

module.exports.carousel = () => {

  // ------------------------------
  // Slick カルーセル 設定
  // ------------------------------

  const
    carousel01 = $('#intro-carousel'),
    carousel02 = $('#floor-carousel'),
    carousel03 = $('#feature-carousel'),
    carousel04 = $('#questionnaire-carousel'),
    carousel05 = $('#env-carousel')

  const startslick = () => {
    carousel01.slick({
      dots: false,
      slidesToShow: 7,
      centerMode: true,
      centerPadding: '60px',
      arrows: false,
      autoplay: true,
      autoplaySpeed: 0,
      speed: 8000,
      swipe: false,
      cssEase: 'linear',
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,

      responsive: [
        {
          breakpoint: breakPoint.lg,
          settings: {
            slidesToShow: 5,
          }
        },
        {
          breakpoint: breakPoint.md,
          settings: {
            slidesToShow: 4,
          }
        },
        {
          breakpoint: breakPoint.xs,
          settings: {
            slidesToShow: 3,
          }
        },
        {
          breakpoint: breakPoint.xxs,
          settings: {
            slidesToShow: 2,
          }
        }
      ]
    })

    carousel02.slick({
      dots: false,
      infinite: true,
      speed: 800,
      // autoplaySpeed: 5500,
      fade: true,
      arrows: false,
      autoplay: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      cssEase: 'ease-in-out',
      asNavFor: '#feature-carousel',
    })

    carousel03.slick({
      dots: true,
      infinite: true,
      speed: 800,
      // autoplaySpeed: 5500,
      fade: false,
      arrows: true,
      autoplay: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      cssEase: 'ease-in-out',
      asNavFor: '#floor-carousel',
    })

    carousel04.slick({
      dots: true,
      infinite: true,
      speed: 800,
      // autoplaySpeed: 3500,
      fade: false,
      arrows: true,
      autoplay: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      cssEase: 'ease-in-out',
    })

    carousel05.slick({
      dots: true,
      infinite: true,
      speed: 800,
      // autoplaySpeed: 3500,
      fade: false,
      arrows: true,
      autoplay: false,
      pauseOnFocus: false,
      pauseOnHover: false,
      pauseOnDotsHover: false,
      cssEase: 'ease-in-out',
    })
  }

  const stopslick = () => {
    carousel01.slick('unslick')
    carousel02.slick('unslick')
    carousel03.slick('unslick')
    carousel04.slick('unslick')
    carousel05.slick('unslick')
  }

  startslick()

  // ------------------------------
  // リサイズ後にカクつくため、リサイズ後に停止して再開する
  // ------------------------------

  let
    resizeTimer,
    interval = Math.floor(1000 / 60 * 10)

  window.addEventListener('resize', (event) => {
    if (resizeTimer !== false) {
      clearTimeout(resizeTimer)
    }
    resizeTimer = setTimeout(() => {
      stopslick()
      startslick()
    }, interval)
  })

}
