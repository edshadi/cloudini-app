/** @jsx React.DOM */
var React = require('react');
var AttachmentThread = require('./attachment-thread.react');
var AttachmentFile = React.createClass({

  render: function() {
    return (
      <div>
        <i>{this.props.name}</i>
        {this.renderThreads()}
        <hr />
      </div>
    );
  },
  renderThreads: function() {
    var threads = [];
    Object.keys(this.props.threads).forEach(function(threadId) {
      threads.push(<AttachmentThread key={threadId} thread={this.props.threads[threadId]} />)
    }.bind(this));
    return threads;
  }

});

module.exports = AttachmentFile;
