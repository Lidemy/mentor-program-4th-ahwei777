1. call stack 開始堆疊
2. i 初始值為 0，符合迴圈條件進入迴圈，呼叫 console.log('i: ' + i)，輸出 i: 0
3. 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，倒數結束後將 call back 函示丟回 event queue, 並等待 call stack 清空。
4. i 遞增 + 1 = 1
5. i = 1，符合迴圈條件進入迴圈，呼叫 console.log('i: ' + i)，輸出 i: 1
6. 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，倒數結束後將 call back 函示丟回 event queue, 並等待 call stack 清空。
7. i 遞增 + 1 = 2
8. i = 2，符合迴圈條件進入迴圈，呼叫 console.log('i: ' + i)，輸出 i: 2
9. 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，倒數結束後將 call back 函示丟回 event queue, 並等待 call stack 清空。
10. i 遞增 + 1 = 3
11. i = 3，符合迴圈條件進入迴圈，呼叫 console.log('i: ' + i)，輸出 i: 3
12. 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，倒數結束後將 call back 函示丟回 event queue, 並等待 call stack 清空。
13. i 遞增 + 1 = 4
14. i = 4，符合迴圈條件進入迴圈，呼叫 console.log('i: ' + i)，輸出 i: 4
15. 因為 setTimeout 屬於執行環境的 API，故會外包給(瀏覽器/node)協助處理倒數，倒數結束後將 call back 函示丟回 event queue, 並等待 call stack 清空。
16. i 遞增 + 1 = 5
17. i = 5，不符合迴圈條件跳出迴圈
18. call stack 清空
(因上方程式碼執行快速，以下五個 function 幾乎為同時開始倒數)
19. API 倒數 0 秒後放入 event queue，此時 event loop 偵測到 call stack 為空，將 call back 函示 () => { console.log(i) } 丟進 call stack 執行，函示內呼叫 console.log(i), 當前函示作用域無 i 的值故向上一層 global 找到 i = 5, 故輸出 5
20. API 倒數 1 秒後放入 event queue，此時 event loop 偵測到 call stack 為空，將 call back 函示 () => { console.log(i) } 丟進 call stack 執行，函示內呼叫 console.log(i), 當前函示作用域無 i 的值故向上一層 global 找到 i = 5, 故輸出 5
21. API 倒數 2 秒後放入 event queue，此時 event loop 偵測到 call stack 為空，將 call back 函示 () => { console.log(i) } 丟進 call stack 執行，函示內呼叫 console.log(i), 當前函示作用域無 i 的值故向上一層 global 找到 i = 5, 故輸出 5
22. API 倒數 3 秒後放入 event queue，此時 event loop 偵測到 call stack 為空，將 call back 函示 () => { console.log(i) } 丟進 call stack 執行，函示內呼叫 console.log(i), 當前函示作用域無 i 的值故向上一層 global 找到 i = 5, 故輸出 5
23. API 倒數 4 秒後放入 event queue，此時 event loop 偵測到 call stack 為空，將 call back 函示 () => { console.log(i) } 丟進 call stack 執行，函示內呼叫 console.log(i), 當前函示作用域無 i 的值故向上一層 global 找到 i = 5, 故輸出 5
24. call stack 清空且 event queue 清空，程式執行完畢

依序輸出：  
i: 0  
i: 1  
i: 2  
i: 3  
i: 4  
5  
5  
5  
5  
5  