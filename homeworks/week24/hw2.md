## Redux middleware 是什麼？

透過 dispatch 發出 action 後，在抵達 reducer 以前可以透過設置 middleware 協助處理 Side Effect （將非同步事件轉為同步操作）。

主要目的是為了將非同步邏輯從 component 中切割出來方便測試，如 `Redux thunk` 可在 action 內傳入一個 function ，而 Redux thunk 會協助監控並代為呼叫此 function 。

而更為進階的就是 `redux-saga` 與 `redux-observable`，傳入的 action 仍為純物件型態，而非同步的邏輯都在 middleware 內部定義。

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d492e06f-c4db-45a5-b744-b1c117f2c105/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201208T094727Z&X-Amz-Expires=86400&X-Amz-Signature=cbf9d50c5a28c47a7c8ccbe5c3b0fd03506ec59efb2714807fbf5768a5a055a6&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

參考資料：
[輕鬆應付複雜的非同步操作：RxJS Redux Observable - 胡立 (huli)](https://hackmd.io/c/MW18/%2F2X5MCfKoQxWOCOpZ7tqsgA)

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

可以透過直接檢視該網站的原始碼做簡易分辨。  

CSR：  
大部分畫面可見內容皆為在前端透過載入 JavaScript 後才動態產生，原始碼點開後無法看見實際的資料，最大的影響在於不利 SEO，因此需要透過其他的工具幫忙實現 SSR 的效果。

SSR：  
網頁內容由 server render 完成後才回傳，因此相對 CSR 來說使用者看到畫面的時間會比較快，但相對的就是將載入效能轉嫁到 server 上，因此需依據不同的需求選擇網頁的載入方式，甚至可以取兩者優點：先由 server 完成第一次渲染，之後的渲染都在客戶端執行。

## React 提供了哪些原生的方法讓你實作 SSR？

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/9502df7c-0551-4f2b-bee8-376a5c0e1faf/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201208%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201208T081326Z&X-Amz-Expires=86400&X-Amz-Signature=0417daf332a5c4b793078e7ed44201252f0b4fe5eb5e9a836a24a8506e989e1f&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

`ReactDOMServer.renderToString(element)`  
可將 component render 成實際 HTML 字串，並搭配 `ReactDOMServer.hydrate()` 將與網頁互動有關的 eventListener 注入。但因為 mount 時 call API 的動作並不會在 server 上執行，必須再以其他工具協助在 server 端先完成初始動作。

`ReactDOMServer.renderToStaticMarkup(element)`  
類似 `renderToString(element)` ，差別在於會移除 react 用於互動的 DOM 屬性如 `data-reactroot`，如果專案為單純靜態網頁可減少檔案大小。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

1. Prerender  
    雲端提供的預渲染服務，Prerender.io 可以偵測當訪問對象為搜尋引擎時就將網站頁面先完成渲染後再返回，間接完成網頁的解析。相較其他的解決方案，不僅配置簡單且不用修改原始碼。
2. Next.js  
    基於 react.js 的框架，內建 SSR 自動將 component 轉為 string，並可在每個分頁下使用 `getInitialProps` 設置該頁 render 時需要執行的非同步操作如 call API 等，在每次訪問頁面時都會先執行，讓第一次 render 時 HTML 內就會有已完成非同步操作的資料。
