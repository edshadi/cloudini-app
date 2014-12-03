require('../vendor/fuzzy-match');
AttachmentMaker = {
  attachments: {},
  threads: [],
  create: function(data) {
    data.forEach(function(t) {
      this.reduceMessages(t.messages)
    }.bind(this))
  },
  reduceMessages: function(messages) {
    messages.forEach(function(message) {
      if(message.payload && message.payload.parts) this.reduceParts(message);
    }.bind(this))
  },
  reduceParts: function(message) {
    message.payload.parts.forEach(function(part) {
      if(part.body.attachmentId && part.filename){
        var appended = this.scoreAndAppendAttachments(message, part);
        // we didn't find a match due to empty attachment list or nothing was appended
        // on the previous step. let's add the file as a new
        if(!appended) this.appendFile(message, part)
      }
    }.bind(this));
  },
  scoreAndAppendAttachments: function(message, part) {
    var appended;
    var attachmentNames = Object.keys(this.attachments);
    if(attachmentNames.length === 0) return;
    attachmentNames.some(function(name) {
      var score = this.compare(name, part.filename);
      //same file, it's most likely a reply
      if(score === 1) return;
      // same file, different version
      if(score >= 0.70) appended = this.appendFile(message, part, name)
    }.bind(this))
    return appended;
  },
  compare: function(name1, name2) {
    var base, version;
    if(name1.length > name2) {
      base = name2;
      version = name1;
    } else {
      base = name1;
      version = name2;
    }
    return version.score(base);
  },
  appendFile: function(message, part, at) {
    var type = this.getFileType(part.filename);
    at = at || part.filename;
    this.attachments[at] = this.attachments[at] || {threads: {}, unreadMessageCount: 0, versionCount: 0};
    this.attachments[at].threads[message.threadId] = this.attachments[at].threads[message.threadId] || {
      unreadMessageCount: 0
    };
    var from = message.payload.headers.filter(function(header) { return header.name === "From" })[0].value;
    this.attachments[at].threads[message.threadId].messages = this.attachments[at].threads[message.threadId].messages || {};
    this.attachments[at].threads[message.threadId].messages[from] = this.attachments[at].threads[message.threadId].messages[from] || {attachments: [], unreadMessageCount: 0};

    ++this.attachments[at].versionCount; // increment the version count on this attachment

    var data = {
      type: type,
      filename: part.filename,
      id: part.body.attachmentId,
      messageId: message.id,
      threadId: message.threadId,
      versionCount: this.attachments[at].versionCount
    }
    message.payload.headers.some(function(header) {
      if(header.name === "From") data.from = header.value;
      if(header.name === "Date") data.date = header.value;
      if(header.name === "Subject") data.subject = header.value;
    }.bind(this));
    // set the thread's data to the latest message
    this.attachments[at].threads[message.threadId].date = data.date;
    this.attachments[at].threads[message.threadId].subject = data.subject;

    data.unread = message.labelIds.filter(function(label) {
      return label === "UNREAD"
    })[0];

    if(data.unread) {
      // this allows us to ask the thread if it has unread messages.
      ++this.attachments[at].unreadMessageCount;
      // this allows us to ask the thread if it has unread messages.
      ++this.attachments[at].threads[message.threadId].unreadMessageCount;
      // this allows us to ask there are unread messages from this user.
      ++this.attachments[at].threads[message.threadId].messages[from].unreadMessageCount;
    }
    this.attachments[at].threads[message.threadId].messages[from].attachments.push(data);
    return true
  },
  threadExists: function(threads, threadId) {
    return threads.filter(function(thread) {
      return thread.threadId === threadId
    }).length > 0;
  },
  getFileType: function(filename) {
    var type = filename.split(".");
    return type[1] ? type[1] : type[0];
  }
}

module.exports = AttachmentMaker;
