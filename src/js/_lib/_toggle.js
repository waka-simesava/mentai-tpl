// ------------------------------
// トグル
// ------------------------------

const
  speed = 250;
let
  viewportWith = $(window).width(),
  xxsMinSize = 330,
  xsMinSize = 480,
  smMinSize = 768,
  mdMinSize = 992,
  lgMinSize = 1200,
  xlMinSize = 1600

module.exports.toggle = () => {

  // --------------------
  // 通常のトグル機能
  // --------------------
  $('[data-trigger]').css({
    'cursor': 'pointer',
    'user-select': 'none',
    'transition': speed * 0.001 + 's all',
  })

  $('[data-target]').each(function(){
    $(this).toggle();
  });

  $('[data-trigger].is-active').each(function(){
    let targetValue = $(this).data('trigger')[0];
    let targetElement = '[data-target]';
    let activeElement = $(targetElement).filter(function() {
      return $(this).data('target')[0] == targetValue;
    });
    $(activeElement).show().addClass('is-visible');
  });

  $('[data-trigger]').on('click',function() {
    let targetValue = $(this).data('trigger')[0];
    let targetEffect = $(this).data('trigger')[1];
    let targetElement = '[data-target]';
    let activeElement = $(targetElement).filter(function() {
      return $(this).data('target')[0] == targetValue;
    });

    $(this)
      .toggleClass('is-active')

    if (targetEffect) {
      if (targetEffect == "fade") {
        $(activeElement)
          .stop()
          .fadeToggle(speed)
          .toggleClass('is-visible');
      } else if (targetEffect == "slide") {
        $(activeElement)
          .stop()
          .slideToggle(speed)
          .toggleClass('is-visible');
      }
    } else {
      $(activeElement)
        .stop()
        .toggle()
        .toggleClass('is-visible');
    }

  });
}

module.exports.mqToggle = () => {

  // --------------------
  // メニューボタン専用のトグル機能
  // ※ デフォルトの非表示を解除したトグル
  // ※ 代わりにCSSで初期の表示制御を行う
  // --------------------
  $('[data-mq-trigger]').css({
    'cursor': 'pointer',
    'user-select': 'none',
    'transition': speed * 0.001 + 's all',
  })

  $('[data-mq-trigger]').on('click',function() {
    let targetValue = $(this).data('mq-trigger')[0];
    let targetEffect = $(this).data('mq-trigger')[1];
    let targetElement = '[data-mq-target]';
    let activeElement = $(targetElement).filter(function() {
      return $(this).data('mq-target')[0] == targetValue;
    });

    $(this)
      .toggleClass('is-active');
    $('body')
      .toggleClass('is-entire-nav-target');

    if (targetEffect) {
      if (targetEffect == "fade") {
        $(activeElement)
          .stop()
          .fadeToggle(speed)
          .toggleClass('is-visible');
      } else if (targetEffect == "slide") {
        $(activeElement)
          .stop()
          .slideToggle(speed)
          .toggleClass('is-visible');
      }
    } else {
      $(activeElement)
        .stop()
        .toggle()
        .toggleClass('is-visible');
    }

    // if( $(this).hasClass('is-active') ) {
    //   $('.p-index-carousel, .l-main, .p-closing, .l-footer').addClass('fixed');
    // } else {
    //   $('.p-index-carousel, .l-main, .p-closing, .l-footer').removeClass('fixed');
    // }
  });

  let timer = false;
  let windowWidth = window.innerWidth;
  const minSize = {
    xs: 480,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1600,
  }
  let baseWidth;

  $(window).resize(function() {
    if (timer !== false) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      windowWidth = window.innerWidth;
      $('body')
        .removeClass('is-invalid-scroll');

      if ($("[data-mq-trigger][class*='ltXXS']").length) {
        baseWidth = minSize.xs;
      } else if ($("[data-mq-trigger][class*='ltXS']").length) {
        baseWidth = minSize.sm;
      } else if ($("[data-mq-trigger][class*='ltSM']").length) {
        baseWidth = minSize.md;
      } else if ($("[data-mq-trigger][class*='ltMD']").length) {
        baseWidth = minSize.lg;
      } else if ($("[data-mq-trigger][class*='ltLG']").length) {
        baseWidth = minSize.xl;
      } else {
        baseWidth = windowWidth;
      }

      if (windowWidth >= baseWidth) {
        $('[data-mq-trigger]')
          .addClass('is-active');
        $('[data-mq-target]')
          .show()
          .addClass('is-visible');
      } else {
        if ($('body').hasClass('pc')) {
          $('[data-mq-trigger]')
            .removeClass('is-active');
          $('[data-mq-target]')
            .hide()
            .removeClass('is-visible');
        }
      }
    }, 20);

  });

  $('[data-prevent]').on('click',function() {
    $('[data-mq-trigger]').trigger('click');
  });

  if(viewportWith < xsMinSize) {
    $('.l-navigation__link').on('click',function() {
      $('[data-mq-trigger]').trigger('click');
    });
  }

}

