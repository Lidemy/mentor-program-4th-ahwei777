## 期末專案規劃

# Lidemy 期末專案：線上影片學習平台

## 專案目的：
以實際作品呈現課程所學並搭配業界使用度高的框架或工具，提高求職競爭力。

## 產品靈感：
主要參考熱門線上學習平台(Udemy, Hahow...)，以及於 Lidemy 計畫學習過程中，產生可將部分學習需求整合至單一網頁內的想法，以提升學習效率。

## 產品簡介：
以線上教學影片為主的學習平台，訪客可於線上購買有興趣課程，搭配學習進度、成就紀錄、互動發問等輔助功能，多方整合學習資源以提高學習效率。
(考量素材豐富度預計先以程式語言呈現，後續可延伸如外語、健身、樂器等)

## 產品核心功能：

1. 首頁  
以網格式展示所有線上課程。  
延伸：關鍵字搜尋、熱門課程、課程評價、產品特色、聊天機器人。

2. 線上購買課程  
線上完成付款後即獲得觀看該課程資源的權限。  
延伸：購物車。

3. 我的課程  
線上觀看已購買的課程影片，參考 teachable, google classroom，教材預計借用 lidemy 或 youtube 影片呈現，  
延伸：關注課程、留言板(討論/發問)、課程通知(教材異動、公告)、課程進度、影片特定時間註記。

4. 常見問題  
讓使用者快速解決較常遇到的問題。

5. 註冊/登入/登出  
權限管理，註冊後才可觀看免費影片及購買課程。  

6. 管理後台  
圖形化介面方便管理會員資料/權限/教材/常見問題等。
延伸：站內通知、寄發廣告/促銷信。等。  

## 後階段開發功能(待核心功能完成後再決定)

