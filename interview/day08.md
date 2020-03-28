## webpack相关面试题
值得多看
https://juejin.im/post/5e6f4b4e6fb9a07cd443d4a5#heading-10

## JS解析过程
分为语法解析过程和运行过程
- 语法解析：
1. 词法分析
```js
function tokenizer(input) {
        // 记录当前解析到词的位置
        var current = 0;
        // tokens 用来保存我们解析的token
        var tokens = [];
        // 利用循环进行解析
        while(current < input.length) {
            // 提取出当前要解析的字符
            var char = input[current];

            // 处理符号: 检查是否是符号
        var PUNCTUATOR = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
        if (PUNCTUATOR.test(char)) {
          // 创建变量用于保存匹配的符号
          var punctuators = char;
          // 判断是否是箭头函数的符号
          if (char === '=' && input[current + 1] === '>') {
              punctuators += input[++current];
          }    
          current++;
          // 最后把数据存入到tokens中
          tokens.push({
              type: 'Punctuator',
              value: punctuators
          });
          // 进入下一次循环
          continue;
        }
        // 下面是处理空格，如果是空格的话，则直接进入下一个循环
        var WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
          current++;
          continue;    
        }
        // 处理数字，检查是否是数字
        var NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
          // 创建变量，用于保存匹配的数字
          var number = '';
          // 循环当前的字符及下一个字符，直到不是数字为止
          while(NUMBERS.test(char)) {
              number += char;
              char = input[++current];
          }
          // 最后我们把数据更新到tokens中
          tokens.push({
              type: 'Numeric',
              value: number
          });
          // 进入下一个循环
          continue;    
        }
        // 检查是否是字符
        var LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
          // 创建一个临时变量保存该字符
          var value = '';
          // 循环遍历所有的字母
          while(LETTERS.test(char)) {
              value += char;
              char = input[++current];
          }
          // 判断当前的字符串是否是关键字
          var KEYWORD = /function|var|return|let|const|if|for/;
          if (KEYWORD.test(value)) {
              // 标记关键字
              tokens.push({
                type: 'Keyword',
                value: value    
              })
          } else {
              // 标记变量
              tokens.push({
                type: 'Identifier',
                value: value
              })
          }
          // 进入下一次循环
          continue;    
        }
        // 如果我们没有匹配上任何类型的token; 那么就抛出一个错误
        throw new TypeError('I dont konw what this character is:' + char);
        }    
        // 最后我们返回词法单元数组
        return tokens;
      }
      var str = 'var a = 1';
      console.log(tokenizer(str));
  ```
  经过函数转换就会得到词法单元流
2. 语法分析
语法分析会将词法单元流，转为AST
```js
// 接收tokens作为参数, 生成抽象语法树AST
function parser(tokens) {
  // 记录当前解析到词的位置
  var current = 0;
  // 通过遍历来解析token节点
  function walk() {
      // 从token中第一项进行解析
      var token = tokens[current];
      // 检查是不是数字类型
      if (token.type === 'Numeric') {
        // 如果是数字类型的话，把current当前的指针移动到下一个位置
        current++;
        // 然后返回一个新的AST节点
        return {
            type: 'Literal',
            value: Number(token.value),
            row: token.value
        }    
      }
      // 检查是不是变量类型
      if (token.type === 'Identifier') {
        // 如果是，把current当前的指针移动到下一个位置
        current++;
        // 然后返回我们一个新的AST节点
        return {
            type: 'Identifier',
            name: token.value
        }
      }
      // 检查是不是运输符类型
      if (token.type === 'Punctuator') {
        // 如果是，current自增
        current++;
        // 判断运算符类型，根据类型返回新的AST节点
        if (/[\+\-\*/]/im.test(token.value)) {
            return {
              type: 'BinaryExpression',
              operator: token.value
            }
        }
        if (/\=/.test(token.value)) {
            return {
              type: 'AssignmentExpression',
              operator: token.value    
            }
        }    
      }
      // 检查是不是关键字
      if (token.type === 'Keyword') {
        var value = token.value;
        // 检查是不是定义的语句
        if (value === 'var' || value === 'let' || value === 'const') {
            current++;
            // 获取定义的变量
            var variable = walk();
            // 判断是否是赋值符号
            var equal = walk();
            var rightVar;
            if (equal.operator === '=') {
              // 获取所赋予的值
              rightVar = walk();    
            } else {
              // 不是赋值符号, 说明只是定义的变量
              rightVar = null;
              current--;    
            }
            // 定义声明
            var declaration = {
              type: 'VariableDeclarator',
              id: variable, // 定义的变量
              init: rightVar
            };
            // 定义要返回的节点
            return {
              type: 'VariableDeclaration',
              declarations: [declaration],
              kind: value
            }
        }    
      }
      // 遇到一个未知类型就抛出一个错误
      throw new TypeError(token.type);
  }
  // 现在，我们创建一个AST，根节点是一个类型为 'Program' 的节点
  var ast = {
      type: 'Program',
      body: [],
      sourceType: 'script'
  };
  // 循环执行walk函数，把节点放入到ast.body中
  while(current < tokens.length) {
      ast.body.push(walk());
  }
  // 最后返回我们的AST
  return ast;
}
var tokens = [
  { type: 'Keyword', value: 'var' }, 
  { type: 'Identifier', value: 'a' },
  { type: 'Punctuator', value: '=' },
  { type: 'Numeric', value: '1' }
];
console.log(parser(tokens));
```
我们对生成的AST树节点需要进行处理下，比如我们使用ES6编写的代码，比如用到了let,const这样的，我们需要转换成var。
因此我们需要对AST树节点进行转换操作。

