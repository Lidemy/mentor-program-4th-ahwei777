## 十六到二十週心得

這週在網頁優化部分花了不少時間，就直接分享相關過程

## 網址
https://ahwei777.github.io/lazy-hackathon/

## 測試報告
[WebPageTest](https://www.webpagetest.org/result/201109_DiG0_02dbe38bb2ae63b3e5b60d1cbf2d27c8/)
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/19b971ee-6004-4f89-b375-e751401de32a/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201109T151740Z&X-Amz-Expires=86400&X-Amz-Signature=e7ddfb6c952a27e038deecdf27f1ad8d56124d20a8a6beb1c70ccb7ccd26e82a&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/?url=https%3A%2F%2Fahwei777.github.io%2Flazy-hackathon%2F&tab=mobile)：  
行動版 73 分，電腦版 99 分。

[Lighthouse Report Viewer](https://googlechrome.github.io/lighthouse/viewer/?psiurl=https%3A%2F%2Fahwei777.github.io%2Flazy-hackathon%2F&strategy=mobile&category=performance&category=accessibility&category=best-practices&category=seo&category=pwa&utm_source=lh-chrome-ext)：
![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/37f97c12-0402-4135-b61f-f2ee54bc9df3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201109%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201109T152712Z&X-Amz-Expires=86400&X-Amz-Signature=71883c5a6d38db1316d7657aa5a2bd0b4ed6e0ac061760d9188716471d16b079&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)


## 你做了哪些優化？

看完 [Website Performance Optimization](https://www.udacity.com/course/website-performance-optimization--ud884) 後大概了解網頁從發出 request 請求相關資源 > 解析程式碼 > 建構 DOM > 渲染畫面的流程，以及三個基本優化方向：  
1. Minimize Bytes
2. Reduce critical resources 
3. Shorten critical rendering path length  

然後我比較偷懶一點，之後就直接跟著 [yakim 助教的優化寶典](https://github.com/Lidemy/lazy-hackathon/issues/7)跑一遍，但沒想到前前後後也搞了三天 QQ，下面為優化過程：

1. 初步整理檔案並計算 CRP
    - html: 刪除多餘註解。
    - CSS: 移除 `material-icons`。
    - js: 移除 `sweetalert`, `angular`, `vue` , 去除 `index.js` 內未用到函式。
    - 結果：不是主要兇手，只快一兩秒。

2. 初步壓縮
    - html: 使用套件轉檔 `gulp-htmlmin`。
    - CSS: 因為有使用到較新的語法（mask）所以需先使用前綴修正套件 `gulp-postcss、autoprefixer` ，之後再使用壓縮套件 `gulp-cssnano`。
    - js: 支援 ES6 語法的壓縮套件 `gulp-terser`。
    - 結果：不是主要兇手，只快一兩秒。

3. 初步調整圖片尺寸
    - 原圖尺寸都超過實際在螢幕上可顯示的區域，超過部分都是浪費需要做調整。
    - 背景大圖壓縮為 jpg 格式。
    - yakim 助教還有考慮到 retina 螢幕解析度為兩倍的情況，覺得非常貼心跟專業。
    - [線上調整 PNG 尺寸](https://www.iloveimg.com/zh-tw/resize-image/resize-png)
    - [線上 PNG to JPG](https://png2jpg.com/)
    - 結果：圖片資源是最大兇手，整體秒數大幅減少至 25 秒（+55%）。

4. 初步壓縮圖片
    - 使用套件轉檔 `gulp-tinypng-compress`。
    - 結果：整體秒數減少至 8 秒！（+68%）。

5.  延遲載入圖片 Lazy Load
    - 引入套件 `vanilla-lazyload`。
    - 按照說明將寫在 html 內的圖片都加上相關屬性，除了寫在 css 內的背景圖以外。
    - 按照說明文件，最後還要在 DOM 載入完成後，也就是 `</body>` 結尾標籤的前方加入 `var myLazyLoad = new LazyLoad（）`，啟用函式偵測所有要 lazyload 的元素，運作原理類似監控所有已加上 `lazy` 屬性的元素是否即將進入使用者畫面，如果是的話就會把原本隱藏在屬性內的圖片路徑轉為真正的圖片路徑，然後開始載入。
    - 結果：整體秒數減少至 4 秒！（+50%）。

6. 進階壓縮圖片（webp）
    - 使用套件轉檔 `imagemin-webp`。
    - 按照說明文件修改 html 格式後，程式碼就會自動判斷瀏覽器是否支援 webp 格式並顯示，如果沒支援會再依據程式碼順序顯示指定圖片路徑。
    - 配合 lazyload 也要再修改一下屬性。
    - 如果圖片是以 CSS 載入的話較麻煩：需先加入一段 js 判斷瀏覽器是否支援後在 html 標籤內加上對應 class 名稱，然後於 CSS 內再寫好依據不同 selector 載入對應的圖片路徑。
    - 結果：整體秒數減少至 3 秒！（+25%）。

7. 減少 CSS 大小 & request（打包）
    - 使用套件 `postcss-uncss` 爬一遍 html 移除沒用到的 CSS，將最肥的 bootstrap 瘦身。
    - 使用打包套件 `gulp-concat` 把所有 CSS 打包成同一個檔案。
    - 結果：整體秒數減少至 1.5 秒！（+50%）。

8. 減少 JS 大小 & request（打包） & 延遲載入（defer）
    - 因為多引入了 lazy-load 還有 webp 的 js，所以要再把所有的 js 打包一次。
    - 使用支援 ES6 語法的壓縮套件 `gulp-terser`。
    - 使用打包套件 `gulp-concat` 把所有 js 打包成同一個檔案（除 jQuery 跟 lazyload 因為相依性需要獨立出來）。
    - 把所有的 js 都加上 `defer` 屬性就不會 block parsing，但這邊打包完有碰到一個小 bug ：原本呼叫 lazyload 的程式碼是寫在 DOM 最尾端，結果因為引入 lazyload 的 js 檔案因為 `defer` 改為在 DOM 解析完後才引入，造成呼叫時間點早於引入，所以後來改成把呼叫的該行程式碼直接加在引入的 js 檔案最後方就解決了。
    - 結果：整體秒數減少至 1.2 秒！（+20%），主要因為延遲載入 js 讓 DOM 可以不受到阻塞提早完成建構。

## 心得

原本因為進度落後就想直接把前輩們的心得當作教材，然後快速結束這一回合，但沒想到前前後後也看了不少相關的文章。實際執行相關套件的過程中也噴出不少預期外的錯誤，只能直接拿著錯誤的英文訊息當作關鍵字去搜尋解答，有些是套件本身問題或不支援 ES6 語法，或因為延後載入 js 而需要將相關的程式碼也一併延後等，每次碰壁都當作一次學習，感謝有這個作業讓我一窺網頁優化的高深學問（感覺相關知識可能兩三週都學不完），之後求職用的作品也一定要自己來試著優化看看，

以下為此次未處理到，待研究的部分：
1. jQuery 瘦身（去除未用到的函式、變數）
2. 自動偵測 Retina 螢幕並將影像換成高解析版本（Retina.js 套件）
3. 寫在 CSS 內的圖片也改用 lazy-load 載入
4. CSS sprite
5. 網站安全性
6. 快取（Cache）
7. SEO
8. server 端優化