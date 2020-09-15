## Webpack 是做什麼用的？可以不用它嗎？

它是一個「打包工具」。將眾多模組與資源打包成一包檔案，並編譯我們需要預先處理的內容，變成瀏覽器看得懂的東西，讓我們可以上傳到伺服器。

webpack 也只是一個方便的自動化工具，如果不使用它也可以使用其他轉換工具，或是自己將程式碼轉換成瀏覽器看得懂的方式。

![](https://blog.huli.tw/img/mods/web.png)

## gulp 跟 webpack 有什麼不一樣？

雖然兩者同樣可完成許多類似的工作，但兩個工具本身定位其實差異很大。

gulp: 
1. 本質為"管理"各種任務，並依據使用者想要的方式安排執行順序，看似可完成的許多功能只是由引入的 plugin 所提供。
2. 原則上只要能寫的出來的任務都能執行，相比 webpack 更不受限( 如自動call api, 校正時間等)。

webpack: 
將各種資源透過 loader 載入並同時進行轉換，例如將瀏覽器上原生不支援度的語法轉成可支援、壓縮圖片及程式碼、編譯 SCSS等。

參考資料：  
[webpack 新手教學之淺談模組化與 snowpack](https://blog.huli.tw/2020/01/21/webpack-newbie-tutorial/)  
[關於 Webpack，它是什麼？能夠做什麼？為什麼？怎麼做？](https://askie.today/what-is-webpack/)

## CSS Selector 權重的計算方式為何？

比較順序：(超特例) !important > (特例) inline style > id > class > 標籤 

1. 先比較 id 數量
2. 再比較 class/pseudo class/attribute 數量
3. 最後比較 tag(標籤)數量
4. 指定越詳細者贏，均相同時比較程式碼出現順序(後解析者贏)

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/dc3681c4-3a41-403e-a485-f5d871805943/CSS-Specificity-full.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200915%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200915T151712Z&X-Amz-Expires=86400&X-Amz-Signature=56ebbcf60bb5b720ad1796f4ccea8ed73951de1db8f8d0ab20b94b57275260a1&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22CSS-Specificity-full.png%22)

參考資料：[強烈推薦收藏好物 – CSS Specificity (CSS 權重一覽)](https://muki.tw/tech/css-specificity-document/)