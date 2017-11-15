import React from 'react';
import { render } from 'react-dom';
import { observable, autorun, computed, action } from 'mobx';
import { observer } from 'mobx-react';

class MyState {
  @observable num1 = 0;
  @observable num2 = 100;

  @action addNum1 = () => {
    this.num1++;
  };
  @action addNum2 = () => {
    this.num2++;
  };
  @computed get total() {
    return this.num1 + this.num2;
  }
}

const newState = new MyState();

const AllNum = observer((props) => <div>num1 + num2 = {props.store.total}</div>);

const Main = observer((props) => (
  <div>
    <p>num1 = {props.store.num1}</p>
    <p>num2 = {props.store.num2}</p>
    <div>
      <button onClick={props.store.addNum1}>num1 + 1</button>
      <button onClick={props.store.addNum2}>num2 + 1</button>
    </div>
  </div>
));

@observer
class App extends React.Component {
    componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
    }
    render() {
        return (
            <div>
                <p>{newState.num1}</p>
                <Main store={newState} />
                <AllNum store={newState} />
            </div>
        )
    }
}

render(<App />, document.querySelector('#root'));
