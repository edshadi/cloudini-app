/** @jsx React.DOM */
var React = require('react')
    , Constants = require('../constants/cloudini-constants')
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
          <li><a onClick={this.switchView} data-view={Constants.UNREAD_MESSAGES_VIEW} href="#">Unread Messages</a></li>
          <li><a onClick={this.switchView} data-view={Constants.ALL_MESSAGES_VIEW} href="#">All Messages</a></li>
        </ul>
      </div>
    );
  },
  showMenu: function() {
    this.setState({ hidden: !this.state.hidden })
  },
  switchView: function(e) {
    e.preventDefault();
    // this is the event handler passed down from parent
    this.props.viewSwitcher(e.target.dataset.view);
    this.setState({ hidden: true });
  }
});

module.exports = Menu;
