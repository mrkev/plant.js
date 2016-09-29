
let rp         = require('./request_promise')
let cheerio    = require('cheerio')

class Plant {

  constructor(options) {
    this.options = options;
    this.r = rp.defaults(this.options);
    this.verbs = ['get', 'head', 'post', 'put', 'patch', 'del']

    return this.$ = null;
  }

  check_state(state) { switch (state) {
    case 'doc':
      if (!this.$) { throw new Error('No website has been loaded!') }
  } }

  /** Follows a link in the current document. */
  follow(selector) {
    this.check_state('doc')
    let link = this.$(selector).attr('href')
    if (!link) { throw new Error(`No link with selector ${selector}`) }
    return (this.get(link))
  }

  /** @return Promise to cheerio instance resolved by browser */
  get(opts) {
    return this.r.get(opts)
      .then(body => {
        this.$ = cheerio.load(body)
        return this.$
      }
    )
  }
}

module.exports = Plant;

if (require.main === module) {
  let browser = new Plant();

  browser.get('http://www.theuselessweb.com/')

  .then(function($) {
    console.log($('h3').text()); // USELESS
    return browser.follow('a:nth-child(2)'); // <- Follows link with this selector
  })

  .then(function($) {
    console.log($('.text-holster h1').text()); // SHUT UP& LOOK
    return browser.get('http://www.theuselessweb.com/');
  })

  .then(function($) {
    console.log($('h3').text()); // USELESS
  })

  .catch(function(e) {
    return console.trace(e);
  });
}
