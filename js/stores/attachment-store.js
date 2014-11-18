var request = require('browser-request')
  , constants = require('../constants/constants')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , attachmentMaker = require('../attachment-maker')
  , data = require('../../cloudini-extension-export')
  , _attachments = [
    {filename: "proto_1.pdf", status: 'read',  }
  ]
  ;

module.exports = {
  fromCache: function(callback) {
    window.rawData = data.raw.users.edshadi.theads;
    window.threads = [];
    data.users.edshadi.groups.forEach(function(group){ group.threads.forEach(function(t) {window.threads.push(t)}) });
    var groups = [];
    this.emit('change', groups);
  },
  attachments: function() {
    window.rawData = data.raw.users.edshadi.theads;
    window.threads = [];
    data.users.edshadi.groups.forEach(function(group){ group.threads.forEach(function(t) {window.threads.push(t)}) });
    return _attachments;
  },
  on: emitter.on,
  emit: emitter.emit
};
