/** @jsx React.DOM */

var React = require('react')
  , AttachmentStore = require('../stores/attachment-store')
  , constants = require('../constants/cloudini-constants')
  , SidebarHeader = require('./sidebar-header.react')
  , Threads = require('./threads.react')
  , Launcher = require('./launcher.react')
  ;

var Sidebar = React.createClass({
  getInitialState: function() {
    return {
      scope: this.props.options.scope,
      attachments: {}
    };
  },
  componentDidMount: function() {
    AttachmentStore.onChangeEvent(function() {
      if(this.isMounted()) this.setState({ attachments: AttachmentStore.attachments() })
    }.bind(this));
    AttachmentStore.get({scope: this.state.scope, attachmentName: this.props.options.attachmentName});
  },
  render: function() {
    var gmail = require('../vendor/gmail')
    gmail.observe.on('view_thread', function(obj) {
      console.log('view_thread', obj);
    });
    // now we have access to the sub observers view_email and load_email_menu
    gmail.observe.on('view_email', function(obj) {
      console.log('view_email', obj);
    });

    return (
      <div id="sidebar">
        <SidebarHeader fileStream="INBOX" />
        <div id="sidebar-body">
          {this.renderAttachments()}
        </div>
      </div>
    );
  },
  renderAttachments: function() {
    var attachments = [];
    Object.keys(this.state.attachments).forEach(function(filename) {
      if(this.isInUnreadView() && this.state.attachments[filename].unreadMessageCount === 0) return;
      attachments.push(<Threads key={filename} threads={this.state.attachments[filename].threads} />);
    }.bind(this));
    return attachments;
  },
  switchView: function(view) {
    AttachmentStore.get(view);
    this.setState(view);
  },
  isInUnreadView: function() {
    return this.state.scope === constants.UNREAD_MESSAGES_VIEW
  }
});
module.exports = Sidebar;
