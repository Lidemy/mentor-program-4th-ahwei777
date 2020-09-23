## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

### 網域名稱系統（DNS：Domain Name System）

實際上電腦之間的網路連線是透過數字組成的 IP 地址，人類為了方便記憶而使用字母組成各式網域名稱，如 www 代表「WWW 伺服器」、edu 代表「Education」、tw 代表「Taiwan」，再透過 DNS 伺服器階層式查詢到這個網址所對應的實際 IP 位址。

### Google 提供公開 DNS，對 Google 及對大眾的好處是什麼？
Google 的好處：  
Google 為大型流量入口服務商，可以蒐集使用者的網路行為及個人資料，有助其營利的廣告行為。

大眾的好處：
1. 利用其大流量的優勢可以預先存入大量快取，加快 DNS 查詢的時間。
2. Google DNS主機位於 DNS root 下的第一層，所以查詢最多往上一層就可以得到結果，加快 DNS 查詢的時間。
3. 把關較嚴格，避免惡意行為。

[DNS 伺服器是什麼？如何運用？](https://www.stockfeel.com.tw/dns-%E4%BC%BA%E6%9C%8D%E5%99%A8%E6%98%AF%E4%BB%80%E9%BA%BC%EF%BC%9F%E5%A6%82%E4%BD%95%E9%81%8B%E7%94%A8%EF%BC%9F/)  
[第十九章、主機名稱控制者： DNS 伺服器](http://linux.vbird.org/linux_server/0350dns.php)
[使用 Google Public DNS 服務，上網速度不一定會變快！](https://blog.miniasp.com/post/2009/12/08/Use-Google-Public-DNS-may-not-surfing-faster-as-you-expected)  
[什麼是 DNS？ | GoDaddy](https://www.youtube.com/watch?v=MbGLTR3yE6o&feature=emb_logo)

## 什麼是資料庫的 lock？為什麼我們需要 lock？

因為伺服器上線後會很容易遇到需要同時處理多個 request 的狀況，此時如果先後順序沒有切割開來的話可能會造成商品超賣狀況，所以就需要於執行 query 時使用 Lock 語法，可鎖住指定的 row 或 table 讓後續的 query 等待完成後才執行，確保了同一資源不會被同時編輯，但也因此會造成資源損耗。

[資料庫的交易鎖定 Locks](https://www.qa-knowhow.com/?p=383)

## NoSQL 跟 SQL 的差別在哪裡？

NoSQL(Not Only SQL)，也就是不限定為「關聯式資料庫」的資料庫管理系統的統稱，在操作上 NoSQL 並不支持 SQL 語法 與 SQL 的邏輯。所以，NoSQL 資料庫通常不使用關聯模型，也並不需要固定的結構 (也就是 schema-free)。但有需要時， NoSQL 也可以使用關聯模型與 schema。

實務上隨著行動裝置與互聯網的普及，加上各種社群網站流量爆發式的增長，開始進入「使用者生產內容 (user generated content)」為主流的時代，大型服務如 Youtube、Facebook 每分每秒需要處理的資料量將是過去一般網站的非常多倍。

而從使用者的角度來看，他們在這些平台上對於資料的需求也跟過去不太一樣。資料庫的主要功能，從過去的「能夠無錯誤地同步處理結構清楚的資料」，到現在慢慢有新需求誕生：「處理高速且大量產生的資料，但不需要即時同步，也不需絕對地零錯誤。」為了呼應這個需求，NoSQL 資料庫就隨之興起了。

[SQL/NoSQL是什麼？認識資料庫管理系統DBMS](https://tw.alphacamp.co/blog/sql-nosql-database-dbms-introduction)

## 資料庫的 ACID 是什麼？

- Atomicity (原子性) : 資料操作不能只有部分完成。一次的 transaction 只能有兩種結果：成功或失敗。
- Consistency (一致性)：transaction 完成前後，資料都必須永遠符合 schema 的規範，保持資料與資料庫的一致性。
- Isolation (隔離性)：資料庫允許多個 transactions 同時對其資料進行操作，但也同時確保這些 transaction 的交叉執行，不會導致數據的不一致。
- Durability (耐久性)：transaction 完成後，對資料的操作就是永久的，即便系統故障也不會丟失。

[MySQL 基本運作介紹，從資料庫交易與 ACID 特性開始](https://tw.alphacamp.co/blog/mysql-intro-acid-in-databases)  
[如何理解数据库事务中的一致性的概念？](https://www.zhihu.com/question/31346392)