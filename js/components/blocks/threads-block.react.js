/** @jsx React.DOM */
var React = require('react');
var ThreadBlock = require('./thread-block.react');
var ThreadsBlock = React.createClass({
  render: function() {
    return (
      <div className="threads">
        {this.renderThreads()}
      </div>
    );
  },
  renderThreads: function() {
    var threads = [];
    Object.keys(this.props.threads).forEach(function(id) {
      var subject = {
        text: this.props.threads[id].subject,
        messageCount: 4
      }
      Object.keys(this.props.threads[id]).forEach(function(sender) {
        var senderObject = {
          name: sender,
          avatar: './images/avatar.jpeg',
          on: this.props.threads[id].date
        }
        var messages = this.props.threads[id][sender];
        if(typeof messages !== 'object') return;
        threads.push(<ThreadBlock key={id+sender} subject={subject} attachments={messages} sender={senderObject} />)
      }.bind(this));
    }.bind(this))
    return threads;
  }
});

module.exports = ThreadsBlock;
