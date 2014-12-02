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
      // we're only interested in unread messages, ignore thread if it has no unread messages
      if(this.props.view === Constants.UNREAD_MESSAGES_VIEW && !thread.hasUnreadMessages) return;

      var messages = thread.messages;
      var subject = {
        text: thread.subject,
        messageCount: Object.keys(messages).length
      }
      threads.push(<Thread key={id} date={thread.date} subject={subject} attachments={messages} view={this.props.view} />)
    }.bind(this))
    return threads;
  }
});

module.exports = Threads;
