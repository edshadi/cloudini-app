/** @jsx React.DOM */
var React = require('react');
var AttachmentThread = require('./attachment-thread.react');
var AttachmentFile = React.createClass({

  render: function() {
    return (
      <div>
        <h3>{this.props.name}</h3>
        {this.renderThreads()}
      </div>
    );
  },
  renderThreads: function() {
    var threads = [];
    this.props.threads.forEach(function(thread) {
      threads.push(<AttachmentThread thread={thread} />)
    })
    return threads;
  }

});

module.exports = AttachmentFile;
