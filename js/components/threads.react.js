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
      if(this.isInUnreadView() && thread.unreadMessageCount === 0) return;
      var messages = thread.messages;
      var subject = {
        text: thread.subject,
        messageCount: thread.unreadMessageCount
      }
      threads.push(<Thread key={id} date={thread.date} subject={subject} messages={messages} view={this.props.view} viewSwitcher={this.props.viewSwitcher}/>)
    }.bind(this));
    return threads;
  },
  isInUnreadView: function() {
    return this.props.view === Constants.UNREAD_MESSAGES_VIEW
  }
});

module.exports = Threads;
