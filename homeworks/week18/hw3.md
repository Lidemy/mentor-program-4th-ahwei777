## 什麼是反向代理（Reverse proxy）？

![](https://i.ytimg.com/vi/R2I8BBXnJJ8/hqdefault.jpg)

### 正向代理
Client 端發送一個 request 先連到 proxy server，proxy server 幫我轉發到我想要連到的網站，這時那個網站收到的 request，他只知道請求過來的身分是 proxy server，而不知道真實的 client 的身分。

好處：
1. 隱藏真實 client 身分
2. 可透過當地的代理伺服器來連線有限制訪問來源位置的網站
3. 代理伺服器可實現其他功能，如將目的伺服器的 response 儲存至快取，避免大量訪問加重伺服器負擔並加快 response 回傳速度。

### 反向代理
Client 端發送一個 request 到我想要連的網站，這個網站背後可能就會有好幾台的 Server 來為我們服務（ex: 負載平衡），為了應付高流量的狀況，會將請求分配到不同的 Server，而 Client 根本不會知道具體到底是哪一台 Server，而 Client 也不需要知道，Client 只需要知道反向代理 Server是誰就好。

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/bebcd089-893e-4cff-b3d2-039b9bdab69a/reverse-proxy.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201030%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201030T071219Z&X-Amz-Expires=86400&X-Amz-Signature=42a2828f3072973d50b2e8db465f1664a7afa2b3268e2852d33e8e1709749b6b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22reverse-proxy.png%22)

好處：
1. 負載平衡。
2. 在一台主機上運行不同服務，反向代理器可偵測透過不同網域進來的訪問分別導向不同服務
3. 方便使用者記憶不同服務的網址，並同時隱藏實際 port 的資訊。

```
反向代理實作舉例：
我在 ip: 1.1.1.1 的 port 80 設置一台反向代理伺服器，服務所有透過 http 訪問的使用者
並透過不同 port 提供以下兩個服務；
1. 1.1.1.1:4001 短網址服務
2. 1.1.1.1:5001 縮圖服務
此時一樣可透過實際 IP 位置及 port 來使用該服務，但為了方便使用者記憶及隱藏真實 port 資訊
透過不同子網域設定可實現這些需求：
aaa.cs49.tw => 指向同一台主機 1.1.1.1 => 反向代理伺服器偵測到訪問子網域為 aaa => 轉給 port 4001
bbb.cs49.tw => 指向同一台主機 1.1.1.1 => 反向代理伺服器偵測到訪問子網域為 bbb => 轉給 port 5001
```

## 什麼是 ORM？

全名 Object-Relational Mapping，中文為「物件關係映射」，關聯式資料庫映射至物件導向的資料抽象化技術。其理念是將資料庫的內容映射為物件，讓程式開發人員可以用操作物件的方式對資料庫進行操作，而不直接使用SQL語法對資料庫進行操作。

### 優點：
1. 簡單使用：省去繁瑣的 SQL 指令，利用直覺的物件操作可以快速完成一般的資料庫操作。
2. 提升安全性：可防止 SQL Injection。
3. 方便轉移：當資料庫發生改變時，不需改動模型只需修改映射關係。

### 缺點：
1. 犧牲性能：無可避免的自動化代價。
2. 可能誤判：複雜 query 的情況下，ORM 可能會「誤判」使用者操作，導致產出結果與預期不同。
3. 侷限性：無法支援所有 SQL 處理資料方法，某些特殊指令還是要自己寫 SQL 達成目標。

參考資料：  
[ORM介紹及ORM優點、缺點](http://blog.twbryce.com/what-is-orm/)  
[SQL三部曲:你不需要ORM](https://tecky.io/en/blog/SQL%E4%B8%89%E9%83%A8%E6%9B%B2:%E4%BD%A0%E4%B8%8D%E9%9C%80%E8%A6%81ORM/)  
[ORM v.s. SQL](https://medium.com/tds-note/orm-v-s-sql-91e003089a61)

## 什麼是 N+1 problem？

當 ORM 進行如 where 或一對多的關聯查詢時，因自動化緣故會直接將所有資料取出(1 次)後再逐一以每筆資料去查詢其關聯資料庫(N 次)，總共需要 N + 1 次指令與資料庫互動，當資料龐大時會明顯拖慢網站的速度及浪費伺服器效能，而同樣的查詢其實只要利用原生的 SQL join 語法就可以快速完成。

解決方式像部分 ORM 如 Sequelize 有提供關聯資料庫的功能，在查詢時先將關聯資料表 include 進來就可達成 JOIN 語法，減少多次查詢所耗費的效能與時間。

參考資料：  
[ORM — N+1 Problem](https://medium.com/@hung_x0x0/orm-n-1-problem-c98e39b9c96)  
[什么是ORM中的N+1](https://www.the5fire.com/what-is-orm-n+1.html)  
[N + 1 Query 網站效能問題](https://medium.com/@chaowu.dev/rails-n-1-query-41aa92ffb92e)