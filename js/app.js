/** @jsx React.DOM */
// JSON.stringify(groups, null, "  ");
var React = require('react')
  // , Cloudini = require('./components/cloudini.react')
  , AttachmentGroup = require('./components/attachment-group.react')
  ;

var cloudini = document.createElement('div');
cloudini.setAttribute('id', "cloudini");

window.onload = function() {
  document.body.appendChild(cloudini);
  React.renderComponent(<AttachmentGroup />, cloudini);
}