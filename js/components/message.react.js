/** @jsx React.DOM */
var React = require('react')
  , Attachment = require('./attachment.react')
  , Sender = require('./sender.react')
  ;

var Message = React.createClass({
  render: function() {
    return (
      <div className="message-block">
        {this.renderAttachmentBlocks()}
        <Sender sender={this.props.sender} />
      </div>
    );
  },
  renderAttachmentBlocks: function() {
    var attachments = [];
    this.props.attachments.forEach(function(attachment, i) {
      attachments.push(<Attachment key={attachment.id} attachment={attachment} previousVersionCount={i} />)
    }.bind(this));
    return attachments;
  }
});

module.exports = Message;
