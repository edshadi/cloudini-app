/** @jsx React.DOM */
var React = require('react');
var ThreadPerson = require('./thread-person.react');
var AttachmentThread = React.createClass({

  render: function() {
    var people = [];
    Object.keys(this.props.thread).forEach(function(person) {
      if(typeof this.props.thread[person] !== 'object') return;
      people.push(<ThreadPerson key={person} person={this.props.thread[person]} />);
    }.bind(this));
    return (
      <div>
        {people}
        <p>{this.props.thread.subject} On {new Date(this.props.thread.date).toLocaleString()}</p>
      </div>
    );
  }

});

module.exports = AttachmentThread;
