import { observable, autorun } from 'mobx';

const value = observable(0);
const number = observable(100);

autorun(() => {
  console.log(value.get());
});

value.set(1);
value.set(2);
number.set(101);
