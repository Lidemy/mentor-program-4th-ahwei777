## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

1. 最大差別在於可逆性，雜湊為無限輸入對應有限輸出，無法逆推只能用暴力破解，也因此特性有極低機率產生碰撞(兩個輸入對應相同雜湊結果)，而碰撞機率高低也用於衡量一個雜湊函數的好壞。
2. 為了增加被破解的難度，主機端可額外產生一組隨機字串加在使用者輸入原密碼的某個位置(加鹽)，增加密碼長度後因為組合變更多讓被破解的難度更高。

[[資訊安全] 密碼存明碼，怎麼不直接去裸奔算了？淺談 Hash , 用雜湊保護密碼](https://medium.com/@brad61517/%E8%B3%87%E8%A8%8A%E5%AE%89%E5%85%A8-%E5%AF%86%E7%A2%BC%E5%AD%98%E6%98%8E%E7%A2%BC-%E6%80%8E%E9%BA%BC%E4%B8%8D%E7%9B%B4%E6%8E%A5%E5%8E%BB%E8%A3%B8%E5%A5%94%E7%AE%97%E4%BA%86-%E6%B7%BA%E8%AB%87-hash-%E7%94%A8%E9%9B%9C%E6%B9%8A%E4%BF%9D%E8%AD%B7%E5%AF%86%E7%A2%BC-d561ad2a7d84)

## `include`、`require`、`include_once`、`require_once` 的差別

1. `include`
- 每次遇到 include 時都會重新讀取/評估該檔案，適合用於迴圈或條件判斷的語句裡根據情況決定是否引入該檔案。
- include 遇到錯誤(如檔案不存在或語法錯誤時)：只會生成警告，後續指令碼會繼續執行，適合引入如果出錯對系統影響不大的介面文件等。
- include 有返回值

實務運用：
include 一般是放在流程控制的處理區段中。PHP 在執行到 include 該語句位置時才會將它讀進來，可以把程式執行時的流程簡單化並增加效率。
include 適合用來匯入動態的程式碼。

2. `require`
- require 會在一開始就將目標檔案的內容讀入，並且把自己本身代換成這些讀入的內容，而這個讀入且代換的動作是在 PHP 引擎編譯你的程式碼的時候發生，而不是發生在 PHP 引擎開始執行編譯好的程式程式碼的時候。
- 因為一開始就會將所有引入檔案的程式碼完成代換，如果是重複引入相同檔案比起 include 每次都要讀取的方式可以增加效率。
- require 放在計算結果為假的 if 語句中，依然會引入指定檔案，因為一開始就會將所有檔案引入並代換。
- 如同字面意思「需要」，如遇到錯誤(如檔案不存在或語法錯誤時)會生成致命錯誤（fatal error），後續程式碼皆停止執行並終止，故適合引入重要系統文件，如該文件出錯則程式即終止。
- require沒有返回值

實務運用：
require 通常放在 PHP 程式的最前面，PHP 程式在執行前，就會先讀入 require 所指定引入的檔案，使它變成 PHP 程式網頁的一部份。
require 適合用來匯入靜態的程式碼。

3. `include_once`、`require_once`
讀取機制及報錯皆與原功能相同，差別在於 PHP 會先檢查此檔案是否已經引入過了，如果有就不會再去打開檔案重新引入，如果沒有才會去執行引入動作，以避免重複的輸入或輸出、函数重定義及變量重新赋值等問題。也因為會先判斷一下此檔案是否已引入過，如只比較執行一次的效率會較原函數低。

4. 簡單總結：
incluce 每次執行會根據條件讀入該檔案、報錯時繼續執行。
require 程式執行前就完成替換、報錯時終止執行。
加上 _once 表示會先判斷此檔案是否已引入過，如果是的話就不引入。

[PHP 中 include 和 require 的区别详解](https://blog.csdn.net/Tacks/article/details/86480586)
[深入理解require與require_once與include以及include_once的區別](https://codertw.com/%E7%A8%8B%E5%BC%8F%E8%AA%9E%E8%A8%80/239900/)
[PHP：require V.S. include](http://code-beginner.logdown.com/posts/389687-phprequire-vs-include)
[include與require的區別](https://codertw.com/%E5%89%8D%E7%AB%AF%E9%96%8B%E7%99%BC/52432/)

## 請說明 SQL Injection 的攻擊原理以及防範方法

攻擊原理：使用者利用組合、拼湊的方式在輸入字串中夾帶惡意的 SQL 指令，因此竊取或竄改資料庫中的內容。

防範方法：利用 prepare statement 處理所有使用者可以輸入的資訊。

##  請說明 XSS 的攻擊原理以及防範方法

攻擊原理：使用者在輸入資料欄位中帶有惡意程式碼以對網頁進行操作如重新導向釣魚網站。

防範方法：在網頁讀取並顯示使用者輸入資料時，先利用字元跳脫函數進行處理以避免被解析成程式碼而執行。

## 請說明 CSRF 的攻擊原理以及防範方法

攻擊原理：攻擊者通過一些技術手段欺騙用戶的瀏覽器去存取一個自己曾經認證過的網站並執行一些操作（如發郵件，發訊息，甚至財產操作如轉帳和購買商品）。由於瀏覽器曾經認證過，所以被存取的網站會認為是真正的用戶操作而去執行。這利用了web中用戶身分驗證的一個漏洞：簡單的身分驗證只能保證請求發自某個用戶的瀏覽器，卻不能保證請求本身是用戶自願發出的。

防範方法：
1. 使用者每次使用完網站後就立刻登出，讓認證狀態無法維持被利用。

2. 伺服器檢查 Referer：
伺服器可由 request header 中檢查 referer 以判斷 request 是否來自合理的網域，但因為此完全依賴瀏覽器發送正確的 Referer 欄位，並無法保證來訪瀏覽器可以具體實現或被使用者關閉，加上也無法保證瀏覽器沒有安全漏洞。

3. 設置無法被攻擊者猜出的 token 做驗證：
- 基本款：伺服器端儲存於 session 內，再設置於合法網域內的 form 內，使用者送出表單時即可進行比對驗證。 
- Double Submit Cookie：方式與上相同，但改儲存在使用者端的 cookie 內，伺服器收到資料時比對 cookie 內的 token 與 form 內的 token 是否相等。
- client side 的 Double Submit Cookie：因為攻擊者所在網域無法讀寫目標網站的 cookie (request 內的 token 與 cookie 內的 token 不同)，所以也可由使用者端直接生成 token 並設置於 cookie 及 header 內。

4. 透過瀏覽器設置 cookie 只允許 same site 使用。  
`Set-Cookie: session_id=ewfewjf23o1; SameSite=Strict`  
Strict(預設)，拒絕所有 cross site request  
`Set-Cookie: foo=bar; SameSite=Lax`  
Lax(較寬鬆)，`<a>`, `<link rel="prerender">`, `<form method="GET">` 這些都還是會帶上 cookie。但是 POST 方法 的 form，或是只要是 POST, PUT, DELETE 這些方法，就不會帶上 cookie。

[wiki-跨站請求偽造](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
[讓我們來談談 CSRF](https://blog.techbridge.cc/2017/02/25/csrf-introduction/)