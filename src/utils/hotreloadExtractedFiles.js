// Enable hotreload for extracted css files
// See: https://github.com/webpack/extract-text-webpack-plugin/issues/30#issuecomment-219852782

const cssFileName = 'main.css';
const originalCallback = window.webpackHotUpdate;

window.webpackHotUpdate = function (...args) {
  const links = document.getElementsByTagName("link");
  for (var i = 0; i < links.length; i++) {
    const link = links[i];
    if (link.href.search(cssFileName) !== -1) {
      let linkHref = link.href;
      link.href = 'about:blank';
      link.href = linkHref;
      originalCallback(...args);
      return;
    }
  }
};
