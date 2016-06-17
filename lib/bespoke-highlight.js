var insertCss = require('insert-css');

module.exports = function () {

  var ghColorsCss = require('prism-themes/themes/prism-ghcolors.css');

  return function () {
    insertCss(ghColorsCss, { prepend: true });
    var Prism = require('prismjs');
    require('prismjs/plugins/unescaped-markup/prism-unescaped-markup');
    require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
    Prism.highlightAll();
  };
};
