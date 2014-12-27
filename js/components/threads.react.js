/** @jsx React.DOM */
var React = require('react')
  , Thread = require('./thread.react')
  , Constants = require('../constants/cloudini-constants')
  ;

var Threads = React.createClass({
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
      var thread = this.props.threads[id];
      var messages = thread.messages;
      var subject = {
        text: thread.subject,
        messageCount: thread.unreadMessageCount
      }
      threads.push(<Thread key={id} date={thread.date} subject={subject} messages={messages} />)
    }.bind(this));
    return threads;
  }
});

module.exports = Threads;
