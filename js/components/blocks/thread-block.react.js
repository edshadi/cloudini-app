/** @jsx React.DOM */
var React = require('react');
var MessageBlock = require('./message-block.react');
var SubjectBlock = require('./subject-block.react');
var ThreadBlock = React.createClass({
  render: function() {
    return (
      <div className="thread">
        <MessageBlock attachments={this.props.attachments} sender={this.props.sender} />
        <SubjectBlock subject={this.props.subject} />
      </div>
    );
  }
});

module.exports = ThreadBlock;
