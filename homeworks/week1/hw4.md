## 跟你朋友介紹 Git

Git是個方便管理專案開發的版本控制工具，因開發過程常會有版本更新及多人協同等需求，Git 可有效率的獨立控管並整合各自進度，可至網路上搜尋並下載系統對應版本。

## Git 初始設定及控管流程

### 1. 初始化專案資料夾，使其被 Git 追蹤管理

>- `git init`

### 2. 設定排除控制的檔案，如個人隱私或系統檔
>- `touch .gitignore`  
建立.gitignore  
>- `vim .gitignore`  
開啟vim程式編輯忽略清單  
>- 輸入i開始編輯  
>- 輸入要忽略的檔案名稱，如 test.txt
>- 輸入完成後按 Esc 
>- 輸入 Shift + :
>- 輸入 wq (儲存並離開)

### 3. 新檔案加入版本控制時
>- `git add + "檔名"`  
將此新檔案加入 staged (暫存區) 
>- `git add .`  
*將所有新檔案都加入staged  
>- `git commit -m"此版本訊息"`  
完成建立新版本  

### 4. 已加入控制的舊檔案修改後，欲建立新版本時
>- `git add .`  
將資料夾內所有新檔案都加入staged  
>- `git commit -m"此版本訊息"`  
完成建立新版本  
>- `git commit -am "message"`  
*一步驟完成add與commit，但只適用已 add 檔案，如有未add檔案則該檔案不會 commit

### 5. 查詢用指令
>- `git status`  
查看目前版本狀態
>- `git log`  
查看歷史紀錄
>- `git log --oneline`  
較簡短查看紀錄
>- `git diff`  
查看此次更動部份

## GIT Branch - 不影響原版本下開發專案(類似備份)

>- `git branch -v`  
查看branch狀況
>- `git branch "branch name"`  
建立新Branch
>- `git branch -d "branch name"`  
刪除某Branch
>- `git checkout "branch name"`  
切換至某Branch下進行開發
>- `git checkout -b "new branch name"`  
一步驟完成新建branch及切換過去

## Git Merge - 合併 branch 
>- `git merge "branch name"`  
>將該branch合併"進來"

*如兩 branch 的同一檔案有差異會產生衝突，需依照提示手動修改完後再 commit

## 當code在本機需上傳遠端時
按照 GitHub 指示建立新 reop
>- `git remote add origin https://github.com/ahwei777/test2.git`
>- `git push origin master`  

## Git Push - 將本機進度"上推"至遠端
當本機開發完後，遠端需與本機進行同步
>- `git push origin "branch name"`

## Git Pull - 將遠端進度"下拉"至本機
當遠端有更新時，本機需同步進行更新
>- `git pull origin "branch name"`  
*如 pull 時遠端與本機有重疊更動部份會產生衝突，需手動修改本地後再 push 回遠端統一版本

## Git Clone - 下載遠端repo
>- `git clone "網址"`  
於 GitHub 可找到該 repo 的 clone 專用網址，但如不具權限則無法 pull，除非 folk 成為自己的 repo

## 整理Git Flow流程圖
![](https://i.imgur.com/NjZV0E8.png)

1. 將遠端 repo 使用 clone 功能 pull 到本機(無協作權限的專案則先folk成為自己的)
2. 在本機開新 branch 進行開發
3. 開發完後 push 回遠端 repo  
4. 發起 pull request 向作者請求 merge 回原始 repo 的 master
5. 有權限者 code review 完後同意 merge
6. 與遠端 Master 執行 Pull 重新同步，然後可將原開發用的該 Branch 刪除
>[參考：Understanding the GitHub flow](https://guides.github.com/introduction/flow/)
