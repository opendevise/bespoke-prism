Function.prototype.bind = Function.prototype.bind || require('function-bind');

var bespoke = require('bespoke'),
  highlight = require('../../lib/bespoke-highlight.js');

describe('bespoke-highlight', function() {
  var deck,
    createDeck = function(done) {
      var parent = document.createElement('article'),
        sectionOne = document.createElement('section'),
        sectionTwo = document.createElement('section');

      sectionOne.innerHTML = [
          '<pre><code class="language-javascript">',
          '  function foobar(text) {',
          '    console.log(text):',
          '  }',
          '</code></pre>'
        ].join('\n');

      sectionTwo.innerHTML = [
        '<script type="text/plain" class="lang-markup">',
        '  <div class="foo">',
        '    <!-- comments FTW!! -->',
        '    <p class="message">this <strong>IS</strong> a message!<p>',
        '  </div>',
        '</script>'
      ].join('\n');

      parent.appendChild(sectionOne);
      parent.appendChild(sectionTwo);
      document.body.appendChild(parent);

      deck = bespoke.from(parent, [
        highlight()
      ]);

      // give PrismJS a chance to highlight code
      setTimeout(done, 200)
    };
    destroyDeck = function() {
      deck.fire('destroy');
      var parentNode = deck.parent.parentNode;
      if (parentNode) parentNode.removeChild(deck.parent);
      var inlineStyles = document.head.querySelectorAll('style');
      for (var i = 0; i < inlineStyles.length; i++) {
        document.head.removeChild(inlineStyles[i]);
      }
      deck = null;
    };

  beforeEach(createDeck);
  afterEach(destroyDeck);

  it('should inject PrismJS styles', function() {
    var firstStyleElement = document.head.querySelector('style');
    expect(firstStyleElement.innerHTML).toContain('GHColors theme');
  });

  it('should insert <span>s with PrismJS classes and normalize whitespaces', function() {
    var section = deck.parent.querySelectorAll('section')[0];
    expect(section.innerHTML).toBe([
      '<pre class=" language-javascript"><code class=" language-javascript"><span class="token keyword">function</span> <span class="token function">foobar</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span> <span class="token punctuation">{</span>',
      '  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>text<span class="token punctuation">)</span><span class="token punctuation">:</span>',
      '<span class="token punctuation">}</span></code></pre>'
    ].join('\n'));
  });

  it('should handle unescaped HTML as <script type="text/plain" class="lang-markup">', function() {
    var section = deck.parent.querySelectorAll('section')[1];
    expect(section.innerHTML).toBe([
      '<pre class=" language-markup"><code class=" language-markup"><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>foo<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>',
      '  <span class="token comment" spellcheck="true">&lt;!-- comments FTW!! --&gt;</span>',
      '  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation">=</span><span class="token punctuation">"</span>message<span class="token punctuation">"</span></span><span class="token punctuation">&gt;</span></span>this <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>strong</span><span class="token punctuation">&gt;</span></span>IS<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>strong</span><span class="token punctuation">&gt;</span></span> a message!<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>',
      '<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span></code></pre>'
    ].join('\n'));
  });
});
