## 指令
```js
v-bind:title="message"
```
是经过compiler编译出的node，可以直接赋予data中的属性字符串。

### v-bind

给组件或者html元素绑定属性
可以直接绑定props和data中的属性，也可以是computed，method和watch里面的属性非常灵活。
例如
```js
<template>
  <div :style="customStyle"></div>
</template>
{
  props: {
    customStyle: {
      type: Object,
      default: function() {
        return {
          right: '50px',
          bottom； '50px'
        }
      }
    }
  }
}
```
### v-if条件渲染
```css
display: none;?
```

### v-on
v-on 指令添加一个事件监听器

### v-model
v-model 指令，它能轻松实现表单输入和应用状态之间的双向绑定。

### vue组件
在 Vue 里，一个组件本质上是一个拥有预定义选项的一个 Vue 实例。
值得注意的是，vue组件跟JSX语法不一样，不要求组件首字母大写。推荐使用my-component
```js
// 定义名为 todo-item 的新组件
Vue.component('todo-item', {
  template: '<li>这是个待办项</li>'
})

var app = new Vue(...)
```
混合写法不推荐

### vue数据劫持
只有当实例被创建时就已经存在于 data 中的 property 才是响应式的。

### object.freeze能阻滞vue中的依赖收集

### $
```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```
不要在选项 property 或回调上使用箭头函数，比如 created: () => console.log(this.a) 或 vm.$watch('a', newValue => this.myMethod())。因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找，直至找到为止，经常导致 Uncaught TypeError: Cannot read property of undefined 或 Uncaught TypeError: this.myMethod is not a function 之类的错误。

###  v-once 
你也能执行一次性地插值，当数据改变时，插值处的内容不会更新

### v-html
替换成原始html
你的站点上动态渲染的任意 HTML 可能会非常危险，因为它很容易导致 XSS 攻击。请只对可信内容使用 HTML 插值，绝不要对用户提供的内容使用插值。

### 动态参数
```html
<!--
在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]`。
除非在实例中有一个名为“someattr”的 property，否则代码不会工作。
-->
<a v-bind:[someAttr]="value"> ... </a>
```

### 修饰符
.prevent

### v-if
条件渲染，跟v-show是两个概念。v-show只是添加css属性

### is属性
```html
<div id="todo-list-example">
  <form v-on:submit.prevent="addNewTodo">
    <label for="new-todo">Add a todo</label>
    <input
      v-model="newTodoText"
      id="new-todo"
      placeholder="E.g. Feed the cat"
    >
    <button>Add</button>
  </form>
  <ul>
    <li
      is="todo-item"
      v-for="(todo, index) in todos"
      v-bind:key="todo.id"
      v-bind:title="todo.title"
      v-on:remove="todos.splice(index, 1)"
    ></li>
  </ul>
</div>
```
是为了避免ul只能嵌套li，这种浏览器解析错误。

### 事件修饰符
- .stop
- .prevent
- .capture
- .self
- .once
- .passive

### 按键修饰符

```html
<input v-on:keyup.13="submit">
```
- .enter
- .tab
- .delete (捕获“删除”和“退格”键)
- .esc
- .space
- .up
- .down 
- .left 鼠标按钮修饰符
- .right
- .middle

当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。

### v-model
v-model 会忽略所有表单元素的 value、checked、selected attribute 的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 data 选项中声明初始值。
- .lazy 默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步 (除了上述输入法组合文字时)。你可以添加 lazy 修饰符，从而转为在 change 事件_之后_进行同步
- .number 如果想自动将用户的输入值转为数值类型，可以给 v-model 添加 number 修饰符：
- .trim 如果要自动过滤用户输入的首尾空白字符，可以给 v-model 添加 trim 修饰符

### 组件基础
因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

### data必须是函数（非根实例）

一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：

### emit 和 redux中的dispatch
作用都是派发event和action，导致state变化。

### slot 和 props.children
本质一样

### v-model的语法糖
```html
<input v-model="searchText">
```
```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```
只是监听特殊的input，并动态绑定value

### 动态组件
https://codesandbox.io/s/github/vuejs/vuejs.org/tree/master/src/v2/examples/vue-20-dynamic-components

```html
<component v-bind:is="currentTabComponent" class="tab"></component>
```

### .prop修饰符
像 value 这样的 property，若想让其如预期般工作，你需要使用 .prop 修饰器。
.prop的修饰符用来指定绑定的值不应该被props解析，而应该作为dom的属性绑定在元素上。
```js
 it('.prop modifier', () => {
    const vm = new Vue({
      template: '<div><span v-bind:text-content.prop="foo"></span><span :inner-html.prop="bar"></span></div>',
      data: {
        foo: 'hello',
        bar: '<span>qux</span>'
      }
    }).$mount()
    expect(vm.$el.children[0].textContent).toBe('hello')
    expect(vm.$el.children[1].innerHTML).toBe('<span>qux</span>')
  })

