/** @jsx React.DOM */
var React = require('react')
  , Attachment = require('./attachment.react')
  , Constants = require('../constants/cloudini-constants')
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
      // we're only interested in unread messages, ignore read messages.
      if(this.isInUnreadView() && !attachment.unread) return;

      attachments.push(<Attachment key={attachment.id} attachment={attachment} previousVersionCount={i} />)
    }.bind(this));
    return attachments;
  },
  isInUnreadView: function() {
    return this.props.view === Constants.UNREAD_MESSAGES_VIEW
  }
});

module.exports = Message;
