/** @jsx React.DOM */
var React = require('react');
var ThreadBlock = require('./thread-block.react');
var ThreadsBlock = React.createClass({
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
      var subject = {
        text: this.props.threads[id].subject,
        messageCount: 4
      }
      threads.push(<ThreadBlock key={id} subject={subject} attachments={this.props.threads[id].messages} />)
    }.bind(this))
    return threads;
  }
});

module.exports = ThreadsBlock;
