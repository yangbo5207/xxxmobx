import { observable } from 'mobx';

class Todo {
    @observable number = 0;
    @observable account = 1;
}

const todo = new Todo();
console.log(todo.number, todo.account);
