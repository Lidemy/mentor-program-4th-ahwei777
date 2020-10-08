## 這週學了一大堆以前搞不懂的東西，你有變得更懂了嗎？請寫下你的心得。

因為學習心得已幾乎都寫在每日進度裡面，這邊我想直接把這週學到的觀念重點節錄下來，一方面幫助自己記憶也可以請老師跟助教看看是否哪裡有誤。

### 變數的不同資料型態與儲存特性
1. JavaScript 內具有七種資料型態，依據可變性分為 primitive type ( Immutable )及 object type (Mutable)。
2. Immutable 類型資料以函式如`str.toUpperCase()`操作後不會改變原本的值而是回傳一個新的結果，相反的 Mutable 類型資料以函式如`array.push()`操作後會直接更動原物件。
3. object type 物件型態實際上儲存的是指向的記憶體位置，當直接以`.`或`[]`方式操作物件內屬性或元素時會直接更改其記憶體內的資料，但記憶體位置保持不變，故即使物件資料有更新仍與原物件相等(物件是否相等看的是記憶體位置)，但如果對該物件重新賦值則會直接指向一個新記憶體位置，就與原物件不同了。
4. JavaScript 在進行寬鬆相等比較時會自動進行恐怖的型別轉換，因此在程式碼內盡量都使用絕對相等，注意 object type 比較的是指向"記憶體位置"而非記憶體內儲存的資料內容。
5. NaN (Not a Number) 是一種特殊的非數字值，白話點就是「非數值的代表」，特性為 NaN 不等於任何值包括自己、本身是數字型態卻不是數字。
6. 判斷型態可使用 `typeof(對象)`(有少數 bug 個案)、`Object.prototype.toString.call(對象)`(推薦萬用)

### 變數宣告語法的差異( var / let / const ) 
1. ES6 以前變數宣告方式只有 var ，變數只生存在被宣告的作用域底下，最小範圍為 function，呼叫變數時會先從當下作用域尋找，找不到時會再往上逐層尋找直到頂端 global 仍找不到時即回傳`is not defined`。
2. 作用域範圍是根據"宣告 function 時"的位置而與在哪呼叫無關。
3. 如果在非嚴格模式下直接在某作用域底下對一個未宣告變數進行賦值，並且往上找到 global 均未找到該變數時，就會直接在 global 宣告該變數，實務上要避免未宣告直接賦值以免汙染全域變數。
4. ES6 引進新的兩種變數宣告方式 let 及 const ，兩者的作用域皆為 block `{}`，差別在於 const 必須在宣告時就要賦值且無法改變 object type 所指向記憶體位置(但仍可透過直接操作元素方式更改記憶體內資料)。
5. let 與 const 也有 hoisting，但與 var 不同的是並不會被初始化為 undefined，如果在「完成賦值之前」就存取它會拋出錯誤，從進入作用域開始到變數被完成賦值前的期間稱作 TDZ ( Temporal Dead Zone )。

### 變數的生存範圍(scope 作用域)
1. 作用域就是一個變數的生存範圍，一旦出了這個範圍就無法存取到這個變數。
2. global 作用域(全域、全域變數)，在任何地方都能夠存取到。
3. 在 ES6 以前，唯一產生作用域的方法就是 function，每個 function 都有自己的作用域，而範圍就是 function 本身及其內部
4. 在 function 裡面可以存取外面的變數，但在作用域外部無法存取到 function 裡面所定義的變數。
5. ES6 的時候引入了 let 跟 const，作用域縮小至 block，有助增加語義以及避免變數汙染。
6. JavaScript 屬於靜態作用域，代表作用域在 function 被「宣告」時就決定了，而非 function 被「執行」的時候。

### 變數 hoisting 的機制與底層運作
1. hoisting 的現象：變數宣告、函式宣告、傳進函式的參數都會提升至該作用域頂端，且只有宣告行為會提升(賦值不會)。
2. 設計 hoisting 機制的目的最主要是為了解決互相呼叫函式(兩個函式各自在函式內呼叫對方)的問題，以 hoisting 將所有函式都提升至該作用域頂端。 
3. 從 ECMAScript 看 hoisting 的底層運作：當進入一個作用域(global/function)時就會產生一個 Execution Contexts（EC），儲存跟當下作用域有關的資訊，並把這個 EC 放到 stack 裡面，當作用域內的程式碼執行完以後，就會把 EC 給 pop 出來。
4. 每個 EC 都有對應的 variable object（VO, 可想像成 JavaScript 物件），內部宣告的變數、函式、函式的參數都會被加進 VO 裡面。
5. 在進入一個 EC 的時候（想像成執行 function 後但還沒開始跑內部程式碼以前），會按照順序做以下三件事：
    1. 把參數放到 VO 裡面並設定好值，傳什麼進來就是什麼，沒有值的設成 undefined
    2. 把 function 宣告放到 VO 裡，如果已經有同名的就覆蓋掉
    3. 把變數宣告放到 VO 裡，如果已經有同名的則忽略
