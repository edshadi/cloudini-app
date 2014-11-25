/** @jsx React.DOM */
var React = require('react');
var AttachmentBlock = require('./attachment-block.react');
var SenderBlock = require('./sender-block.react');
var MessageBlock = React.createClass({

  render: function() {
    return (
      <div className="message-block">
        {this.renderAttachmentBlocks()}
        <SenderBlock sender={this.props.sender} />
      </div>
    );
  },
  renderAttachmentBlocks: function() {
    var attachments = [];
    this.props.attachments.forEach(function(attachment) {
      attachments.push(<AttachmentBlock attachment={attachment} />)
    }.bind(this));
    return attachments;
  }
});

module.exports = MessageBlock;
