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
        {this.renderAttachment()}
        {this.renderSender()}
      </div>
    );
  },
  renderAttachment: function() {
    var attachments = [];
    this.props.message.attachments.forEach(function(attachment, i) {
      // we're only interested in unread messages, ignore read messages.
      if(this.isInUnreadView() && !attachment.unread) return;

      attachments.push(<Attachment key={attachment.id} attachment={attachment} previousVersionCount={i} />)
    }.bind(this));
    return attachments;
  },
  renderSender: function() {
    if(this.isInUnreadView() && !this.props.message.hasUnreadMessages) return;
    return(<Sender sender={this.props.sender} />);
  },
  isInUnreadView: function() {
    return this.props.view === Constants.UNREAD_MESSAGES_VIEW
  }
});

module.exports = Message;
