
```js
SyntheticEvent.extend = function(Interface) {
  const Super = this;

  const E = function() {};
  E.prototype = Super.prototype;
  const prototype = new E();

  function Class() {
    return Super.apply(this, arguments);
  }
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;

  // Class.Interface = Object.assign({}, Super.Interface, Interface);
  // Class.extend = Super.extend;
  // addEventPoolingTo(Class);

  return Class;
};
```

### 合成时间曾经用过proxy
https://github.com/facebook/react/pull/12207/files