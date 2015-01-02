/** @jsx React.DOM */
var React = require('react')
;

var Subject = React.createClass({

  render: function() {
    var envelopIcon = chrome.extension.getURL("./images/cloudini-envelope.png");
    return (
      <div className="thread">
        <ul className="thread-data">
          <li className="message-envelop">
            <img src={envelopIcon} className="envelope" alt="message" /></li>
          <li className="message-title">{this.shortenSubject()}</li>
          <li className="message-count"><span>{this.props.subject.messageCount}</span></li>
        </ul>
      </div>
    );
  },
  shortenSubject: function(n) {
    var n = n || 24;
    var subject = this.props.subject.text;
    return subject.length > n ? subject.substr(0, n-1)+'...' : subject;
  }
});

module.exports = Subject;
