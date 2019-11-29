```js
var treeObj = {
  id: '0',
  name: '0',
  children:[
      {
          id: '1',
          name:'anc',
          children:[
               {
                  id: '1-1',
                  name:'anc',
                  children:[
                      {
                          id: '1-1-1',
                          name:'anc',
                      },    
                      {
                          id: '1-1-2',
                          name:'anc'
                      },    
                  ]
              },    
              {
                  id: '1-2',
                  name:'anc',
                  children:[
                      {
                          id: '1-2-1',
                          name:'anc',
                      },    
                      {
                          id: '1-2-2',
                          name:'anc'
                      },    
                  ]
              },    
          ]
      },
      {
          id: '2',
          name:'anc',
          children:[
               {
                  id: '2-1',
                  name:'anc',
                  children:[
                      {
                          id: '2-1-1',
                          name:'anc',
                      },    
                      {
                          id: '2-1-2',
                          name:'anc'
                      },    
                  ]
              },    
              {
                  id: '2-2',
                  name:'anc',
                  children:[
                      {
                          id: '2-2-1',
                          name:'anc',
                          children: [
                              {
                                  id: '2-2-1-1',
                                  name:'anc',
                              },    
                              {
                                  id: '2-2-1-2',
                                  name:'anc'
                              },    
                          ]
                      },    
                      {
                          id: '2-2-2',
                          name:'anc'
                      },    
                  ]
              },    
              {
                  id: '2-3',
                  name:'anc',
                  children:[
                      {
                          id: '2-3-1',
                          name:'anc',
                      },    
                      {
                          id: '2-3-2',
                          name:'anc'
                      },    
                  ]
              },    
          ]
      },
      {
          id: '3',
          name:'anc',
          children:[]
      }    
  ]
}

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

function treeObj2Ary(obj) {
  let res = []
  let o = deepClone(obj)
  res.push(o)
  if (o.hasOwnProperty('children') && Array.isArray(o.children) && o.children.length > 0) {
    for (let i = o.children.length; i ; i--) {
      res = [...res, ...treeObj2Ary(o.children[i - 1])]
    }
    delete o['children']
  }
  return res
}
console.log(treeObj2Ary(treeObj))
```
```
使用deepClone避免修改原对象，深度优先遍历则可以实现
```