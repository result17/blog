Function.prototype.myBind = function (thisArg, ...args) {
  if (typeof this !== 'function') return;
  const context = this
  function fBound() {
    context.apply(this instanceof context ? context : thisArg, Array.prototype.slice.call(arguments))
  }
  if (context.prototype) {
    fBound.prototype = Object.create(context.prototype)
  }
  return fBound
}

function log1(text) { console.log(1, text) }
log1.prototype.n = 1
log1.myBind(null, 'text')