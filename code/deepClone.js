function deepClone(obj, map = new WeakMap()) {
  const typeCheck = item => Object.prototype.toString.call(item), type = typeCheck(obj)
  let res = null
  
  if (type === '[object Array]') {
    res = []
  } else if (typeC === '[object Object]') {
    res = {}
  } else {
    return obj
  }

  const forEach = (ary, iterator) => {
    let index = -1, length = ary.length
    while (++index < length) {
      iterator(ary[index])
    }
  }

  if (map.get(obj)) {
    return map.get(obj)
  }
  map.set(obj, res)
  forEach(Object.keys(obj), (key) => {
    res[key] = deepClone(obj[key], map)
  })
  return res
}