// function maxStep(N, K) {
//   var sub = (((Math.sqrt(1 + 8 * K) - 1) / 2 ) % 1 > 0) ? 0 : 1;
//   console.log(N * (N + 1)/2 - sub);
// }

// maxStep(2,2)

// B is longer
function similarity(a, b) {
    var i = 0;
    while (i < b.length) {
        if (a.charAt(i) != b.charAt(i)) return i;
        i++;
    }
    return i;
}

function StringSimilarity(inputs) {
    var result = inputs.map(function(x) {
        var i = 0, res = 0;
        while (i <= x.length) {
            res += similarity(x.slice(i), x);
            i++;
        }
        return res;
    })
    .map(function (x) {console.log(x);});
    return result;
}


// StringSimilarity(['hello', 'aa']);


var Plant = require('./Plant.js');

var browser = new Plant(); // <- You can pass defaults for request. 
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