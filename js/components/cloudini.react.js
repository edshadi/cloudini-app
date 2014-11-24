/**
 * @jsx React.DOM
 */

var React = require('react');
var Sidebar = require('./sidebar.react');
var AttachmentStore = require('../stores/attachment-store');
var AttachmentGroup = require('./attachment-group.react');
var Launcher = require('./launcher.react');
var Cloudini = React.createClass({
  getInitialState: function() {
    return {
      attachments: {},
      hidden: false
    }
  },
  componentDidMount: function() {
    AttachmentStore.onChangeEvent(function() {
      if(this.isMounted()) this.setState({ attachments: AttachmentStore.attachments() })
    }.bind(this));
    AttachmentStore.all();
  },
  render: function() {
    return (
      <div className="cloudini-container">
        <AttachmentGroup attachments={this.state.attachments} />
      </div>
    );
  },
  renderLauncher: function() {
    return(<Launcher label="+ C" handleClick={this.showSidebar} />)
  },
  renderSidebar: function() {
    return(<Sidebar attachments={this.state.attachments} hideSidebar={this.showSidebar}/>);
  },
  showSidebar: function(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  }

});

module.exports = Cloudini;
