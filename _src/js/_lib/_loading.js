// ------------------------------
// プリローダー
// ------------------------------

module.exports.preloader = () => {

  let
    img = $('img'),
    imgLength = img.length,
    count = 0

  let loadHide = () => {
    if(imgLength==count){
      $('#preloader').fadeOut(1000)
    }
  }

  while (count < imgLength) {
    img[count].addEventListener('load', loadHide)
    count++
  }
}
