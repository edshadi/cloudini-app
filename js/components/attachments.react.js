/** @jsx React.DOM */
var React = require('react');
var AttachmentStore = require('../stores/attachment-store');
var Attachment = require('./attachment.react');
var Attachments = React.createClass({
  render: function() {
    return (
      <div className="attachment-group">
        {this.renderAttachments()}
      </div>
    );
  },
  renderAttachments: function() {
    var attachments = [];
    Object.keys(this.props.attachments).forEach(function(name) {
      attachments.push(<Attachment threads={this.props.attachments[name]} />);
    }.bind(this))
    return attachments;
  }

});

module.exports = AttachmentGroup;