1. 互動式學習 Roadmap  
以結構化的樹狀圖方式呈現課程大綱，每個學習節點都可點擊展開，訪客可快速了解課程是否符合所需。購買後該 Roadmap 可用於紀錄學習軌跡，且可瀏覽其他同學的 Roadmap 進行簡單互動(按讚、留言)，達成互相勉勵效果。  
示意圖:
![](https://miro.medium.com/max/1199/1*uwB4ao1xCzzZAHsQeblrpw.jpeg)

2. 學習成就系統
參考 Codewars 及遊戲成就系統，將學習過程拆成數個里程碑，當學生完成指定作業或挑戰就可升級或得到獎盃，增加學習成就感。  
示意圖:
![](https://sharingpillow.com/wp-content/uploads/2020/07/image-1024x483.png)

3. 學生發問系統
學生可直接發問問題請老師/助教回答，配合分類標籤便於日後搜尋，且熱門問題可被收錄至精華區，

4. 整合學習筆記
串接現有筆記平台，鼓勵學生按照適合自身方式整理筆記及學習資源，並可讓學生間互相交流分享。

5. 輔助學習小遊戲
設計簡單程式或網頁小遊戲，提升教材豐富度及互動度。

## User Story
### 訪客（一般瀏覽者/沒付費）
P1 身為訪客，我想在首頁看到所有課程，因為我想知道有哪些課程可以選擇。  
P1 身為訪客，我想註冊成為會員，因為我想購買課程。  
P1 身為訪客，我想了解常見問題，幫助快速找到解答。  
P1 身為訪客，我想有登入功能，因為才可行使會員權利。

P2 身為訪客，我想在首頁就能看到簡單的平台介紹。  
P2 身為訪客，我想在首頁就能以關鍵字搜尋有興趣的課程。  
P2 身為訪客，我想了解更多此平台（About 頁面），有助了解這個平台。  
P2 身為訪客，我想觀看特定課程的評價，因為我想知道其他人對這堂課的看法。  

P3 身為訪客，我想搜尋課程/知識主題，因為可更快找到有興趣的課程/主題。  
P3 身為訪客，我想觀看課程 Roadmap，因為我想快速了解課程架構。

### 一般會員（沒付費）
P1 身為一般會員，我想要有登出功能。  
P1 身為一般會員，我想直接購買喜歡的課程，這樣才能擁有觀看課程的權限。

P2 身為一般會員，我想把喜歡的課程加入購物車，因為我想方便瀏覽購買清單跟只跑一次結帳流程。  
P2 身為一般會員，我想把購物車結帳，因為才能正式獲得觀看課程權限。  
P2 身為一般會員，我想看到更多的課程內容(免費影片)，因為我想確認實際課程的品質。  

P3 身為一般會員，我想有個關注清單，因為我想每次都可快速找到我看過的課程。

### 付費會員(個人)
P1 身為付費會員，我想在我的課程頁面看到所有已購買課程，方便日後觀看。  
P1 身為付費會員，我想在我的課程頁面直接觀看，方便日後觀看。  

P2 身為付費會員，我想在我的課程頁面看到上課的進度(%)，了解學習狀況。  
P2 身為付費會員，我想在我的課程頁面以關鍵字快速找到已購買的課程。

P3 身為付費會員，我想瀏覽自己的成就系統，有助了解學習成效。  
P3 身為付費會員，我想在影片下方留下註解，因為方便我日後複習。
P3 身為付費會員，我想看到 Roadmap 的所有內容，因為我已經購買課程。  
P3 身為付費會員，我想在 Roadmap 的 node 上標記完成，因為這樣使我知道自己看過哪些內容。  
P3 身為付費會員，我想註解自己的 Roadmap，因為我想留下學習筆記。  

### 付費會員(互動)
P2 身為付費會員，我想在我的課程頁面進行留言(發問)，可以與他人互動或解答學習問題。  
P2 身為付費會員，我想有通知功能(站內or寄信)，因為我想知道已購買的課程是否有更動。

P3 身為付費會員，我想要有通知功能(站內or寄信)，因為我想知道別人在我 Roadmap 留下的註解。  
P3 身為付費會員，我想在 Roadmap 的 node 上留言，因為我想對課程發表意見或發問。  
P3 身為付費會員，我想在 Roadmap 的每個 node 搜尋留言內容，因為這樣方便我遇到問題時快速找到解答。  
P3 身為付費會員，我想要分享我完成的內容給別人，因為我想讓別人知道自己學過哪些內容。

### 站方管理員(暫定同為開課者)
P1 身為站方管理員，我想要有圖形化介面的管理後台，方便有效率管理。  
P1 身為站方管理員，我想在管理後台管理所有教材的內容，因為可以視/情況更新。  
P1 身為站方管理員，我想在管理後台查看所有會員的資料，因為這方便我管理會員/發促銷廣告信。  
P1 身為站方管理員，我想在管理後台管理所有會員的權限，因為我需要讓有惡意的使用者無法使用本系統。

P2 身為站方管理員，我想在管理後台發布通知，因為我需要告知訊息給相關會員。  
P2 身為站方管理員，我想要屏蔽評論的內容，因為我需要讓惡意留言消失。  
P2 身為站方管理員，我想要設定成就機制，因為我要讓會員可以審視自己或他人的學習成果。  
P3 身為站方管理員，我想要有設定課程是否公開的功能，因為我需要停止違法的資訊散播出去。

### 外部開課者(客製 Roadmap)
P3 身為開課者，我想要創造自己的 Roadmap，因為這讓我可以按自己專長為別人安排學習路徑。  
P3 身為開課者，我想要 Roadmap 可以隨意拖拉位置，因為這樣製作比較直觀。  
P3 身為開課者，我想要 Roadmap 可以插入圖片/文字/連結，因為這樣內容更為豐富。  
P3 身為開課者，我想要編輯自己的 Roadmap，有需要時可更新課程內容。  
P3 身為開課者，我想要編輯 Roadmap 時有 undo redo 功能，因為這方便我進行錯誤處理。  
P3 身為開課者，我想要設定別人可編輯我 Roadmap 的權限，因為這方便我們一起編輯。  
P3 身為開課者，我想要 Roadmap 版本記錄，因為這方便我切換到上版本。  
P3 身為開課者，我想要製作 Roadmap 時有儲存草稿的功能，方便後續繼續製作。  
P3 身為開課者，我想要收到評論通知，因為我可以即時回覆及得到回饋。