import { observable, autorun, computed } from 'mobx';

var index = 0;
var oIndex = observable(index);
var oComputed = computed(() => oIndex.get() % 2 == 0)

autorun(() => {
    console.log(oComputed.get());
})


setInterval(() => {
    oIndex.set(oIndex.get() + 1)
}, 500)


// function get(infomation, index) {
//     var trouble = null;
//     var a = infomation.split(/\s*plane/);
//     var b = a.reduce((res, cur, i) => {
//         if (cur.length !== 0) {
//             res.push(`plane${cur}`)
//         }
//         return res;
//     }, []);
//
//     b.forEach((item, i) => { // 这里进行故障判断, 目前的判断条件暂时定为没有偏移位置，可以根据不同的情况进行不同的判断
//         if (i != 0 && item.split(' ')[4] === undefined) {
//             trouble = i
//         }
//     })
//
//     var d = trouble;
//     if (index >= b.length) {
//         return 'not found';
//     }
//     if (d) {
//         return index < d ? b[index] : `Error: ${index}`
//     }
//
//     return b[index];
// }
//
// var str = `plane1 1 1 1
// plane1 1 1 1 1 2 3
// plane1 2 3 4 1 1 1
// plane1 3 4 5
// plane1 1 1 1 1 2 3`
//
// console.log(get(str, 3));
