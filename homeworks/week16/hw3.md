```
// 進入 global 的 EC 先編譯宣告：global scope VO {a: undefined, fn: function}
// 開始執行程式碼
var a = 1 // 將 global scope 的 a 賦值為 1
function fn(){
  // 進入 fn 的 EC 先編譯宣告：fn scope VO {a: undefined, fn2: function}
  // 開始執行程式碼
  console.log(a) // 輸出當下 fn scope 內 a 的值 undefined(1)
  var a = 5 //  將 fn scope 的 a 賦值為 5
  console.log(a) // 輸出當下 fn scope 內 a 的值為 5(2)
  a++ //  將 fn scope 的 a 賦值為 5 + 1 = 6
  var a // 忽略重複宣告
  fn2() // 進入 fn2
  console.log(a) // 輸出當下 fn scope 內 a 的值為 20(4)
  function fn2(){
    // 進入 fn2 的 EC 先編譯宣告：fn2 scope VO {}
    console.log(a) // fn2 scope 內找不到 a ，向上一層 fn scope 找到 a 輸出當下值 = 6(3)
    a = 20 // fn2 scope 內找不到 a ，向上一層 fn scope 找到 a 賦值為 20
    b = 100 // fn2 scope 內找不到 b ，往上直到 global 都找不到 b，當前非嚴格模式，故 global scope 會加上 b 並賦值為 100，盡量避免未宣告直接賦值會汙染全域變數
  }
}
fn() // 進入 fn
console.log(a) // 輸出當下 global scope 內 a 的值為 1(5)
a = 10 //  將 global scope 的 a 賦值為 10
console.log(a) // 輸出當下 global scope 內 a 的值為 10(6)
console.log(b) // 輸出當下 global scope 內 b 的值為 100(7)
```

依序輸出：  
a = undefined  
a = 5  
a = 6  
a = 20  
a = 1  
a = 10  
b = 100
