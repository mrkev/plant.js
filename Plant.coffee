
rp      = (require './request_promise')
cheerio = (require 'cheerio')

class Plant

  verbs = ['get', 'head', 'post', 'put', 'patch', 'del']

  constructor : (@options) ->
    @r = rp.defaults(@options)
    @$ = null
    
    # verbs.forEach (verb) ->
    #   @[verb] = r[verb]

  check_state : (state) -> switch state
    when 'doc'
      throw new Error('No website has been loaded!') if not @$

  ##
  # Follows a link in the current document.
  follow : (selector) ->
    @check_state 'doc'
    link = @$(selector).attr('href')
    throw new Error "No link with selector #{selector}" if not link
    return (@get link)

  ##
  # @return Promise to cheerio instance resolved by browser
  get : (opts) ->
    @r.get(opts)
      .then (body) =>
        @$ = cheerio.load(body)
        return @$

module.exports = Plant


if require.main is module
  browser = new Plant()

  browser
    .get 'http://www.theuselessweb.com/'
    .then ($) ->
      console.log $('h3').text() # -> USELESS
      return (browser.follow 'a:nth-child(2)')
    .then ($) ->
      console.log $('.text-holster h1').text() # SHUT UP& LOOK

    .catch (e) -> console.trace e