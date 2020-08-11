## 資料庫欄位型態 VARCHAR 跟 TEXT 的差別是什麼

1. VARCHAR 可設定長度，適用於已知一長度範圍內的資料可節省儲存空間，且如實際資料長度小於原始設定長度還可自動縮小所需空間。
2. TEXT 無法設定長度，適用於未知長度範圍的文章、留言等。

[參考資料](https://www.tad0616.net/modules/tad_book3/page.php?tbdsn=475)  
[參考資料](https://blog.csdn.net/lkforce/article/details/79006838)

## Cookie 是什麼？在 HTTP 這一層要怎麼設定 Cookie，瀏覽器又是怎麼把 Cookie 帶去 Server 的？

1. Cookie 是一個儲存特定資訊的檔案，可讓伺服器獲得有關使用者的資訊。
2. 瀏覽器發送 Request 給 Server 後，Server 回傳 response header 中要求瀏覽器設置 Cookie(Set-Cookie)，瀏覽器接收後儲存於使用者端。而下次瀏覽器發送 Request 給 Server 便會帶上這個 Cookie，此時 Server 再分辨 Cookie 內容來獲取當下使用者的資訊。

[白話 Session 與 Cookie：從經營雜貨店開始](https://github.com/aszx87410/blog/issues/45)  
[淺談 Session 與 Cookie：一起來讀 RFC](https://github.com/aszx87410/blog/issues/45)  
[深入 Session 與 Cookie：Express、PHP 與 Rails 的實作](https://github.com/aszx87410/blog/issues/46)

## 我們本週實作的會員系統，你能夠想到什麼潛在的問題嗎？

1. 密碼存明碼：如果資料庫外洩則有危機，理論上伺服器端不該擁有使用者實際輸入的密碼。
2. 字串拼接：如同 week7 的 todolist 一樣，因為渲染網頁內容時會間接將使用者輸入的資訊直接組合在標籤語法內，如果輸入經過特殊組合的話就可以達到影響原程式碼的作用，所以應該還要再將"所有使用者可以輸入的資訊"再經過轉碼處理。
