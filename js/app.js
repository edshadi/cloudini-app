/** @jsx React.DOM */
var React = require('react')
  , Cloudini = require('./components/cloudini.react')
  , cloudiniDiv = document.createElement('div')
  ;

cloudiniDiv.setAttribute('id', "cloudini");

window.onload = function() {
  document.body.appendChild(cloudiniDiv);
  React.renderComponent(<Cloudini />, cloudiniDiv);
}
