## 請列出 React 內建的所有 hook，並大概講解功能是什麼

> Hook 是 React 在 2019 年 2 月發布的 16.8 版本中增加的新功能，相較原本只能在 class component 中使用 state 及 lifecycle method，將可直接在 function component 中完成同樣操作，好處為可以提升邏的重用性及語法更為親民。

### `useState`

使用方式：  
`const [state, setState] = useState(initialState);`，將回傳當下最新的 
state 及更新此 state 的 function。

`initialState`  
只在初始 render 時使用，在後續 render 時會被忽略。如果初始 state 需要經過複雜計算來獲得，可以傳入一個 function（lazy initializer），該 function 只會在初始 render 時被調用，可以避免效能浪費，如下比較：

```
// 此運算在第一次 render 後都還是會執行，只是傳入時會被忽略
const initialState = someExpensiveComputation(props);
const [state, setState] = useState(initialState)
```
```
// 改為傳入 function 就只會在第一次執行
const [state, setState] = useState(() => {
  const initialState = someExpensiveComputation(props);
  return initialState;
});
```

`state`  
首次 render 時回傳 initialState，後續重新 render 時為最後更新的 state。

`setState`
接收一個新的 state 並將重新 render 該 component 排進隊列，除了傳值外也可傳入物件、函式。

1. 傳入物件：  
與 class component 的 setState 方法不同，不會自動合併更新 object，代表不能只傳入有改變的部分而必須傳入完整物件，可利用展開運算符(Spread Operator)傳入原 state 中未改變部分，如下：
    ```
    setTodos([
        {
        content: value,
        isDone: false,
        },
        ...todos,
    ]);
    ```

2. 傳入函式：
如果新的 state 需要使用先前的 state 做計算，可以傳遞一個 function 接收先前的 state，並回傳操作後的值，下面以計算器示範 setState 的兩種用法：

    ```
    // 「+」和「-」按鈕使用函數式形式，因為被更新的值是基於先前的 state
    function Counter({initialCount}) {
        const [count, setCount] = useState(initialCount);
        return (
            <>
            Count: {count}
            <button onClick={() => setCount(initialCount)}>Reset</button>
            <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
            <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
            </>
        );
    }
    ```

### `useEffect` `useLayoutEffect`

使用方式：  
`useEffect(didUpdate, watching array);`
第一個參數為 callback 函式（effect），預設每次完成 render 後觸發，如果第二個參數發生改變，則會重新建立一個 effect，因此會有以下狀況：
1. 當第二個參數是空陣列時，只有第一次 render 會呼叫 callback 函式
2. 沒有加第二個參數時，會在第一次 render 和每次元件 re-render 時呼叫
3. 第二個參數陣列內有值時，會在第一次 render 和陣列內的元素值變更時呼叫

執行時機：  
在 React render 且瀏覽器 paints screen 後觸發，不會阻礙瀏覽器更新晝面，但會保證在任何新 render 前執行。React 會在開始新一個更新前刷新上一輪 render 的 effect。

清除 effect：  
有時在 component 狀態改變或離開畫面(unmount)時需要清除 effect 已建立的資源，例如 subscription 或計時器的 ID，此時可以在第一個參數的 function 內回傳一個 cleanup function，。

`useLayoutEffect`  
如果 effect 有關更新 state 且該 component 已有設定初始 state ，則會在瀏覽器把預設資料 paint 完後才執行 effect（更新 state），因為順序而產生視覺不一致狀況，此時可改使用 `useLayoutEffect`，會在瀏覽器執行繪製之前先執行內部更新函式，但也因為會阻礙 paint 畫面使用時需謹慎。

### `useContext`

有些時候我們想要把某個外層的 props 傳遞給底下的 component，例如像是驗證權限等需要多次確認的狀態，這種情況下可能得一層一層將 props 往下帶（Prop Drilling），即便中間經過的 component 都不需要用到該 props，因此 React 提供 `useContext` 讓上層 props 可以類似捷徑方式傳遞給下層的 component。

styled-components 提供的 <ThemeProvider> 背後即是以此方式實作，讓共用的主題設定讓多個 components 都可以方便存取到。

使用方式：  
1. 於上層 component 內建立一個新的 context  `const AuthContext = createContext(initial)`
2. 假如想要傳遞的 props 是 `user` & `setUser` ，於 return 區塊中加入 <MyContext.Provider value={{ user, setUser }}>，位於其下層的 component 就可以取得該 props。
3. 下層 component 可以 `const { user, setUser } = useContext(AuthContext)` 取得上層中距離最近的 <MyContext.Provider> 所提供的 value prop。
4. 當 context value 更新時，此距離最近的 <MyContext.Provider> 會將最新的值傳送回來，並觸發此 component 重新 render。

### `useRef`

大多用於標記 DOM 元素或是設定與畫面無關的資料如 ID、counter 等。

使用方式：  
`const refContainer = useRef(initialValue)`，將回傳一個 mutable 的 ref object，.current 屬性被初始為傳入的參數（initialValue）。回傳的 object 在 component 的生命週期將保持不變。

