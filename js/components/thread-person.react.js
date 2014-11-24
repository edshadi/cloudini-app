/** @jsx React.DOM */
var React = require('react');

var ThreadPerson = React.createClass({

  render: function() {
    var attachments = [];
    this.props.person.forEach(function(attachment) {
      attachments.push(<div><h3>{attachment.filename}</h3>{attachment.unread ? "NEW" : "OLD"}</div>);
    }.bind(this));
    return (
      <div>
        {attachments}
        <i>{this.props.key}</i>
      </div>
    );
  }

});

module.exports = ThreadPerson;
