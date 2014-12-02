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
      attachments.push(<Threads key={filename} threads={this.props.attachments[filename]} view={this.state.view}/>);
    }.bind(this));
    return attachments;
  },
  switchView: function(e) {
    e.preventDefault();
    this.setState({ view: e.target.dataset.view });
  }
});
module.exports = Sidebar;
