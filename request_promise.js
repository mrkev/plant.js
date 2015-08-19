'use strict';

/**
 * Request promise as promised
 */

var request = require('request');

/**
 * Promiseification of requst. Callback is now a .then
 * @param  {Object} options Standard request options object
 * @return {Promise}        Resolves to request body.
 */
function rp (options) {
  return new Promise(function (res, rej) {
    request(options, function(error, response, body) {
      if (error) rej(error);
      res(body, response);
    });
  });
}

/**
 * Returns a function that sets a default request.method
 * if no method is provided in options.
 */
function verb (verb) {
  var method = verb === 'del' ? 'DELETE' : verb.toUpperCase()
  return function (options) {
    if (!options.method) options.method = method;
    return rp(options)
  }
}

rp.defaults = request.defaults;
rp.get      = verb('get');
rp.head     = verb('head');
rp.post     = verb('post');
rp.put      = verb('put');
rp.patch    = verb('patch');
rp.del      = verb('del');

module.exports = rp;

/* Test a bit */
if (require.main === module) {
  var r = module.exports.defaults({'baseUrl':'http://redapi-tious.rhcloud.com'});

  r.get('/dining').then(function (body) {
    console.log(body);
  })
}