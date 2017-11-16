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
