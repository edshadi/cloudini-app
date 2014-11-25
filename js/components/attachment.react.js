/** @jsx React.DOM */
var React = require('react');
var Thread = require('./thread.react');
var Attachment = React.createClass({

  render: function() {
    return (
      <div>
        {this.renderThreads()}
        <hr />
      </div>
    );
  },
  renderThreads: function() {
    var threads = [];
    Object.keys(this.props.threads).forEach(function(threadId) {
      threads.push(<Thread key={threadId} thread={this.props.threads[threadId]} />)
    }.bind(this));
    return threads;
  }

});

module.exports = AttachmentFile;
