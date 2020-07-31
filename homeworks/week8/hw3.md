## 什麼是 Ajax？

AJAX 是「Asynchronous JavaScript and XML」（非同步的 JavaScript 與 XML 技術）的縮寫，簡單說就是網頁不用重新整理，就能即時地透過瀏覽器去跟伺服器溝通，撈出資料。

>參考資料：  
[[JS] AJAX 筆記](https://medium.com/%E9%A6%AC%E6%A0%BC%E8%95%BE%E7%89%B9%E7%9A%84%E5%86%92%E9%9A%AA%E8%80%85%E6%97%A5%E8%AA%8C/js-ajax-%E7%AD%86%E8%A8%98-b9a57976fa60)

## 用 Ajax 與我們用表單送出資料的差別在哪？

表單單純透過 HTML 元素直接將資料攜帶至目標頁面，接收的伺服器回傳 response 給瀏覽器後直接渲染出結果，與 Ajax 最明顯的差別就是一定會換頁及單向式的傳遞接收流程。

## JSONP 是什麼？

即 JSON with Padding，因圖片以及 script 標籤不受同源政策的管理，故反而可利用此一特性(漏洞?)，將欲傳送的資訊偷渡在 js 來源內，而伺服器端也可透過夾帶於網址上的參數來填充(padding)對應資料。

簡言之：透過附加在網址上帶過去的 callback 函式名稱作為參數(由 Server 端提供)，Server 接收到後再把把JavaScript 物件填充進該 Function 裡面，等回傳後就可呼叫 callback 函數取得資料，

>參考資料：  
[使用 JSONP 跨站請求](https://openhome.cc/Gossip/JavaScript/JSONP.html
)  
[輕鬆理解 Ajax 與跨來源請求](https://blog.techbridge.cc/2017/05/20/api-ajax-cors-and-jsonp/)

## 要如何存取跨網域的 API？

瀏覽器因為安全性的考量而有同源政策(Same-origin policy)規範，如果當前網域與要呼叫的 API 網域(或端口)不同即為「不同源」，瀏覽器仍會發 Request 也有收到 Response 但擋下來不傳給使用者。  

如要存取跨網域資料需符合 Cross-Origin Resource Sharing，(CORS 跨來源資源共享規範)，即 Server 必須在 Response 的 Header 裡面加上 Access-Control-Allow-Origin。

## 為什麼我們在第四週時沒碰到跨網域的問題，這週卻碰到了？

第四週透過 Node 發送並無相關規範，這週開始透過瀏覽器(守門員)發送 request ，就會因安全性受到跨網域的限制。
