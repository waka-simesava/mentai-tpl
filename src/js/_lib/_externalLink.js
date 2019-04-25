// ------------------------------
// External Links
// ------------------------------

const links = document.links;

module.exports.externalLink = () => {
  for (let i = 0, linksLength = links.length; i < linksLength; i++) {
    if (links[i].hostname != window.location.hostname) {
      links[i].target = '_blank'
      links[i].rel = 'noopener noreferrer'
    }
  }
}

module.exports.windowOpen = () => {
  $('.js-window-open').each(() => {
    let href = $(this).attr('href');
    $(this).attr('href','javascript:void(0)');
    let value = "window.open('";
    value += href;
    value += "', 'mywindow5', 'width=700, height=500, menubar=no, toolbar=no, scrollbars=yes')";
    $(this).attr("onclick",value);
    $(this).removeAttr('target');
  });
}
