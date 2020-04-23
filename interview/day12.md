### 三栏布局

圣杯布局：container（父容器）padding: 0 200px;
left ,right => postion: relative;
left => marigin-left: -100%
right => margin-left: -200px;

双飞翼布局：html反直觉 .middle-container {
  marigin: 0 200px;
}

left => marigin-left: -100%
right => margin-left: -200px;

### @-css属性
@import @keyframe @media

### 解决外边距
不发生折叠的触发因素是浮动元素、inline-block 元素、绝对定位元素

### event loops
window event loop（通常我们讲的都是这个）
worker event loop（每个 worker 线程都有个与之关联的 event loop）
worklet event loop（woklet 是可以访问渲染引擎的线程，我们一般用不到）

### destructuringArray
```js
// ( [1,[2,4],3], "[a,[b],c]" );
// result
// { a:1, b:2, c:3 }
```
```javascript
const destructuringArray = (ary, shape) => {
  let shapeAry
  try {
    shapeAry = JSON.parse(shape.replace(/\w+/g, '"$&"'))
  } catch(e) {
    throw new Error('shape error')
    return 
  }
  const helper = (raw, shapeAry) => {
    let result = {}
    shapeAry.forEach((item, idx) => {
      if (Array.isArray(item)) {
        result = {...helper(raw[idx], item), ...result}
      } else {
        result[item] = raw[idx]
      }
    })
    return result
  }
  return helper(ary, shapeAry)
}
```
重点就是keys.replace(/\w+/g, '"$&"'), JSON.parse()里面的key需要双引号

### Object.create()
Object.create()方法创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。
有两个参数
proto
新创建对象的原型对象。
propertiesObject
可选。如果没有指定为 undefined，则是要添加到新创建对象的不可枚举（默认）属性（即其自身定义的属性，而不是其原型链上的枚举属性）对象的属性描述符以及相应的属性名称。这些属性对应Object.defineProperties()的第二个参数。
```js
// mdn示范的经典寄生组合继承
// Shape - 父类(superclass)
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info('Shape moved.');
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
```
```js
// mdn示范的多继承
function MyClass() {
     SuperClass.call(this);
     OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function() {
     // do a thing
};
```