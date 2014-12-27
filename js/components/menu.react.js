/** @jsx React.DOM */
var React = require('react')
    , constants = require('../constants/cloudini-constants')
    , Router = require('../routes/router');
    ;

var Menu = React.createClass({
  getInitialState: function() {
    return {
      hidden: true
    }
  },
  render: function() {
    return (
      <div id="menu">
        <img src="./images/cloudini-menu-icon.png" alt="Menu" className="menu-icon" onClick={this.showMenu}/>
        {this.renderContent()}
      </div>
    );
  },
  renderContent: function() {
    if(this.state.hidden) return;
    return (
      <div id="menu-content">
        Show files from
        <ul>
          <li><a href="#">Me</a></li>
          <li><a href="#">Everyone</a></li>
          <li></li>
        </ul>
        <hr/>
        <ul>
          <li><a onClick={this.switchView} href={"#"+constants.UNREAD_MESSAGES_VIEW}>Unread Messages</a></li>
          <li><a onClick={this.switchView} data-view={constants.ALL_MESSAGES_VIEW} href={"#"+constants.ALL_MESSAGES_VIEW}>All Messages</a></li>
        </ul>
      </div>
    );
  },
  showMenu: function() {
    this.setState({ hidden: !this.state.hidden })
  },
  switchView: function(e) {
    e.preventDefault();
    Router.triggerLocationChange({location: e.target.hash});
  }
});

module.exports = Menu;
