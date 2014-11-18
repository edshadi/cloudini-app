var request = require('browser-request')
  , constants = require('../constants/constants')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , attachmentMaker = require('../attachment-maker')
  , data = require('../../cloudini-extension-export')
  , _attachments = {}
  , CHANGE_EVENT = 'change'
  ;

module.exports = {
  all: function() {
    attachmentMaker.create(data.raw.users.edshadi.theads);
    _attachments = attachmentMaker.attachments;
    this.emit(CHANGE_EVENT);
  },
  attachments: function() {
    return _attachments;
  },
  onChangeEvent: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  on: emitter.on,
  emit: emitter.emit
};
// window.rawData = data.raw.users.edshadi.theads;
// window.threads = [];
// data.users.edshadi.groups.forEach(function(group){ group.threads.forEach(function(t) {window.threads.push(t)}) });
// return _attachments;