示範-訪問特定 DOM 元素並抓取其當前屬性
```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```
示範-建立與畫面無關的 counter
```
const id = useRef(0);
  const handleButtonAddTodo = () => {
    console.log('button click!');
    setTodos([{
      // 讀取 useRef 時以 current 取得
      id: id.current,
      content: value
    }, ...todos]);
    setValue('');
    // 改變 useRef 時一樣以 current 進行操作
    id.current ++
  }
```

### `useCallback`

可用於已被 memo 保存的 component 提高最佳化，因為傳入的函式在每次 re-render 時都會被認為是一個新的物件，利用此函式可達到類似閉包保存的效果。

使用方式：  
```
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
傳遞一個 inline callback 及依賴 array。useCallback 會回傳該 callback 的 memoized 版本，達到類似閉包保存的效果，只會在依賴的對象發生改變時才更新，可以省去多餘的運算。

### `useMemo`

用於避免因為 re-render 而重複進行複雜運算，使用後可以只在關注目標變動時才重新運算。
```
// 只在 value 改變時才會執行 useMemo 內的函式，避免效能浪費
const style = useMemo(() => {
// 複雜計算
console.log('complex calculate')
return {
    color: value ? "red" : "blue"
}
}, [value])

// 傳遞 props 部分
<UseMemoTest style={style}>useMemoTest</UseMemoTest>
```

### 其他 hook
`useReducer`  
`useState` 的進階版，當 state 有較複雜邏輯且包括多個子數值或下一個 state 依賴自之前的 state。

`useImperativeHandle`  
用於讓父層 component 可以取得子 component 中使用 ref 標記的 DOM 元素資訊。

`useDebugValue`  
用於在 React DevTools 中顯示自訂義 hook 的標籤。

https://zh-hant.reactjs.org/docs/hooks-reference.html


## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/772d7bf1-24f8-4279-9b79-5c78e688e4e3/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201127%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201127T070605Z&X-Amz-Expires=86400&X-Amz-Signature=b6d18c96905a9651011b42de86be8e64090a03c1ec995499fa2c1d560c1c7026&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

### Mounting
當一個 component 的 instance 被建立且加入 DOM 中時，其生命週期將會依照下列的順序呼叫這些方法：
- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

### 更新
當 prop 或 state 有變化時，就會產生更新。當一個 component 被重新 render 時，其生命週期將會依照下列的順序呼叫這些方法：
- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

### Unmounting
當一個 component 被從 DOM 中移除時，這個方法將會被呼叫：
- componentWillUnmount()

### 錯誤處理
當一個 component 在 render 的過程、生命週期、或在某個 child component 的 constructor 中發生錯誤時，這些方法會被呼叫：
- static getDerivedStateFromError()
- componentDidCatch()

## 請問 class component 與 function component 的差別是什麼？

> 最根本差異就是物件導向中 this 具有的 mutable 特性以及函式具有的閉包特性

class component 
1. 接收的 props 因為 this 的可變性將永遠指向當前最新狀態。
2. 自定義 method 因為 this 的可變性需要在 constructor 內額外進行強制綁定，讓每次呼叫該 method 時的 this 都可以正確指向該 instance。
3. 提供更多細分的 lifecycle method ，適合較複雜的元件使用。

function component
1. 每次 render，都「重新」呼叫一次 function ，且因為閉包的特性而捕獲當下的 props 和 state。
2. 如果要在 function component 內取得最新的狀態，可以利用 useRef 搭配 useEffect 來追蹤特定的 props。
3. 可以更輕量簡潔的撰寫程式碼，並將共同邏輯抽取出來方便重用。

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

主要差異在於其內部的資料(props)有沒有受到 React 監控，當資料變動時就會觸發畫面重新 render，因此取決在於其資料改變時是否要同時改變畫面。以下以取得特定 input 輸入框內的值為例：

### uncontrolled component
1. 直接以原生 DOM 函式抓取該元素
    ```
    const handleButtonAddTodo = () => {
        console.log('button click!')
        const value = document.querySelector('.input-todo').value;
        setTodos([value, ...todos])
        // 新增完畢後清空 input
        document.querySelector('.input-todo').value = '';
    }
    ```

2. 使用 react 提供的 `useRef` 標記該 DOM 元素
    ```
    const inputRef = useRef();
    const handleButtonAddTodo = () => {
        console.log('button click!')
        // 以 current 取得已被標記元素的當前狀態
        const value = inputRef.current.value;
        setTodos([value, ...todos])
        // 新增完畢後清空 input
        inputRef.current.value = ''
    }

    // JSX 語法
    <input ref={inputRef} className="input-todo" type="text" placeholder="todo" />
    ```

### controlled component
使用 useState 後監聽每次使用者所輸入的值，並將其設為新的 state，然後再將其顯示於輸入框內，也就是每次使用者的輸入都會造成狀態改變。

```
const [value, setValue] = useState('');
const handleOnChange = (e) => {
    setValue(e.target.value)
}
// JSX 語法
<input type="text" placeholder="todo" value={value} onChange={handleOnChange} />
```
  
[參考資料：從實際案例看 class 與 function component 的差異](https://blog.huli.tw/2020/06/15/react-function-class-hook-useeffect/)  
[參考資料：Function Component 与 Class Component 有何不同？](https://zhuanlan.zhihu.com/p/63746753)  
[參考資料：How Are Function Components Different from Classes?](https://overreacted.io/how-are-function-components-different-from-classes/)