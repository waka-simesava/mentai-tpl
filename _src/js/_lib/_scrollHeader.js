// ------------------------------
// アンカーナビの固定
// ------------------------------

let
  scrollTop = $(window).scrollTop(),
  fixPoint
const
  header = $('.l-header'),
  headerH = header.height(),
  anchorNav = $('.p-index-anchor'),
  main = $('main')

module.exports.scrollHeader = () => {
  $(window).on('load scroll', function() {
    scrollTop = $(window).scrollTop()
    fixPoint = main.offset().top

    if ( scrollTop < fixPoint - headerH ) {
      anchorNav.removeClass('is-fixed')
      // anchorNav.css('top',0)
    } else {
      anchorNav.addClass('is-fixed')
      // anchorNav.css('top',headerH - 1)
    }
  })
}
