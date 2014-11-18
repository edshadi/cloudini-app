/**
 * @jsx React.DOM
 */

var React = require('react');
var Sidebar = require('./sidebar.react');
var AttachmentStore = require('../stores/attachment-store');
var Launcher = require('./launcher.react');
var Cloudini = React.createClass({
  getInitialState: function() {
    return {
      groups: {},
      hidden: false
    }
  },

  componentWillMount: function() {
    AttachmentStore.on('change', function(groups) {
      this.setState({
        groups: groups
      })
    }.bind(this))
    AttachmentStore.fromCache();
  },

  render: function() {
    return (
      <div className="cloudini-container">
        {this.state.hidden ? this.renderLauncher() : this.renderSidebar()}
      </div>
    );
  },
  renderLauncher: function() {
    return(<Launcher label="+ C" handleClick={this.showSidebar} />)
  },
  renderSidebar: function() {
    return(<Sidebar groups={this.state.groups} hideSidebar={this.showSidebar}/>);
  },
  showSidebar: function(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  }

});

module.exports = Cloudini;
