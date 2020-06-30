## 請以自己的話解釋 API 是什麼

全名為應用程式介面(Application Programming Interface)，使用者一般常見的各種行為皆牽涉資訊交換，不論是在電腦上向作業系統提取資訊或是查看訂房網站的空房資料，資訊提供者與使用者之間為了應付巨量規模的資訊來往，需要建立一套標準且保障安全的介面，可以想像成自動販賣機以及服務生，都是透過此中間者來傳遞交換資訊。透過 WEB 以 HTTP 此協定來進行交換者即稱作 HTTP API，此外也有很多利用不同傳輸途徑/網路協定/資料處理格式的 API。

[以服務生概念解釋 API](https://www.youtube.com/watch?time_continue=8&v=zvKadd9Cflc&feature=emb_logo)  
[從拉麵店的販賣機理解什麼是 API](https://medium.com/@hulitw/ramen-and-api-6238437dc544)

## 請找出三個課程沒教的 HTTP status code 並簡單介紹

### 403 Forbidden  
伺服器已經理解請求，但是拒絕執行它。與401回應不同的是，身分驗證並不能提供任何幫助，而且這個請求也不應該被重複提交。
### 418 I'm a teapot  
本操作碼是在1998年作為 IETF 的傳統愚人節笑話, 在 RFC 2324 '超文字咖啡壺控制協定'中定義的，並不需要在真實的 HTTP 伺服器中定義。當一個控制茶壺的 HTCPCP 收到 BREW 或 POST 指令要求其煮咖啡時應當回傳此錯誤。
### 429 Too Many Requests  
用戶在給定的時間內傳送了太多的請求。旨在用於網路限速。

## 假設你現在是個餐廳平台，需要提供 API 給別人串接並提供基本的 CRUD 功能，包括：回傳所有餐廳資料、回傳單一餐廳資料、刪除餐廳、新增餐廳、更改餐廳，你的 API 會長什麼樣子？請提供一份 API 文件。

Base URL: https://myRestaurant.com

| 說明     | Method | path       | 參數                   | 範例             |
|--------|--------|------------|----------------------|----------------|
| 回傳所有餐廳資料 | GET    | /restaurants     | 無           | /restaurants |
| 回傳單一餐廳資料 | GET    | /restaurants/:id | 無                    | /restaurants/1      |
| 刪除餐廳   | POST   | /restaurants     | name: 名稱 | 無              |
| 新增餐廳   | DELETE   | /restaurants/:id     | 無 | 無              |
| 更改餐廳資訊   | PATCH   | /restaurants/:id     | name: 名稱, address: 地址, phone: 電話 | 無              |

