# plant.js

```JavaScript
var Plant = require('plant.js');

var browser = new Plant(); // <- You can pass defaults for request. 
browser.get('http://www.theuselessweb.com/')

.then(function($) {
  console.log($('h3').text()); // USELESS
  return browser.follow('a:nth-child(2)'); // <- Follows link with this selector
})

.then(function($) {
  console.log($('.text-holster h1').text()); // SHUT UP& LOOK
  browser.get('http://www.theuselessweb.com/');
})

.then(function($) {
  console.log($('h3').text()); // USELESS
})

.catch(function(e) {
  return console.trace(e);
});

```
