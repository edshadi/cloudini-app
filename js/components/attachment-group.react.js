/** @jsx React.DOM */
var React = require('react');
var AttachmentStore = require('../stores/attachment-store');
var AttachmentFile = require('./attachment-file.react');
var AttachmentGroup = React.createClass({
  render: function() {
    return (
      <div>
        {this.renderAttachments()}
      </div>
    );
  },
  renderAttachments: function() {
    var attachments = [];
    Object.keys(this.props.attachments).forEach(function(name) {
      attachments.push(<AttachmentFile threads={this.props.attachments[name]} />);
    }.bind(this))
    return attachments;
  }

});

module.exports = AttachmentGroup;
