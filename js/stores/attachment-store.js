var constants = require('../constants/cloudini-constants')
  , deepClone = require('../utils/deep-clone')
  , events = require('events')
  , emitter = new events.EventEmitter()
  , attachmentMaker = require('../makers/attachment-maker')
  , threadMaker = require('../makers/thread-maker')
  , fbCache = require('../cache/firebase-cache')
  , attCache = require('../cache/attachment-cache')
  , _attachments = {}
  , _threads = {}
  , CHANGE_EVENT = 'change'
  ;

var AttachmentStore = {
  attachments: function() {
    return _attachments;
  },
  threads: function() {
    return _threads;
  },
  get: function(options) {
    switch(options.scope) {
      case constants.UNREAD_MESSAGES_VIEW:
        this.allUnread()
        break;
      case constants.ALL_MESSAGES_VIEW:
        this.all({cache: options.cache})
        break;
      case constants.PREVIOUS_VERSIONS_VIEW:
        this.show({attachmentName: options.attachmentName, cache: options.cache})
        break;
      default:
        this.all({cache: options.cache})
    }
  },
  all: function(options) {
    if(options.cache) return this.fromCache();
    attachmentMaker.create(fbCache.raw.users.edshadi.theads);
    _attachments = attachmentMaker.attachments;
    this.cacheThreads();
    this.emit(CHANGE_EVENT);
  },
  show: function(options) {
    console.log(options.attachmentName);
    _attachments = {};
    _attachments[options.attachmentName] = attCache[options.attachmentName];
    this.emit(CHANGE_EVENT);
  },
  allUnread: function() {
    var unread = Object.keys(attCache).filter(function(name) {
      return attCache[name].unreadMessageCount > 0
    });
    unread.forEach(function(attachmentName) {
      _attachments[attachmentName] = deepClone(attCache[attachmentName]);
      Object.keys(_attachments[attachmentName].threads).forEach(function(threadId) {
        if(_attachments[attachmentName].threads[threadId].unreadMessageCount === 0) {
          delete _attachments[attachmentName].threads[threadId];
          return;
        }
        Object.keys(_attachments[attachmentName].threads[threadId].messages).forEach(function(name) {
          if(_attachments[attachmentName].threads[threadId].messages[name].unreadMessageCount === 0) {
            delete _attachments[attachmentName].threads[threadId].messages[name];
            return;
          }
          _attachments[attachmentName].threads[threadId].messages[name].attachments = _attachments[attachmentName].threads[threadId].messages[name].attachments.filter(function(att) {
            return att.unread;
          })
        })
      })
    });
    this.cacheThreads();
    this.emit(CHANGE_EVENT);
  },
  cacheThreads: function() {
    Object.keys(attCache).forEach(function(key){
      Object.keys(attCache[key].threads).forEach(function(threadId) {
        _threads[threadId] = attCache[key].threads[threadId];
      })
    }.bind(this))
  },
  fromCache: function() {
    _attachments = attCache;
    this.emit(CHANGE_EVENT);
  },
  allAttachments: function() {
    return _attachments;
  },
  onChangeEvent: function(callback) {
    this.on(CHANGE_EVENT, callback)
  },
  cacheToFile: function(filename) {
    this.all()
    var fs = require('fs')
    fs.writeFile('/Users/shadi/Development/Github/cloudini-extension/cloudini-app/js/cache/'+filename, "module.exports = "+JSON.stringify(this.attachments(),  null, 2), function(err) {
      console.log(err)
    }.bind(this))
  },
  on: emitter.on,
  emit: emitter.emit
};

module.exports = AttachmentStore;
try {
  window.AttachmentStore = AttachmentStore;
} catch(e) {
  AttachmentMaker
}
