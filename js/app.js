/** @jsx React.DOM */
var React = require('react')
  , Cloudini = require('./components/cloudini.react')
  , constants = require('./constants/cloudini-constants')
  , cloudiniDiv = document.createElement('div')
  , Router = require('./routes/router')
  ;

cloudiniDiv.setAttribute('id', "cloudini");

window.onload = function() {
  var m = document.createElement('script');
  m.src = chrome.extension.getURL('js/main.js');
  (document.head || document.documentElement).appendChild(m);

  document.body.appendChild(cloudiniDiv);
}

document.addEventListener('Gmail-loaded', function(e) {
  constants.GLOBALS = e.detail;
  React.renderComponent(<Cloudini />, cloudiniDiv);
  Router.triggerLocationChange({location: ''});
});
