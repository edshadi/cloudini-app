var constants = require('../constants/cloudini-constants')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , attachmentMaker = require('../makers/attachment-maker')
  , fbCache = require('../cache/firebase-cache')
  , attCache = require('../cache/attachment-cache')
  , _attachments = {}
  , CHANGE_EVENT = 'change'
  ;

var AttachmentStore = {
  all: function() {
    attachmentMaker.create(fbCache.raw.users.edshadi.theads);
    _attachments = attachmentMaker.attachments;
    this.emit(CHANGE_EVENT);
  },
  fromCache: function() {
    _attachments = attCache;
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
    fs.writeFile('/Users/shadi/Development/Github/cloudini-extension/cloudini-app/js/cache/attachment-cache.js', "module.exports = "+JSON.stringify(this.attachments(),  null, 2), function(err) {
      console.log(err)
    }.bind(this))
  },
  on: emitter.on,
  emit: emitter.emit
};

module.exports = AttachmentStore;
