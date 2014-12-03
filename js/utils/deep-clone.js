var deepClone = function(obj) {
  var r,
      i = 0,
      len = obj.length;

  if ( typeof obj !== "object" ) { // string, number, boolean
      r = obj;
  } else if ( len ) { // Simple check for array
      r = [];
      for ( ; i < len; i++ ) {
          r.push( deepClone(obj[i]) );
      }
  } else if ( obj.getTime ) { // Simple check for date
      r = new Date( +obj );
  } else if ( obj.nodeName ) { // Simple check for DOM node
      r = obj;
  } else { // Object
      r = {};
      for ( i in obj ) {
          r[i] = deepClone(obj[i]);
      }
  }
  return r;
}
module.exports = deepClone;
