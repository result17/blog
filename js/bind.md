```js
Function.prototype.bind = function (context, ...args) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    var self = this;

    var fbound = function () {
      self.apply(this instanceof self ? 
        this : 
        context, args.concat(Array.prototype.slice.call(arguments)));
    }

    if (self.prototype) {
      fbound.prototype = Object.create(self.prototype);
    }

    return fbound;
}
```
