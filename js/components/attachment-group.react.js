/** @jsx React.DOM */
var React = require('react');
var AttachmentStore = require('../stores/attachment-store');
var AttachmentFile = require('./attachment-file.react');
var AttachmentGroup = React.createClass({
  getInitialState: function() {
    return {
      attachments: {}
    };
  },
  componentDidMount: function() {
    AttachmentStore.onChangeEvent(function() {
      if(this.isMounted()) this.setState({ attachments: AttachmentStore.attachments() })
    }.bind(this));
    AttachmentStore.all();
  },
  render: function() {
    return (
      <div>
        {this.renderAttachments()}
      </div>
    );
  },
  renderAttachments: function() {
    var attachments = [];
    Object.keys(this.state.attachments).forEach(function(name) {
      attachments.push(<AttachmentFile threads={this.state.attachments[name]} />);
    }.bind(this))
    return attachments;
  }

});

module.exports = AttachmentGroup;
