/** @jsx React.DOM */
var React = require('react');
var AttachmentStore = require('../stores/attachment-store');

var AttachmentGroup = React.createClass({
  getInitialState: function() {
    return {
      attachments: AttachmentStore.attachments()
    };
  },
  render: function() {
    return (
      <div>

      </div>
    );
  }

});

module.exports = AttachmentGroup;
