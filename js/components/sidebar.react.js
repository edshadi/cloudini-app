/** @jsx React.DOM */

var React = require('react')
  , Constants = require('../constants/cloudini-constants')
  , SidebarHeader = require('./sidebar-header.react')
  , Threads = require('./threads.react')
  , Launcher = require('./launcher.react')
  ;

var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      view: Constants.UNREAD_MESSAGES_VIEW
    };
  },
  render: function() {
    return (
      <div id="sidebar">
        <SidebarHeader fileStream="INBOX" viewSwitcher={this.switchView} />
        <div id="sidebar-body">
          {this.renderAttachments()}
        </div>
      </div>
    );
  },
  renderAttachments: function() {
    var attachments = [];
    Object.keys(this.props.attachments).forEach(function(filename) {
      if(this.isInUnreadView() && this.props.attachments[filename].unreadMessageCount === 0) return;
      attachments.push(<Threads key={filename} threads={this.props.attachments[filename].threads} view={this.state.view}/>);
    }.bind(this));
    return attachments;
  },
  switchView: function(view) {
    this.setState({ view: view });
  },
  isInUnreadView: function() {
    return this.state.view === Constants.UNREAD_MESSAGES_VIEW
  }
});
module.exports = Sidebar;
