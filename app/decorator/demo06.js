import { observable, computed } from 'mobx';

class Todo {
    @observable number = 1;
    @observable account = 209;

    @computed get totle() {
        return this.number + this.account
    }
}

const todo = new Todo();
console.log(todo.number, todo.account, todo.totle);
