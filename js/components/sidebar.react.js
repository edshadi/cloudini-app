/** @jsx React.DOM */

var React = require('react')
  , SidebarHeader = require('./sidebar-header.react')
  , Threads = require('./threads.react')
  , Launcher = require('./launcher.react')
  ;

var Sidebar = React.createClass({
  render: function() {
    return (
      <div id="sidebar">
        <SidebarHeader fileStream="INBOX"/>
        <div id="sidebar-body">
          {this.renderAttachments()}
        </div>
      </div>
    );
  },
  renderAttachments: function() {
    var attachments = [];
    Object.keys(this.props.attachments).forEach(function(filename) {
      attachments.push(<Threads key={filename} threads={this.props.attachments[filename]} />);
    }.bind(this));
    return attachments;
  }
});
module.exports = Sidebar;
