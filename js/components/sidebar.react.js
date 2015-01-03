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
    this.observerGmail();
  },
  render: function() {
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
      attachments.push(<Threads key={filename} threads={this.state.attachments[filename].threads} />);
    }.bind(this));
    return attachments;
  },
  switchView: function(view) {
    AttachmentStore.get(view);
    this.setState(view);
  },
  observerGmail: function() {
    var gmail = require('../vendor/gmail')
    gmail.observe.on('view_thread', function(obj) {
      this.showThreadMessage(obj)
    }.bind(this));
    gmail.observe.on('view_email', function(obj) {
      this.showThreadMessage(obj)
    }.bind(this));
    window.onhashchange = function (location) {
      if(window.location.hash === "#inbox") {
        this.setState({ attachments: AttachmentStore.attachments() })
      }
    }.bind(this)

  },
  showThreadMessage: function(obj) {
    var attachments = {"no-attachment": {"threads": {}}};
    var id = obj.id || location.hash.split("/")[1]; // in view_thread event, we don't get an id..boo!
    if(!AttachmentStore.threads()[id]) return;
    attachments["no-attachment"]["threads"][id] = AttachmentStore.threads()[id];
    if(this.isMounted()) this.setState({ attachments: attachments })
  }
});
module.exports = Sidebar;
