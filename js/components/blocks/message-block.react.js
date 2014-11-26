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
    this.props.attachments.forEach(function(attachment, i) {
      attachments.push(<AttachmentBlock attachment={attachment} previousVersionCount={i} />)
    }.bind(this));
    return attachments;
  }
});

module.exports = MessageBlock;
