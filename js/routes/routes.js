/** @jsx React.DOM */
var Sidebar = require('../components/sidebar.react')
  , React = require('react')
  , constants = require('../constants/cloudini-constants')
  , Router = require('./router')
  ;
var Routes = (function() {
  var _unreadMessages = function() {
    React.unmountComponentAtNode(document.getElementsByClassName('cloudini-container')[0]);
    React.renderComponent(<Sidebar options={{scope: constants.UNREAD_MESSAGES_VIEW}} />, document.getElementsByClassName('cloudini-container')[0]);
  };
  var _allMessages = function() {
    React.unmountComponentAtNode(document.getElementsByClassName('cloudini-container')[0]);
    React.renderComponent(<Sidebar options={{scope: constants.ALL_MESSAGES_VIEW}} />, document.getElementsByClassName('cloudini-container')[0]);
  };
  var _showPreviousVersions = function(attachmentName) {
    React.unmountComponentAtNode(document.getElementsByClassName('cloudini-container')[0]);
    React.renderComponent(<Sidebar options={{scope: constants.PREVIOUS_VERSIONS_VIEW, attachmentName: attachmentName}} />, document.getElementsByClassName('cloudini-container')[0]);
  };
  Router.routes = {
    '': _unreadMessages
  }
  Router.routes[constants.ALL_MESSAGES_VIEW] = _allMessages
  Router.routes[constants.UNREAD_MESSAGES_VIEW] = _unreadMessages
  Router.routes[constants.PREVIOUS_VERSIONS_VIEW] = _showPreviousVersions
}())

module.exports = Routes;
