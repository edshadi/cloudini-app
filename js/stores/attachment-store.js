var constants = require('../constants/constants')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , attachmentMaker = require('../makers/attachment-maker')
  , data = require('../firebase-cache')
  , _attachments = {}
  , CHANGE_EVENT = 'change'
  ;

var AttachmentStore = {
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
  cacheToFile: function() {
    this.all()
    var fs = require('fs')
    fs.writeFile('/Users/shadi/Development/Github/cloudini-extension/cloudini-app/js/cache/attachment-cache.js', JSON.stringify(this.attachments(),  null, 2), function(err) {
      console.log(err)
    }.bind(this))
  },
  on: emitter.on,
  emit: emitter.emit
};

module.exports = AttachmentStore;
