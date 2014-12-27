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
      attachments.push(<Attachment key={attachment.id} attachment={attachment} />)
    }.bind(this));
    return attachments;
  },
  renderSender: function() {
    return(<Sender sender={this.props.sender} />);
  }
});

module.exports = Message;
