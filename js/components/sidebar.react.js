/** @jsx React.DOM */

var React = require('react')
  // , Attachments = require('./attachments.react')
  , SidebarHeader = require('./sidebar-header.react')
  , ThreadsBlock = require('./blocks/threads-block.react')
  , Launcher = require('./launcher.react')
  ;

var Sidebar = React.createClass({
  render: function() {
    return (
      <div id="sidebar">
        <Launcher label="- C" handleClick={this.props.hideSidebar} />
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
      attachments.push(<ThreadsBlock key={filename} threads={this.props.attachments[filename]} />)
    }.bind(this));
    return attachments;
  }
});
module.exports = Sidebar;
