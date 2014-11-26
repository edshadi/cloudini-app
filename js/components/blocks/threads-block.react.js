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
      var messages = this.props.threads[id].messages;
      var subject = {
        text: this.props.threads[id].subject,
        messageCount: Object.keys(messages).length
      }
      threads.push(<ThreadBlock key={id} date={this.props.threads[id].date} subject={subject} attachments={messages} />)
    }.bind(this))
    return threads;
  }
});

module.exports = ThreadsBlock;
