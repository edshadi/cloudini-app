/**
 * @jsx React.DOM
 */

var React = require('react')
  , Sidebar = require('./sidebar.react')
  , Launcher = require('./launcher.react')
  ;

var Cloudini = React.createClass({
  getInitialState: function() {
    return {
      hidden: false
    }
  },
  render: function() {
    return (
      <div className="cloudini-container">
        {this.renderSidebar()}
      </div>
    );
  },
  renderLauncher: function() {
    return(<Launcher label="+ C" handleClick={this.showSidebar} />)
  },
  renderSidebar: function() {
    return(<Sidebar hideSidebar={this.showSidebar}/>);
  },
  showSidebar: function(e) {
    e.preventDefault();
    this.setState({ hidden: !this.state.hidden });
  }

});

module.exports = Cloudini;
