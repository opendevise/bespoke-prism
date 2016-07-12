var insertCss = require('insert-css'),
  ghColorsCss = require('prism-themes/themes/prism-ghcolors.css');

module.exports = function() {
  // prismjs directly tries to highlight source code examples once you require it
  // that's why we cannot require it at module top level
  var Prism = require('prismjs');
  require('prismjs/plugins/unescaped-markup/prism-unescaped-markup');
  require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');
  insertCss(ghColorsCss, { prepend: true });

  return function() {
    Prism.highlightAll();
  };
};
