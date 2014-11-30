var constants = require('../constants/constants')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , attachmentMaker = require('../makers/attachment-maker')
  , data = require('../firebase-cache')
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
