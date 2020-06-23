## 交作業流程

1. 透過導師提供的 GitHub Classroom 授權連結建立屬於自己的作業 repo (即課綱複製版)。

2. 至該 repo 頁面將其 clone 至本機   
`git clone "github clone 專用網址"`  
*注意：repo名稱應為 mentor-program-4th-"自己在 GitHub 的 ID "

3. 因正式開發流程會避免更動主幹（Master），故每次開發前均需先建立新 Branch  (以下用 week1 舉例)  
`git branch week1` - 新增 "week1" 這個 branch  
`git checkout week1` - 切換至 "weel1" 這個 branch    
*也可以單一指令 `git checkout -b "week1"` 完成以上兩步驟

4. 寫完該週全數作業並確認均已檢查完畢及看過自我檢討修正錯誤

5. 如本週有新增檔案需先加入 Git  
`git add .`　(全部 untracked files 均加入)

6. 執行 commit 指令，完成本機版本更新  
`git commit -am "commit message"`

7. 將本機該週 Branch（week1） 更新至遠端  
`git push origin "week1"`

8. 開啟 GitHub 頁面，點擊 Pull Requests 內的 **"Compare & pull request"**

9. 輸入訊息(如有問題一併提出)，完成後點擊 **"Create pull request"**

10. 至 Lidemy 學習系統→作業列表→新增作業→選擇週次及貼上該次 PR 的網址

11. 至學習系統上將該週進度打勾

12. 待助教改完作業確認無誤後會將該週 Branch merge 至遠端 Master，並刪除遠端上該週 Branch

13. 待發現遠端已 merge 完成後，將本機切至 Master (尚未更新)後與遠端 Master (批改後版本)進行同步  
`git checkout master`
`git pull origin master`

14. 將本機該週 Branch（week1）刪除  
`git branch -d week1` 

15. 完成本週作業流程，下週以後直接從步驟 3 開始