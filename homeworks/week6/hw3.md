## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。

1. `<hr>` 加入分隔線
2. `<textarea>` 加入可輸入文字的區域
3. `<table>` 加入表格

>*因為網路資料已整理的精美詳細，手拙如我就不再花時間整理，之後需要時直接查閱。
[HTML標籤列表](http://web.thu.edu.tw/hzed/www/tag.htm)


## 請問什麼是盒模型（box modal）

在 CSS 裡面，html 的每個元素都可被視作一個盒子，各屬性如下圖依序包裹在 content 的外層，加入各屬性不會影響到原始設定的 content 大小(height & width) ，但如果希望控制加入各屬性後的整體大小，可調整屬性 `box-sizing:border-box`，就會將除 margin 以外的屬性考慮進去後自動將 content 內縮調整。
![](https://guxinyan.github.io/blogImg/%E6%A0%87%E5%87%86%E7%9B%92%E6%A8%A1%E5%9E%8B.png)

## 請問 display: inline, block 跟 inline-block 的差別是什麼？

**block**
各元素自己就會獨佔一整行，可設定寬高調整大小，區塊與區塊彼此間都會換行排列。

**inline**
各元素會在同一行內依序排列下去，無法調整各元素高度，各元素間不會換行(但如 html 內標籤間有換行/空格符號時還是會換行/空格)

**inline-block**
結合 block 與 inline 的特點，可設定寬高，同時區塊與區塊彼此間不會換行排列。

比較圖：
![](http://4.bp.blogspot.com/-TiwOixlooJk/U4UyEnv_XpI/AAAAAAAACFs/NuuLz2IvoZ4/w1200-h630-p-k-no-nu/css-display-block-vs-inline-block.png)

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？

1. `static`
  - 預設值。
  - 照著瀏覽器預設配置自動排版在頁面上(依據 in-line, block 等本身特性)。
2. `relative`
  - 設定 top 、 right 、 bottom 和 left 屬性，會使其元素「相對」調整其「原本」該出現的位置。
  - 不會影響其他元素所在位置。
3. `absoulte`
  - 定位將參考其所處「上層容器的相對位置」。
  - 如其上層容器並沒有「可被定位」的元素，則此元素定位就是相對於該網頁所有內容（也就是 <body> 元素）最左上角的絕對位置，看起來就是這張網頁的絕對位置一樣，所以當你的畫面在捲動時，該元素還是會隨著頁面捲動。
  - 只有套用 position: static 的元素屬於「不會被特別定位」的元素，套用 static 以外的屬性值都算是「可被定位」的元素。
  - 設為 absolute 的元素將離開原排序系統，故後續元素將忽略其作依序遞補，故會影響其他元素所在位置。
4. `fixed`
  - 此元素會相對於「瀏覽器視窗」進行定位，也就是即便頁面捲動還是會固定在相同的位置。

>參考資料：
[學習 CSS 版面配置 - 關於 position 屬性](https://zh-tw.learnlayout.com/position.html)