```js
function deepClone(target, map = new WeakMap()) {
  let typeCheck = (tar) => Object.prototype.toString.call(tar), res
  if (typeCheck(target) === '[object Object]') {
    res = {}
  } else if (typeCheck(target) === '[object Object]') {
    res = []
  } else {
    // 引用类型只考虑数组和对象，其他如函数暂不考虑
    return target
  }
  // 使用while性能更好
  let forEach = function (array, iteratee) {
    let index = -1
    const length = array.length
    while (++index < length) {
      iteratee(array[index])
    }
    return array
  }

  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, res)
  // Object.keys同样可以作用于数组
  const keys = Object.keys(target)
  forEach(keys, (key) => {
    res[key] = deepClone(target[key], map)
  })
  return res
}
```