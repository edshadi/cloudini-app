/** @jsx React.DOM */
var React = require('react');

var AttachmentThread = React.createClass({

  render: function() {
    return (
      <div>
        <h3>{this.props.thread.filename}</h3>
        <p>{this.props.thread.subject}</p>
      </div>
    );
  }

});

module.exports = AttachmentThread;
