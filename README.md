#### 1. 装饰者模式

在不改变对象，并且不适用继承的情况下，动态扩展对象能力的一种设计模式。

主要是通过创建一个包装对象，接收对象实例来装饰对象的方式来实现。

+ 装饰对象与真实对象具有同样的接口
+ 构造函数中接收真实对象的实例
+ 可以按需修改/新增接口

```js
class Man {}

class Decorator {
    constructor(man) {
        //...
    }
}

var man = new Man();
man = new Decorator(man);
```

#### 2. ES7 Decorator

```js
@someDecorator
class Man {
    // ...
}

class Person {
    @getnameDecorator
    getName() {
        // ...
    }
}
```

#### 3. mobX

##### **observable state 可观察状态**

Observable 值可以是JS基本数据类型、引用类型、普通对象、类实例、数组和映射。


##### autorun

auto可以创建一个响应式函数，当有被观察的值发生变化时，该函数总是会执行

```js
import { observable, autorun } from 'mobx';

const value = observable(0);
const number = observable(100);

autorun(() => {
  console.log(value.get());
});

value.set(1);
value.set(2);
number.set(101);
```

在class中使用

```js
import { observable, autorun } from 'mobx';

class Todo {
    @observable number = 0;
    @observable account = 1;
}

const todo = new Todo();
console.log(todo.number, todo.account);
```

##### computed 计算属性

根据现有的值，获得一个新值

```js
import { observable, computed } from 'mobx';

class Todo {
    @observable number = 1;
    @observable account = 209;

    @computed get totle() {
        return this.number + this.account
    }
}

const todo = new Todo();
console.log(todo.number, todo.account, todo.totle); // 1, 209 , 210
```

在class中定义一个计算属性时，必须以getter的形式添加

##### action

表示一个动作，用于修改被观察的值

```js
import { observable, computed, action } from 'mobx';

class Todo {
    @observable number = 1;
    @observable account = 209;

    @computed get totle() {
        return this.number + this.account
    }

    @action addNumber() {
        this.number++
    }

    @action('account递减')
    reduceAccout() {
        this.account--;
    }
}

const todo = new Todo();
todo.addNumber();
console.log(todo.totle);

todo.addNumber();
console.log(todo.totle);

todo.reduceAccout();
console.log(todo.totle);

```

##### 3. mobx-react

##### @observer

将一个react组件转变成为一个响应式组件

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { observable, action } from 'mobx';
import { observer }  from 'mobx-react';

class Todo {
    @observable number = 0;

    @action
    addNumber = () => {
        this.number++;
    }
}

const todo = new Todo();

@observer
class App extends Component {
    render() {
        return (
            <div>
                <p>{todo.number}</p>
                <button onClick={todo.addNumber}>+1</button>
            </div>
        )
    }
}

render(<App />, document.querySelector('#root'));
```

##### Provider and inject

Provider 借助Rreact context把属性传递给子组件
inject可以理解为一个高阶函数，可以往当前组件中注入属性

```js
// demo09.js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { observable, action } from 'mobx';
import { observer, inject, Provider }  from 'mobx-react';

class Todo {
    @observable number = 0;

    @action
    addNumber = () => {
        this.number++;
    }
}

const todo = new Todo();

@inject(store => ({
    number: store.todo.number,
    addNumber: store.todo.addNumber
}))
@observer
class Message extends Component {
    render() {
        const { number, addNumber } = this.props;
        console.log(this.props);
        return (
            <div>
                <p>{number}</p>
                <button onClick={addNumber}>+1</button>
            </div>
        )
    }
}

const App = () => (
    <Provider todo={ todo }>
        <Message />
    </Provider>
)

render(<App />, document.querySelector('#root'));

```

##### 实践

重构财经日历
