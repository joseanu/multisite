// Module for loading scripts asynchronously in a specific order.

// @private
const _concat = Array.prototype.concat;
const _noop = function() {};

let _scripts = [],
    _afterLoad = _noop,
    _onComplete = _noop;
    
// @private
let reduceRepeated = () =>
  _scripts
    // sorting strings is case sensitive.
    .sort((a, b) => a.toLowerCase() - b.toLowerCase())
    .reduce((uniques, item) => {
      // slice keeps reference when item is an object/array
      let last = uniques.slice(-1)[0];
      if (last !== item) uniques.push(item);
      return uniques;
    }, _scripts.slice(0, 1)); //initial value for @uniques

// @private
function createScriptTag() {
  // gets the first script in the list
  let script = _scripts.shift();
  if (!script) {
    // all scripts were loaded
    return _onComplete();
  }
  let js = document.createElement('script');
  js.type = 'text/javascript';
  js.src = script;
  js.defer = true;
  js.onload = (event) => {
    _afterLoad(script);
    // loads the next script
    createScriptTag();
  };
  let s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(js, s);
}

let loader = {
  addScript: function (src) {
    if (src instanceof Array) {
      _scripts = _concat.apply(_scripts, src);
    }
    else {
      _scripts.push(src);
    }
    return loader;
  },

  load: function () {
    // prevent duplicated scripts
    _scripts = reduceRepeated();
    createScriptTag();
  },

  reset: function reset() {
    _scripts.length = 0;
    _onComplete = _afterLoad = _noop;
    return loader;
  },

  afterLoad: function (fn) {
    if (fn instanceof Function) {
      _afterLoad = fn;
    }
    return loader;
  },

  onComplete: function onComplete(fn) {
    if (fn instanceof Function) {
      _onComplete = fn;
    }
    return loader;
  }
}

export default loader;