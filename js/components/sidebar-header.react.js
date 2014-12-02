/** @jsx React.DOM */
var React = require('react')
  , Menu = require('./menu.react')
  ;

var SidebarHeader = React.createClass({
  render: function() {
    return (
      <div id="sidebar-header">
        <div classNme="stream-name">File Stream: {this.props.fileStream}</div>
        <Menu viewSwitcher={this.props.viewSwitcher} />
      </div>
    );
  }
});

module.exports = SidebarHeader;
