// ------------------------------
// ブラウザ判定
// ------------------------------

// ua判定
let
  uaObj = {
    uaDevice: false, // PC or モバイル
    uaDeviceOS: false, // iOS or Android
    uaBrouser: false, // ブラウザの種類
    pixelRatio: 1
  }

const
  userAgent = navigator.userAgent.toLowerCase(),
  appVersion = navigator.appVersion.toLowerCase()

module.exports.identification = () => {

  // デバイス判定
  if(userAgent.indexOf('iPad') > 0 ||
    userAgent.indexOf('Kindle') > 0 ||
    userAgent.indexOf('Silk') > 0) {
    uaObj.uaDevice = 'tablet';
    $('body').addClass('tablet');
  } else if (userAgent.indexOf('android') > 0 &&
    userAgent.indexOf('Mobile') != -1) {
    uaObj.uaDevice = 'tablet';
    $('body').addClass('tablet');
  } else if (userAgent.indexOf('iphone') > 0 ||
    userAgent.indexOf('ipod') > 0) {
    uaObj.uaDevice = 'mobile';
    $('body').addClass('mobile');
  } else if (userAgent.indexOf('android') > 0 ||
    userAgent.indexOf('Blackberry') > 0) {
    uaObj.uaDevice = 'mobile';
    $('body').addClass('mobile');
  } else {
    $('body').addClass('pc');
  }
  // デバイスOS判定
  if (userAgent.indexOf('iphone') > 0 ||
    userAgent.indexOf('ipod') > 0 ||
    userAgent.indexOf('iPad') > 0) {
    uaObj.uaDeviceOS = 'ios';
    $('body').addClass('ios');
  } else if (userAgent.indexOf('android') > 0) {
    uaObj.uaDeviceOS = 'android';
    $('body').addClass('android');
  }
  // ブラウザ判定
  if (userAgent.indexOf('opera') != -1) {
    uaObj.uaBrouser = 'opera';
    $('body').addClass('opera');
  } else if (userAgent.indexOf("msie") != -1) {
    $('body').addClass('msie');
    if (appVersion.indexOf("msie 6.") != -1) {
      uaObj.uaBrouser = 'ie6';
      $('body').addClass('ie6');
    } else if (appVersion.indexOf("msie 7.") != -1) {
      uaObj.uaBrouser = 'ie7';
      $('body').addClass('ie7');
    } else if (appVersion.indexOf("msie 8.") != -1) {
      uaObj.uaBrouser = 'ie8';
      $('body').addClass('ie8');
    } else if (appVersion.indexOf("msie 9.") != -1) {
      uaObj.uaBrouser = 'ie9';
      $('body').addClass('ie9');
    } else if (appVersion.indexOf("msie 10.") != -1) {
      uaObj.uaBrouser = 'ie10';
      $('body').addClass('ie10');
    } else {
      uaObj.uaBrouser = 'ie';
      $('body').addClass('ie');
    }
  } else if (userAgent.indexOf('trident') != -1) {
    uaObj.uaBrouser = 'ie11';
    $('body').addClass('msie').addClass('ie11');
  } else if (userAgent.indexOf('edge') != -1) {
    uaObj.uaBrouser = 'edge';
    $('body').addClass('edge');
  } else if (userAgent.indexOf('chrome') != -1) {
    uaObj.uaBrouser = 'chrome';
    $('body').addClass('chrome');
  } else if (userAgent.indexOf('safari') != -1) {
    uaObj.uaBrouser = 'safari';
    $('body').addClass('safari');
  } else if (userAgent.indexOf('firefox') != -1) {
    uaObj.uaBrouser = 'firefox';
    $('body').addClass('firefox');
  } else if (userAgent.indexOf('gecko') != -1) {
    uaObj.uaBrouser = 'gecko';
    $('body').addClass('gecko');
  } else {
    uaObj.uaBrouser = false;
  }
}

module.exports.checkDisplay = () => {

  // ピクセルラティオ判定
  uaObj.pixelRatio = window.devicePixelRatio;
  if (uaObj.pixelRatio < 2) {
    $('body').addClass('pixelRatio-1');
  } else if (uaObj.pixelRatio < 3) {
    $('body').addClass('pixelRatio-2');
  } else if (uaObj.pixelRatio < 4) {
    $('body').addClass('pixelRatio-3');
  } else if (uaObj.pixelRatio < 5) {
    $('body').addClass('pixelRatio-4');
  } else if (uaObj.pixelRatio < 6) {
    $('body').addClass('pixelRatio-5');
  } else if (uaObj.pixelRatio < 7) {
    $('body').addClass('pixelRatio-6');
  } else if (uaObj.pixelRatio >= 7) {
    $('body').addClass('pixelRatio-L');
  }
}
