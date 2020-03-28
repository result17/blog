## react-router-dom的简单介绍
react router有三类组件
- router (BrowserRouter, HashRouter)
- route matching (Route Switch)
- navigation (Link)

不要将component属性设置为一个函数，然后在其内部渲染组件。这样会导致已经存在的组件被卸载，然后重写创建一个新组件，而不是仅仅对组件进行更新。
原理跟节流一样，每次返回一个新函数，会造成React重复声明。
```js
const Home = () => <div>Home</div>;

const App = () => {
  const someVariable = true;

  return (
    <Switch>
      {/* these are good */}
      <Route exact path="/" component={Home} />
      <Route
        path="/about"
        render={props => <About {...props} extra={someVariable} />}
      />
      {/* do not do this */}
      <Route
        path="/contact"
        component={props => <Contact {...props} extra={someVariable} />}
      />
    </Switch>
  );
};
```
## hooks的基本规则
hooks应该在外层使用，不应该在循环，条件等地方使用，因为它的实现是全局链表。

### antd4.0的变化
Icon不再内置
From.create()废弃，所用的API一直到From上

### content-type
Content-Type 实体头部用于指示资源的MIME类型 media type 。

在响应中，Content-Type标头告诉客户端实际返回的内容的内容类型。浏览器会在某些情况下进行MIME查找，并不一定遵循此标题的值; 为了防止这种行为，可以将标题 X-Content-Type-Options 设置为 nosniff。

在请求中 (如POST 或 PUT)，客户端告诉服务器实际发送的数据类型。

### JSON Web Token JWT
它定义了一套简洁（compact）且 URL 安全（URL-safe）的方案，以安全地在客户端和服务器之间传输 JSON 格式的信息。

#### 优点
- 体积小，字符串格式。
- 传输方式多样，通过HTTP头部（推荐）
- 严谨的结构化。它自身（在payload）就包含了所有与用户相关的验证消息，如用户可访问路由、访问有效期等信息，服务器无需再去连接数据库验证信息的有效性，并且 payload 支持应用定制。
#### JWT 工作原理
某 client 使用自己的账号密码发送 post 请求 login，由于这是首次接触，服务器会校验账号与密码是否合法，如果一致，则根据密钥生成一个 token 并返回，client 收到这个 token 并保存在本地。在这之后，需要访问一个受保护的路由或资源时，只要附加上 token（通常使用 Header 的 Authorization 属性）发送到服务器，服务器就会检查这个 token 是否有效，并做出响应。
#### JWT 组成
```js
// Header
{
  "alg": "HS256",
  "typ": "JWT"
}

// Payload
{
  // reserved claims
  "iss": "a.com",
  "exp": "1d",
  // public claims
  "http://a.com": true,
  // private claims
  "company": "A",
  "awesome": true
}

// $Signature
HS256(Base64(Header) + "." + Base64(Payload), secretKey)

// JWT
JWT = Base64(Header) + "." + Base64(Payload) + "." + $Signature
```
https://jwt.io/

#### JWT特点
1. JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次。

2. JWT 不加密的情况下，不能将秘密数据写入 JWT。

3. JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数。

4. JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑。

5. JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证。

6. 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输。

#### create-react-app中的代理服务器
如果有webpack设置文件，我们可以轻易地从在webpack.dev.js中设置。但不想运行
```js
npm run eject
```
我们可以在package.json
```js
"proxy": {
    "/api": {
      "target": "http://100.100.100.100", //后端地址
      "changeOrigin": true
    }
 }

```
### useCallback所学到的react知识
由于javascript函数的特殊性，当函数签名被作为deps传入useEffect时，还是会引起re-render（即使函数体没有改变），这种现象在类组件里边也存在：
```js
// 当Parent组件re-render时，Child组件也会re-render
class Parent extends Component {
  render() {
    const someFn = () => {}; // re-render时，someFn函数会重新实例化

    return (
      <>
        <Child someFn={someFn} />
        <Other />
      </>
    );
  }
}

class Child extends Component {
  componentShouldUpdate(prevProps, nextProps) {
    return prevProps.someFn !== nextProps.someFn; // 函数比较将永远返回false
  }
}
```
```js
function App() {
  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const fetchData = async () => {
    setTimeout(() => {
      setList(initList);
    }, 3000);
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>click {count} times</div>
      <button onClick={() => setCount(count + 1)}>Add count</button>
      <List list={list} />
    </>
  );
}
```
- 将函数移到组件外部（缺点是无法读取组件的状态了，避免了重复声明）
- 条件允许的话，把函数体移到useEffect内部。（避免重复声明）
- 如果函数的调用不止是useEffect内部（如需要传递给子组件），可以使用useCallback API包裹函数，useCallback的本质是对函数进行依赖分析，依赖变更时才重新执行
https://codesandbox.io/s/memoization-sf74m
仔细研究上面的demo会有很大收获

useCallback(fn, deps) 相当于 useMemo(() => fn, deps)。

https://juejin.im/post/5e6ccbf86fb9a07cb52bddf1#comment
这篇博文很好介绍了防抖函数在react hook中怎么避免重复声明

### useEffect避免首次渲染
https://github.com/wayou/wayou.github.io/issues/39

### filter invert 
可以使得元素反色，包括img，pre标签，包括video标签，实时渲染视频有没有，真的太强了。

### async-vaildator隐藏后台log
node_modules/async-vaildator/es/util.js
```js
console.warn(type, errors)
```
### :root
对于HTML来说，:root表示html元素

### tcp三次握手的目的（re-learn）
https://www.zhihu.com/question/24853633
1. 考虑客户端A发起两次连接请求，第一次长时间在网络滞留，而第二次跟B建立了TCP连接后，第一次请求到达B，B会认为是新的连接请求，而建立连接。此时A并没有发起连接请求，二次握手的话就不再理睬B的请求，导致B一直处在连接状态，消耗B的资源，如果是三次握手，A还可以发送RST(reset包)来取消连接。
2. 为了同步双方的序列号，两次握手是做不到同步双方的序列号的。B还需要A来确定它的序号。
更详细就要去学习RFC规范了。

### mysql存储时间
有三种格式date，datetime和timestamp（4字节存储，2038年问题，真的捞）
介绍一下datatime的格式
'YYYY-MM-DD hh:mm:ss.fraction', the range for DATETIME values is '1000-01-01 00:00:00.000000' to '9999-12-31 23:59:59.999999'
```js
// 查看时区
SHOW VARIABLES LIKE '%time_zone%'
// 查询现在时间
SELECT NOW();
// 设置时区
SET @@time_zone = 'SYSTEM';
```

### filter作用失效
filter只作用在content-box上，对于border和margin无效。

### 类似pigfly效果的网站
http://patorjk.com/software/taag/#p=display&f=Graffiti&t=Type%20Something%20

### 箭头函数与普通函数的区别
- 箭头函数不会创建自己的this，所以它没有自己的this，它只会从自己的作用域链的上一层继承this。
- .call()/.apply()/.bind()无法改变箭头函数中this的指向
- 箭头函数不能作为构造函数使用
- 箭头函数没有自己的arguments
- 箭头函数没有原型prototype

### setState的同步和异步
1. setState只在合成事件和钩子函数中是“异步”的，在原生事件和setTimeout 中都是同步的。
2. setState 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形成了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果。
3. setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次setState，setState的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时setState多个不同的值，在更新时会对其进行合并批量更新。
