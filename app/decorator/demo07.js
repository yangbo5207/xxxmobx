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
