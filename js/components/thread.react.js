/** @jsx React.DOM */
var React = require('react')
  , Message = require('./message.react')
  , Subject = require('./subject.react')
  ;

var Thread = React.createClass({
  render: function() {
    return (
      <div className="thread">
        {this.renderMessages()}
        <Subject subject={this.props.subject} />
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
      messages.push(<Message key={sender} message={this.props.attachments[sender]} sender={senderObject} view={this.props.view} />)
    }.bind(this));
    return messages;
  }
});

module.exports = Thread;
