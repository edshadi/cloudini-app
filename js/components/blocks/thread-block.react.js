/** @jsx React.DOM */
var React = require('react');
var MessageBlock = require('./message-block.react');
var SubjectBlock = require('./subject-block.react');
var ThreadBlock = React.createClass({
  render: function() {
    return (
      <div className="thread">
        {this.renderMessages()}
        <SubjectBlock subject={this.props.subject} />
      </div>
    );
  },
  renderMessages: function() {
    var messages = [];
    Object.keys(this.props.attachments).forEach(function(sender) {
      var senderObject = {
        name: sender,
        avatar: './images/avatar.jpeg',
        on: this.props.date
      }
      messages.push(<MessageBlock attachments={this.props.attachments[sender]} sender={senderObject} />)
    }.bind(this));
    return messages;
  }
});

module.exports = ThreadBlock;
