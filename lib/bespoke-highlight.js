var prism = require('prismjs'),
  ghColorsCss = require('prism-themes/themes/prism-ghcolors.css'),
  insertCss = require('insert-css');
require('prismjs/plugins/unescaped-markup/prism-unescaped-markup');
require('prismjs/plugins/normalize-whitespace/prism-normalize-whitespace');

module.exports = function() {
  insertCss(ghColorsCss, { prepend: true });
  return function() {
    prism.highlightAll();
  };
};