6. JavaScript 雖為直譯型語言，其實仍有編譯→執行的階段，而 hoisting 其實就是在編譯階段做處理的。
7. 在編譯階段時會處理好所有變數及函式宣告並加到 scope 裡面，執行時就可以去使用它。
8. 執行動作可分為 LHS（Left hand side）引用與 RHS（Right hand side）引用。
    - LHS：請幫我查詢這個變數的位置在哪裡，因為我要對它賦值，如 `var a = 10`
    - RHS：請幫我查詢這個變數的值是什麼，因為我要用這個值，如 `console.log(a)`
    - 查詢時會從當前作用域逐層往上尋找直到 global scope。
9. let 與 const 也有 hoisting，但並不會被初始化為 undefined，如果在「完成賦值之前」就存取它會拋出錯誤)。

### closure 閉包及運用

1. 閉包概念：在 function 內直接回傳 function ，則原本宣告在該 function 內的變數會因為作用域的關係被關在裡面，即使 function 執行完畢還是可以存取到該變數，好處是可以把變數透過此機制隱藏在 function 裡面讓外部無法直接更改該變數，只能按照 function 提供的操作函式去修改。
2. 當進入 EC 的時候，scope chain 會被初始化為 activation object 並加上 function 的[[Scope]]屬性，`scope chain = activation object + [[Scope]]`
3. 當建立 function A 時，設置`A.[[Scope]] = scope chain of current EC`
4. 當進入 function A 時，產生一個新的 EC，並設置 EC.scope_chain = AO + A.[[Scope]](建立時已設置好)
5. 因此任何函式建立時，就會利用 `A.[[Scope]]` 自動把上層 EC 的 VO/AO(變數資料)記錄起來，等到進入函式時又會把記錄的資料放回 scope chain，達成保留變數的效果，而查詢變數時就會從一路疊加紀錄的 scope chain 按順序尋找：當前 EC 的 AO → 上層 EC 的 AO → globalEC的 VO 。
6. 簡單來說因為變數透過這種層層方式被保留在 scope chain 裡面(自己及上層 EC 的 VO/AO 組合)，所以不會因為函式執行完畢就被回收，才達成保留變數的效果。
7. 就算最後沒有把內部的 function 給回傳而是直接執行，也不會影響這個機制的運行。
8. 因此廣義來說在 JavaScript 裡面，所有的函式都是閉包，因為每個宣告的 function 都會儲存著[[Scope]]，而這個資訊裡面就是參照的環境(變數)。

### 物件導向與原型鍊( prototype )
1. 相較於直接呼叫函式的作法，如果把各種功能函式都包裝成一個物件，在呼叫函式時變成導向該物件進行操控，使用上會更為直覺與模組化。
2. JavaScript 雖沒有 class ，但為了達成類似的機制就借用了 `new` 來達成同樣功能，ES6 之後新增了 `class` 的語法糖(實際仍非 class 語法)。
3. ES6 以前可以如下方式創造構造函數`person`，並用`new`創造出一個新的 instance。
```
// constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
  this.log = function () {
    console.log(this.name + ', age:' + this.age);
  }
}
  
var nick = new Person('nick', 18);
var peter = new Person('peter', 20);
  
console.log(nick.log === peter.log) // false
```
4. 但有些 method其實是每個 instance 彼此之間可以共享的(如上面的 log)，為了節省記憶體空間就要使用`prototype`，把 log 這個 function 指定在 `Person.prototype` 上面，讓所有 `Person 的 instance 都可以共享這個方法。
5. 盡量避免直接在原型構造函數上添加函示，如`Array.prototype`
6. 新增出來的 instance 透過 `__proto__` 來與`Person.prototype`連接起來(MDN 建議比較好的方式是用`Object.getPrototypeOf()`)
7. 舉例：JavaScript 發現 nick 沒有 log 這個 method 時， 會透過`__proto__`找到`Person.prototype`，看裡面有沒有 log 這個 method，如果還是沒有就會繼續往 `Person.prototype.__proto__`尋找，就這樣一直不斷找下去。找到某個東西的`__proto__`是 null 為止(最上層)。
8. 如果想知道一個屬性是存在 instance 身上，還是存在於它屬於的原型鍊當中，可以用`hasOwnProperty`這個方法
9. 由此可知 `new` 背後實際做的行為是什麼，假設現在有一行程式碼是 `var nick = new Person('nick');` ，那它有以下幾件事情要做：
    1. 創出一個新的 object，我們叫它 O
    2. 把 O 的 `__proto__` 指向 Person 的 prototype，才能繼承原型鍊
    3.  拿 O 當作 context，呼叫 Person 這個建構函式進行初始化
    4. 回傳 O
10. 當創建新的 class 但想使用共同的 constructor 及屬性可使用繼承語法，如下：
```
class Dog {
  constructor(name) {
    this.name = name
  }
  sayHello() {
    console.log(this.name)
  }
}
// 新類別 whiteDog 會直接繼承 Dog 的建構式跟 function 
class whiteDog entends Dog {
  test() {
    console.log('test', this.name)
  }
}
const w = new blackDog('blackDog')
// 也可延續原本的建構式增加定義
class blackDog entends Dog {
  constructor(name) {
    super(name) // 呼叫父類別的 constructor，需使用此語法才能存取到父類別的 this,如原本有傳入參數也需一併加入
    this.sayHello()
  }
  test() {
    console.log('test', this.name)
  }
}
const b = new blackDog('blackDog')
```

### this 所指向的對象
1. 在物件導向裡面，`this`代表的就是要創造出去的那個 instance 本身，因為未定所以也只能用這樣的代名詞來表示。
2. 脫離了物件，this 的值就沒什麼意義，就會是該環境下的預設值
    1. 嚴格模式底下就都是`undefined`
    2. 非嚴格模式，瀏覽器底下是`window`
    3. 非嚴格模式，node.js 底下是`global`
3. 有幾種方式可以改變 `this`，首先是 `call` 跟 `apply`，傳進去的第一個參數就可以改變 `this`，差別在於 `apply` 傳進去的第一個參數必須為 array。
```
'use strict';
function hello(a, b){
  console.log(this, a, b)
}
  