module.exports.tabToggle = () => {

  // --------------------
  // タブ切り替え
  // --------------------
  $('[data-tab-trigger]').css({
    'cursor': 'pointer',
    'user-select': 'none',
    'transition': speed * 0.001 + 's all',
  })

  $('[data-tab-target]').each(function(){
    $(this).hide();
  });

  $('[data-tab-target]:first-child').each(function(){
    $(this).show().addClass('is-visible');
  });

  $('[data-tab-trigger]:first-child').each(function(){
    $(this).addClass('is-active');
  });

  $('[data-tab-trigger].is-active').each(function(){
    let targetGroup = $(this).data('tab-trigger')[1];
    if (targetGroup == 'fade') {
      targetGroup = $(this).data('tab-trigger')[2];
    }
    let targetValue = $(this).data('tab-trigger')[0];
    let targetElement = $('[data-tab-target]').filter(function() {
      return $(this).data('tab-target')[1] == targetGroup;
    });
    let activeElement = $(targetElement).filter(function() {
      return $(this).data('tab-target')[0] == targetValue;
    });
    $(this).parent().children('[data-tab-trigger]:first-child').removeClass('is-active');
    $(this).parent().children('[data-tab-trigger]:first-child').removeClass('is-active');
    $(this).addClass('is-active');
    $(targetElement).hide().removeClass('is-visible');
    $(activeElement).show().addClass('is-visible');
  });

  $('[data-tab-trigger]').on('click',function() {
    let targetGroup = $(this).data('tab-trigger')[1];
    let targetEffect = $(this).data('tab-trigger')[2];
    if (targetGroup == 'fade') {
      targetGroup = $(this).data('tab-trigger')[2];
      targetEffect = 'fade';
    }
    let targetValue = $(this).data('tab-trigger')[0];
    let targetElement = $('[data-tab-target]').filter(function() {
      return $(this).data('tab-target')[1] == targetGroup;
    });
    let activeElement = $(targetElement).filter(function() {
      return $(this).data('tab-target')[0] == targetValue;
    });
    let triggerElement = $('[data-tab-trigger]').filter(function() {
      if ($(this).data('tab-trigger')[1] == 'fade') {
        return $(this).data('tab-trigger')[2] == targetGroup;
      } else {
        return $(this).data('tab-trigger')[1] == targetGroup;
      }
    });

    $(triggerElement).removeClass('is-active');
    $(this).addClass('is-active');

    if (targetEffect == 'fade') {
      $.when(
        $(targetElement)
          .fadeOut(speed*.5)
          .removeClass('is-visible')
      ).done(function(){
        $(activeElement)
          .fadeIn(speed*.5)
          .addClass('is-visible');
      });
    } else {
      $(targetElement)
        .hide()
        .removeClass('is-visible');
      $(activeElement)
        .show()
        .addClass('is-visible');
    }
  });
}
