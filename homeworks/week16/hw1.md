> Event Loop 參考圖 - Understanding Event Loop, Call Stack, Event & Job Queue in Javascript
![](https://blog.huli.tw/img/js-async/eventloop.png)
call stack 會由上往下依次執行程式碼，當遇到需要執行環境(node/瀏覽器)的 API 協助處理時會外包給 API 執行，執行完後再丟回 event queue，此時 call stack 內的程式碼仍會持續執行到清空為止，而如同警衛的 event queue 持續監控 call stack 直到清空後再依序將 event queue 內已運算完畢的函示推送回 call stack。

```
console.log(1)
//  放入 call stack, 呼叫 console.log(1),印出 1
setTimeout(() => {
  console.log(2)
}, 0)
//  放入 call stack, 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，等待 0 秒後將 () => { console.log(2) } 丟回 event queue,並等待 call stack 清空。
console.log(3)
//  放入 call stack, 呼叫 console.log(3),印出 3
setTimeout(() => {
  console.log(4)
}, 0)
//  放入 call stack, 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，等待 0 秒後將 () => { console.log(4) } 丟回 event queue,並等待 call stack 清空。
console.log(5)
//  放入 call stack, 呼叫 console.log(5),印出 5
// call stack 清空
// event loop 偵測到 call stack 清空後將 event queue 內經過 API 倒數完畢的 call back 函示依照先進先出的方式依序丟回 call stack
// 將 () => { console.log(2) } 放入 call stack, 函示呼叫 console.log(2), 印出 2
// 將 () => { console.log(4) } 放入 call stack, 函示呼叫 console.log(4), 印出 4
// call stack 清空且event queue 清空，程式執行完畢
```