hello.call('yo', 1, 2) // yo 1 2
hello.apply('hihihi', [1, 2]) // hihihi 1 2
```
4. `bind` 也可以改變 `this`，差別在於會回傳一個新的 function 而非直接呼叫原 function ，且 `bind` 綁定順序會高於 `call` 跟 `apply`
5. 無論是用 `call`、`apply`、`bind`，傳進去的如果是 primitive 都會被轉成 object
6. 如果不是透過物件導向而是直接創造一個物件，`this` 的值跟作用域跟程式碼的位置在哪裡完全無關，只跟「你如何呼叫」有關。
7. `this` 的值會根據你怎麼呼叫它而變得不一樣，可以用不同的方式去呼叫 function，讓 `this` 的值變得不同。
8. `this`跟作用域是兩種完全不同的運行模式，一個是靜態（作用域）、一個是動態（this）。作用域要看這個函式在程式碼的「哪裡」；`this` 要看這個函式「怎麽」被呼叫。
9. 可以利用一個小技巧把 `a.b.c.hello()` 看成是 `a.b.c.hello.call(a.b.c)`，把在呼叫 function 以前的東西放到後面去就能輕鬆找出 `this` 的值。
10. ES6 的箭頭函式的 `this` 比較特殊並非自己決定的，而是取決於在宣告時那個地方的 `this`，也就是宣告時的作用域。

### Event Loop 機制
![](https://blog.huli.tw/img/js-async/eventloop.png)
1. JavaScript 的「只有一個 thread」指的就是只有一個 call stack，所以同一個時間只能執行一件事情。
2. 而非同步就是透過將工作外包給執行環境(瀏覽器/node)的 API 協助處理達成的，
3. event loop 會不斷偵測 call stack 是否為空，如果是空的話就把 callback queue 裡面的東西丟到 call stack。
4. 非同步的 callback function 會先被放到 callback queue，並且等到 call stack 為空時候才被 event loop 丟進去 call stack。
5. setTimeout 傳 0 只是代表「儘快執行」，不一定在 0ms 以後就會觸發，同理就算設定 5 秒也不是代表 5 秒後就會立刻執行，只能保證幫你延遲 5 秒後才執行

參考資料：  
[該來理解 JavaScript 的原型鍊了](https://blog.huli.tw/2017/08/27/the-javascripts-prototype-chain/)  
[深入探討 JavaScript 中的參數傳遞：call by value 還是 reference？](https://blog.huli.tw/2018/06/23/javascript-call-by-value-or-reference/)  
[我知道你懂 hoisting，可是你了解到多深？](https://blog.huli.tw/2018/11/10/javascript-hoisting-and-tdz/)  
[所有的函式都是閉包：談 JS 中的作用域與 Closure](https://blog.huli.tw/2018/12/08/javascript-closure/)  
[淺談 JavaScript 頭號難題 this：絕對不完整，但保證好懂](https://blog.huli.tw/2019/02/23/javascript-what-is-this/)  
[JavaScript 中的同步與非同步（上）：先成為 callback 大師吧！](https://blog.huli.tw/2019/10/04/javascript-async-sync-and-callback/)  