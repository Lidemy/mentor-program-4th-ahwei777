### 在此為物件類型中的 this ，this 的值與這個函式「怎麽」被呼叫有關
```
onst obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello()
// 呼叫函示 hello 的主角為 obj.inner，因此 this 就是 obj.inner，故 this.value 即為 obj.inner.value，值為 2 
obj2.hello()
// 呼叫函示 hello 的主角為 obj2，因此 this 就是 obj2，故 this.value 即為 obj2.value = obj.inner.value，值為 2 
hello()
// 沒有呼叫函示 hello 的主角 (非嚴格模式下預設為 global)，因此 this 就是 global，故 this.value 即為 global.value，值為 undefined 
```