```

### vue.observable
劫持一个对象setter和getter
```js
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```

### 基础组件的自动化全局注册
使用了webpack的require.context统一加载文件夹中的全部组件
```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```
但必须在根实例被创建之前添加。

### props
在父组件声明props的类型，类似react中的props-type
```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```
```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```
```js
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```
props中的属性会直接挂载在this上

#### 替换/合并props
对于绝大多数 attribute 来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style attribute 会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：form-control date-picker-theme-dark。

### $attr
$attr进行透传

### keep-alive
- **Props**：
  - `include` - 字符串或正则表达式。只有名称匹配的组件会被缓存。
  - `exclude` - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
  - `max` - 数字。最多可以缓存多少组件实例。

### 异步组件
相当于
```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```
### vue中的event bus
https://juejin.im/post/5a4353766fb9a044fb080927
```js
vue.prototype.$ebus = new Vue()
```
http://react-china.org/t/redux-eventbus/19567

### 访问根实例
this.$root

### 访问父组件
this.$parent

### 访问子组件
```html
<base-input ref="usernameInput"></base-input>
```
```js
this.$refs.usernameInput
```

### 依赖注入
两个新的实例选项：provide 和 inject，相当于react中的createContext

### 其他事件侦听器
- $on 侦听一个事件
- $once 一次性侦听一个事件
- $off 停止侦听一个事件

### vuex
```js
new Vue({
  el: '#app',
  store: store,
})
```
通过在根实例中注册 store 选项，该 store 实例会注入到根组件下的所有子组件中，且子组件能通过 this.$store 访问到
```js
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```
mapState 辅助函数
```js
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

### mutation
相当于redux中的action，commit相当于dispatch
 mutation 必须是同步函数

### action
- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意异步操作。

默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。例如：
```js
import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```
vue-element-admin中的示例一般会注册actions和mutation两种方式

### 子组件手动派发生命周期event
```js
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
```

### 父组件监听@hooks:life-cycle
```js
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...     
```
### mvvm
mvvm是Model-View-ModelView的简写。此概念最先由微软提出的，将view和model的直接关系分离，同一由viewmodel同一管理。也即开发者只需在model层进行数据更改，viewmodel就能用高性能的方法更新view层（对于浏览器来说，就是无需开发者手动更新dom，只要通过model的更改产生新的v-dom，viewmodel自动diff新旧两个v-dom，得到最小更改，自动去对dom进行更新，而view层的更改也能通过viewmodel进行更新model）

### vue生命周期
就我自己单步调试vue来说
- beforeCreate Vue.prtotype._init方法（此步要先进行config合并）创建vue实例，初始化生命周期，初始化Render，初始化Events (还不能访问state)
- created 此步劫持data中的数据（浅层）对于其的getter和setter（defineReactive 设置成响应式），都有相应的watcher。这部主要是初始化data/props。还有处理injection（data和props之前），处理provider（data和props之后）
- beforeMounted 主要是编译阶段，对template中的字符串，获取v指令，子节点，子组件生成v-dom（普通的js对象，里面属性由tag el childeren等），AST，然后构建一个render函数，然后根据AST生成编译指令。
- Mounted 根据编译指令，生成对应的dom，然后进行原生的dom操作替换，移除原生的dom。
- beforeUpdate 只要是生成新的v-dom tree（不会再进行编译的过程），然后调用diff，生成AST。
- updated 应该根据AST进行dom操作。
- beforeDestroy destroyed 因该接触dom绑定和移除事件监听吧。
### vue路由懒加载
https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
此Api和React中的suspense一样是是基于import()语法的，使用函数创建作用域来保存此Promise。在需要组件才执行此函数，动态加载组件即可。
### 自定义指令
```js
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
```
指令有其hook函数
bind inserted update compoentUpdated unbind
### vue的双向绑定原理是什么？
vue.js 是采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty()来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

具体步骤： 第一步：需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化

第二步：compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图

第三步：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是:

在自身实例化时往属性订阅器(dep)里面添加自己
自身必须有一个 update()方法
待属性变动 dep.notice()通知时，能调用自身的 update() 方法，并触发 Compile 中绑定的回调，则功成身退。
第四步：MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化(input) -> 数据 model 变更的双向绑定效果。

### vuex原理
vuex 仅仅是作为 vue 的一个插件而存在，不像 Redux,MobX 等库可以应用于所有框架，vuex 只能使用在 vue 上，很大的程度是因为其高度依赖于 vue 的 computed 依赖检测系统以及其插件系统，

vuex 整体思想诞生于 flux,可其的实现方式完完全全的使用了 vue 自身的响应式设计，依赖监听、依赖收集都属于 vue 对对象 Property set get 方法的代理劫持。最后一句话结束 vuex 工作原理，vuex 中的 store 本质就是没有 template 的隐藏着的 vue 组件；