```js
var arr = [
  {
      id: '1',
      parent_id: 'root',
      name:'abc'
  },
  {
      id: '2',
      parent_id: 'root',
      name:'abc'
  },
  {
      id: '1-1',
      parent_id: '1',
      name:'abc'
  },
  {
      id: '1-2',
      parent_id: '1',
      name:'abc'
  },
  {
      id: '1-1-1',
      parent_id: '1-1',
      name:'abc'
  },
  {
      id: '1-1-2',
      parent_id: '1-1',
      name:'abc'
  },
  {
      id: '1-2-1',
      parent_id: '1-2',
      name:'abc'
  },
  {
      id: '2-1',
      parent_id: '2',
      name:'abc'
  },
  {
      id: '2-2',
      parent_id: '2',
      name:'abc'
  },
  {
      id: '2-1-1',
      parent_id: '2-1',
      name:'abc'
  },
  {
      id: '2-2-1',
      parent_id: '2-2',
      name:'abc'
  },
  {
      id: '2-2-1-1',
      parent_id: '2-2-1',
      name:'abc'
  },
  {
      id: '2-2-1-2',
      parent_id: '2-2-1',
      name:'abc'
  },
   {
      id: '2-2-1-2-1',
      parent_id: '2-2-1-2',
      name:'abc'
  },
  {
      id: '2-3',
      parent_id: '2',
      name:'abc'
  },
  {
      id: '2-3-1',
      parent_id: '2-3',
      name:'abc'
  },
  {
      id: '3',
      parent_id: 'root',
      name:'abc'
  },   
]
function bulidTree(ary) {
  let res = {}, store = {}
  for (let i = ary.length; i ; i--) {
    // 为每个节点添加id索引，并保存
    store[ary[i - 1]['id']] = ary[i - 1]
  }
  for (let idName in store) {
    if (store[idName]['parent_id'] !== 'root') {
      // 父节点非root节点外的所有节点将其放进它的父节点的children属性上
      if (store[store[idName]['parent_id']].children === undefined) {
        store[store[idName]['parent_id']].children = [store[idName]]
      } else {
        store[store[idName]['parent_id']].children.push(store[idName])
      }
    } else {
      // 父节点为root的节点直接放进res，因为对象的属性是指针的原因，其children属性已经拥有所有字节点
      res[store[idName]['id']] = store[idName]
    }
  }
  return res
}
console.log(bulidTree(arr))
```
```
请复制代码在控制台查看结果，核心思想是store保存节点和每一个子树的父子节点相连，就构成整个树形对象。
```