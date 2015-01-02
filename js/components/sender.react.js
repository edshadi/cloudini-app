/** @jsx React.DOM */
var React = require('react')
;

var Sender = React.createClass({
  render: function() {
    var name = this.name();
    return (
      <div className="message-participant">
        <span className="participant-gravatar">
        <img src={this.avatar()} alt={name} />
        </span>
        <span className="participant-name">
          {name}
        </span>
        <span className="message-time"> at {this.on()}</span>
      </div>
    );
  },
  name: function() {
    var name = this.props.sender.name.split("<");
    if(name[0].length > 1) return name[0].split("@")[0];
    if(name[1]) {
      name = name[1].substring(0, name[1].length - 1);
      return name.split("@")[0];
    }
    return ""
  },
  avatar: function() {
    return chrome.extension.getURL(this.props.sender.avatar);
  },
  on: function() {
    return new Date(this.props.sender.on).toLocaleTimeString()
  }

});

module.exports = Sender;
