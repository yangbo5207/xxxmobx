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
