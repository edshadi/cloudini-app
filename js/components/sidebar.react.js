/** @jsx React.DOM */

var React = require('react')
  // , Attachments = require('./attachments.react')
  , SidebarHeader = require('./sidebar-header.react')
  , ThreadsBlock = require('./blocks/threads-block.react')
  , Launcher = require('./launcher.react')
  ;

var Sidebar = React.createClass({
  render: function() {
    var attachment = {
      unread: true,
      type: 'pdf',
      name: 'sweet file',
      messageId: 'abcd',
    }
    var sender = {
      name: 'shado@gmail.com',
      avatar: './images/avatar.jpeg',
      on: new Date()
    }
    var message = {
      attachments: [attachment],
      sender: sender
    }
    var subject = {
      text: "GUI toolkit",
      messageCount: 2
    }

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
