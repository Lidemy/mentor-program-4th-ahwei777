## 什麼是 DOM？

全名 Document Object Model(文件物件模型)，是 HTML、XML 和 SVG 文件的程式介面，由 W3C 聯合各瀏覽器廠商制訂的標準物件模型，試圖讓各瀏覽器遵合此模型實作，以解決各瀏覽器間物件模型不一致的問題。

在此標準下文件中所有標籤包括文字、圖片等都被定義成物件(節點)的一個樹狀結構，並提供程式存取並改變文件架構、風格和內容的方法，節點上可以附加事件處理程序，一旦觸發事件就會執行處理程序。本質上，它將網頁與腳本或程式語言連結在一起。

雖然常常使用 JavaScript 來存取 DOM，但它本身並不是 JavaScript 語言的一部分，而且它也可以被其他語言存取。

![](https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/DOM-model.svg/1200px-DOM-model.svg.png)

>參考資料：
[Day03-深入理解網頁架構：DOM](https://ithelp.ithome.com.tw/articles/10202689)

## 事件傳遞機制的順序是什麼；什麼是冒泡，什麼又是捕獲？

DOM 的事件傳遞過程分為下列三個階段：

1. 捕獲階段：由 DOM 樹狀結構最外層依序向內"捕獲"，過程中觸發個別元素的捕獲階段事件監聽。
2. 目標階段：到達該事件目標，無分捕獲或冒泡，依照程式碼先後順序觸發事件監聽。
3. 冒泡階段：由事件目標依序向外層"冒泡"，過程中觸發個別元素的冒泡階段事件監聽。

>可用`.addEventListener`的第三個布林值參數指定監聽階段 
true => 捕獲 ; false => 冒泡(預設值)

![](https://i.imgur.com/S0iVpQD.png)

>參考資料：
[DOM 的事件傳遞機制：捕獲與冒泡](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)

## 什麼是 event delegation，為什麼我們需要它？

事件代理（Delegation），於監聽事件時可利用捕獲冒泡機制，直接於目標事件的上層元素添加 eventListener ，透過監聽父節點同步掌握子節點的事件發生狀況。

除了可省去針對每個子元素逐個添加 eventListener 的步驟外，也可適用於動態新增元素時使用(只要於新增元素所在的上層節點添加 eventListener 即可)。

## event.preventDefault() 跟 event.stopPropagation() 差在哪裡，可以舉個範例嗎？

event.preventDefault()
阻止該元素的預設行為發生(如點擊連結開啟網頁，點擊提交送出表單等)，不影響事件傳遞過程。

event.stopPropagation()
終止該元素的事件傳遞，但不影響預設行為。此時如同層內設有多個相同監聽器仍會一起觸發，如要終止所有其他相同事件監聽器需使用`stopImmediatePropagation`

舉例：
```
有一外層元素 <div class = 'outer'/> 包覆下的
<a href = 'www.google.com' >
```
1. 如針對點擊`<a>`的監聽器設置`preventDefault`則無法開啟連結，但事件仍會繼續傳遞(捕獲&冒泡)。
2. 如改為設置`stopPropagation`則可開啟連結，但事件會在到達該事件目標後終止傳遞，即不會繼續冒泡回去上層元素。