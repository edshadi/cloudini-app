/** @jsx React.DOM */
var React = require('react')
    , Constants = require('../constants/cloudini-constants')
    ;

var Menu = React.createClass({
  getInitialState: function() {
    return {
      content: 'hidden'
    }
  },
  render: function() {
    return (
      <div id="menu">
        <img src="./images/cloudini-menu-icon.png" alt="Menu" className="menu-icon" onClick={this.showMenu}/>
        <div id="menu-content" className={this.state.content}>
          Show files from
          <ul>
            <li><a href="#">Me</a></li>
            <li><a href="#">Everyone</a></li>
            <li></li>
          </ul>
          <hr/>
          <ul>
            <li><a onClick={this.props.viewSwitcher} data-view={Constants.UNREAD_MESSAGES_VIEW} href="#">Unread Messages</a></li>
            <li><a onClick={this.props.viewSwitcher} data-view={Constants.ALL_MESSAGES_VIEW} href="#">All Messages</a></li>
          </ul>


        </div>
      </div>
    );
  },

  showMenu: function() {
    var contentState = this.state.content === 'hidden' ? null : 'hidden';
    this.setState({
      content: contentState
    })
  }
});

module.exports = Menu;
