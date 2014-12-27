var events = require('events')
  , emitter = new events.EventEmitter()
  ;

var Router = (function() {
  var _isFunction = function(object) {
    return object && typeof(object) == 'function';
  }
  var LOCATION_CHANGE = 'location-change';
  return {
    routes: {},
    triggerLocationChange: function(data) {
      this.route(data.location)
    },
    onLocationChange: function(callback) {
      this.on(LOCATION_CHANGE, callback);
    },
    route: function(location) {
      // debugger
      var params = this.locationParams(location);
      var locationHandler = this.routes[params[0]];
      if(locationHandler && _isFunction(locationHandler)) return locationHandler(params[1]);
    },
    locationParams: function(location) {
      var params = /(\w+)\/?(\S*)$/.exec(location);
      if(!params) return [""];
      return [params[1], params[2]];
    }
  }
}());

module.exports = Router;
