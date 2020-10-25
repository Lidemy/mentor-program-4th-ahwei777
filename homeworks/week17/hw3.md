## 什麼是 MVC？

Model-View-Controller 簡稱，為軟體工程的一種分工架構，目的為實現動態程式設計，方便簡化後續修改和擴充，並使程式結構更加直覺，但因為依據功能嚴格分離的關係，如果小型專案不一定適合以 MVC 架構開發，且因為增加中間控制者及分工的關係有可能造成程式執行速度下降。
![](https://imgur.com/bVwaxlv.jpg)

參考資料：  
[維基百科](https://zh.wikipedia.org/wiki/MVC)  
[一起走向MVC(上)](https://www.infolight.com/new/ShareDetail.aspx?DocumentID=NDUz)  
[MVC架構是什麼？認識 Model-View-Controller 軟體設計模式](https://tw.alphacamp.co/blog/mvc-model-view-controller)


## 請寫下這週部署的心得

這次作業前前後後改來改去花了整整四五天，最後部署以為會很快但卻一直漏掉一些小設定，於是趁著機會整理起來幫助之後可以提醒自己：

1. 部署前依據 Heroku 的執行方式，必須先將一些環境變數獨立出來，執行時會再根據遠端環境來讀取

app.js

```
const port = process.env.PORT || 3000;
//  Heroku 會自己分配提供的 port 不可寫死
app.use(
  session({
    // secret 是伺服器用來加密 session 作為驗證，屬於敏感資訊也要放在環境變數內
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  }),
);
```

package.json
```
//  讓 Heroku 知道此專案的執行語言版本
"engines": {
    "node": "12.x"
  },

//  部署後預設啟動指令為 npm run start ，將資料庫初始化等指令一併寫入
"scripts": {
    "db:seed": "npx sequelize-cli db:seed:all",
    "db:migrate": "npx sequelize-cli db:migrate",
    "start": "npm run db:migrate && npm run db:seed && node app.js"
  },
```

2. 申請好 Heroku 帳號後直接以 git 方式上傳專案程式碼  
`$ git init`  (gitignore 設定忽略模組及敏感資訊)
`$ git add .`
`$ git commit -am 'commit message'`
`$ heroku create "專案名稱" (沒輸入則隨機產生)`  (此時會一併與 remote 建立連結)
`$ heroku addons:create cleardb:ignite`  (如要使用免費資料庫需先完成信用卡綁定)

3. 至 Heroku 的網頁端確認並輸入相關 Config Vars，如前面提到的 session 密鑰與建立好的 DATABASE_URL

4. 最後檢查後即可將所有程式碼 push 至遠端，上傳完畢後會自動部署並啟動
`$ git push heroku master` (可以打開 log 觀看部署是否順利)

5. 至網頁端可連結到專案或以 CLI 輸入以下指令
`$ heroku open`

## 寫 Node.js 的後端跟之前寫 PHP 差滿多的，有什麼心得嗎？

這次從後端到前端的整個流程一手包辦真的是痛苦的一週，但相比之前 PHP 各種邏輯參雜在一起開檔案開到昏天暗地，這次透過 express 自動建立好的結構化目錄跟路由導向，加上透過 ORM 方式可以直接以類似函式概念操作資料庫，雖然過程中使用到很多才算剛認識但還不算熟悉的 Promise 語法，需要再花些時間整理觀念跟查資料，但整體寫起來真的會覺得舒服很多跟莫名覺得有股成就感。

這次抽獎 API 也參考了 huli 之前提到的 RESTFUL 規則趁機複習一下 API 溝通跟回傳的流程，另外前端抽獎機率跟介面部分也延續了之前 todo-list 的概念，花了很多時間讓管理者可以用比較簡單且不會讓抽獎機率爆炸的方式設定獎項，總覺得這週有種把前幾週的小魔王全部再打一遍的感覺(像洛克人打西格瑪之前要再打一次小王分身)。