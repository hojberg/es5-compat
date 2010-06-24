// ES5 backwards compatible methods
// Implementations are snatches from the best resources around the community
// ** a lot are not possible, but maybe should return so code won't break?? **
(function () {
  
  // --------------------------- Object ---------------------------
  if (typeof Object.create !== "function") {}
  if (typeof Object.defineProperty !== "function") {}
  if (typeof Object.defineProperties !== "function") {}
  if (typeof Object.getPrototypeOf !== "function") {}
  if (typeof Object.keys !== "function") {}
  if (typeof Object.seal !== "function") {}
  if (typeof Object.freeze !== "function") {}
  if (typeof Object.getOwnPropertyDescriptor !== "function") {}
  if (typeof Object.getOwnPropertyNames !== "function") {}

  // --------------------------- Array ---------------------------
  // Array.isArray
  if (typeof Array.isArray !== "function") {
    Array.isArray = function (array) {
      return Object.prototype.toString.call(array) === "[object Array]";
    };
  }  
  
  // Array.prototype.indexOf
  if (typeof Array.prototype.indexOf !== "function") {
    Array.prototype.indexOf = function (elt /*, from*/) {
      var len = this.length,
          from = Number(arguments[1]) || 0;
          
      from = (from < 0) ? Math.ceil(from) : Math.floor(from);
      
      if (from < 0) from += len;
      
      for (; from < len; from++) {
        if (from in this && this[from] === elt) return from;
      }
      return -1;
    };
  }
  
  // Array.prototype.lastIndexOf
  if (typeof Array.prototype.lastIndexOf !== "function") {
    Array.prototype.lastIndexOf = function (elt /*, from*/) {
      var len = this.length,
          from = Number(arguments[1]);
      if (isNaN(from)) {
        from = len - 1;
      }
      else {
        from = (from < 0) ? Math.ceil(from) : Math.floor(from);
        if (from < 0) from += len;
        else if (from >= len) from = len - 1;
      }

      for (; from > -1; from--) {
        if (from in this && this[from] === elt) return from;
      }
      return -1;
    };
  }
  
  // Array.prototype.every
  if (typeof Array.prototype.every !== "function") {
    Array.prototype.every = function (fun /*, thisp*/) {
      if (typeof fun != "function") throw new TypeError();
      var len = this.length, thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this && !fun.call(thisp, this[i], i, this)) return false;
      }
      return true;
    };
  }
  
  // Array.prototype.some
  if (typeof Array.prototype.some !== "function") {
    Array.prototype.some = function (fun /*, thisp*/) {
      if (typeof fun != "function") throw new TypeError();
      var len = this.length, thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this && fun.call(thisp, this[i], i, this)) return true;
      }
      return false;
    };
  }
  
  // Array.prototype.forEach
  if (typeof Array.prototype.forEach !== "function") {
    Array.prototype.forEach = function (fun /*, thisp*/) {
      if (typeof fun != "function") throw new TypeError();
      var len = this.length, thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) fun.call(thisp, this[i], i, this);
      }
    };
  }
  
  if (typeof Array.prototype.map !== "function") {
    Array.prototype.map = function (fun /*, thisp*/) {
      if (typeof fun != "function") throw new TypeError();
      var len = this.length, res = new Array(len), thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) res[i] = fun.call(thisp, this[i], i, this);
      }
      return res;
    };
  }
  
  // Array.prototype.filter
  if (typeof Array.prototype.filter !== "function") {
    Array.prototype.filter = function (fun /*, thisp*/) {
      if (typeof fun != "function") throw new TypeError();
      var len = this.length, res = new Array(), thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in this) {
          var val = this[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, this)) res.push(val);
        }
      }
      return res;
    };
  }
  
  if (typeof Array.prototype.reduce !== "function") {
    Array.prototype.reduce = function (fun /*, initial*/) {  
      if (typeof fun != "function") throw new TypeError();  
      var len = this.length >>> 0, i = 0;  
      
      // no value to return if no initial value and an empty array  
      if (len == 0 && arguments.length == 1) throw new TypeError();  
      
      if (arguments.length >= 2) {  
        var rv = arguments[1];  
      }  
      else {  
        do {  
          if (i in this) {  
            var rv = this[i++];  
            break;  
          }  
          // if array contains no values, no initial value to return  
          if (++i >= len) throw new TypeError();  
        }  
        while (true);  
      }  
      
      for (; i < len; i++) {  
        if (i in this) rv = fun.call(null, rv, this[i], i, this);  
      }
      
      return rv;  
    };
  }
  
  if (typeof Array.prototype.reduceRight !== "function") {
    Array.prototype.reduceRight = function (fun /*, initial*/) {  
      if (typeof fun != "function") throw new TypeError();  
      var len = this.length >>> 0;  

      // no value to return if no initial value, empty array  
      if (len == 0 && arguments.length == 1) throw new TypeError();  

      var i = len - 1;  
      if (arguments.length >= 2) {  
        var rv = arguments[1];  
      }  
      else {  
        do {  
          if (i in this) {  
            var rv = this[i--];  
            break;  
          }  

          // if array contains no values, no initial value to return  
          if (--i < 0) throw new TypeError();  
        }  
        while (true);  
      }  

      for (; i >= 0; i--) {  
        if (i in this) rv = fun.call(null, rv, this[i], i, this);  
      }

      return rv;  
    };
  }
  
  // --------------------------- String ---------------------------
  if (typeof String.prototype.trim !== "function") {
    String.prototype.trim = function () {
    	var	str = this.replace(/^\s\s*/, ''), ws = /\s/, i = str.length;
    	while (ws.test(str.charAt(--i)));
    	return str.slice(0, i + 1);
    };
  }
  
  // --------------------------- Function ---------------------------
  if (typeof Function.prototype.bind !== "function") {}
  
  // --------------------------- Date ---------------------------
  if (typeof Date.toISOString.bind !== "function") {}
  if (typeof Date.now !== "function") {}
  
  // --------------------------- JSON ---------------------------
  if (typeof JSON === "undefined") {
    window.JSON = {};
  }
  
  if (typeof JSON.parse !== "function") {}
  
}());