转换AST的时候，我们可以添加、移动、替换及删除AST抽象树中的节点操作。
babel就是在AST分析时将es6的语法翻译成es5的语法。taro也是在AST分析时转换成小程序的语法。

- 运行阶段

1. 预解析 预解析指的是：在js文件或script里面的代码在正式开始执行之前，会进行一些解析工作。比如上在全局中寻找var关键字声明的变量和通过function关键字声明的函数。 找到全局变量或函数后，我们会对该进行作用域提升，但是在变量提升声明的情况下不会赋值操作，因此它的默认值是undefined。通过声明提升，对于函数来讲，函数可以在声明函数体之上进行调用。变量也可以在赋值之前进行输出，只是变量输出的值为undefined而已。
```js1. 预编译首先是全局预编译，函数体未调用时是不进行预编译的。
2. 只有var 和 function 声明会被提升。
3. 在所在的作用域会被提升，不会扩展到其他的作用域。
4. 预编译后会顺序执行代码。
```

2. 在浏览器环境中，javascript引擎会按照 script标签代码块从上到下的顺序加载并立即解释执行。
https://www.cnblogs.com/tugenhua0707/p/11980566.html

### node中的dirname
Node.js 中，__dirname 总是指向被执行 js 文件的绝对路径

### 诡异的语法
```js
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly config: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.jwtSecret,
    });
  }

  async validate(req: Request, payload: JwtPayload, done) {
    // tslint:disable-next-line
    const incomingPayload: JwtPayload = { id: req['id'], email: req['email'] };
    const user = await this.authService.validateUser(incomingPayload);
    if (!user) {
      return new UnauthorizedException();
    }
    return user;
  }
}
```
extends 后面可以跟着一个函数返回一个父类

```js
import ReactDOM from "react-dom";
import React, { useState, useCallback, useEffect } from "react";

function App() {
  const [reqConf, setReqConf] = useState({
    user: 'null',
    pwd: 'undefined'
  })
  const response = useConf(reqConf)
  console.log(response)
  
  const handleClick = () => {
    setReqConf({
      user: 'root',
      pwd: '20200321'
    })
  }
 
  return (
    <div>
      <div>{reqConf.user}</div>
      <div>{reqConf.pwd}</div>
      <button onClick={handleClick}>click me to reset reqConf!</button>
    </div>
  )
}

function useConf(conf) {
  const [data, setData] = useState(null)

  const callBack = useCallback(() => {
    setTimeout(() => {
      setData({
        ...conf
      })
    }, 10000)
  },[conf])
  useEffect(() => {
    callBack()
  }, [callBack])

  return data
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
```