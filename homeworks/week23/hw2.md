## 為什麼我們需要 Redux？

![](https://s3.us-west-2.amazonaws.com/secure.notion-static.com/d5d1c34a-7a61-4a05-a18d-bd1662c66060/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20201202%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20201202T163629Z&X-Amz-Expires=86400&X-Amz-Signature=9ec617aa08b618466c92e7272eb32f183e0254a6b617472fcf59abeb10c9aef0&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22)

Redux 的概念來自 Flux ，後者為 Facebook 隨著 React 推出的一個架構，或是該說是一種概念，並沒有固定的實作方式。Facebook 推出 Flux 的目的，是要解決傳統 MVC 模式中，因專案結構變大造成 View 與 Model 間產生複雜關係及高度耦合，此時多向的資料流造成難以追蹤來源及 debug，因此 Flux 以單向資料流的概念來解決此一問題。而經過時間的演進，當初最早的 Flux 架構經過社群改良後發展成各個 library，而搭配 React 使用上最有名的一套就叫做 Redux。注意 Redux 的重點是在解決大型專案架構產生的問題，如果小型專案反而並不適合使用，且可能因此降低效能。

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

> 來自 Redux 首頁：Redux is a predictable state container for JavaScript apps

Redux 類似一個容器，可以用來管理以及預測 State，讓開發者能夠在開發複雜的應用程式下，對於資料狀態的控制能夠更加的簡便以及直覺。Redux 使用上並不侷限於 JavaScript ，可在任何程式語言上使用。

![](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

- ACTION：使用者透過監聽行為觸發後會發送 ACTION 物件，通常為一組已事先定義好的的動作指令，用於改變 STORE 中 STATE 的狀態，一個 ACTION 通常包含 TYPE 和 PAYLOAD。
- REDUCER：REDUCER 會根據 ACTION 的 TYPE 執行對應操作改變 STORE 中 STATE 的狀態。
- STORE：將 STATE 集中起來進行管理及儲存的容器，會將不同 STATE 合併儲存起來，提取時可以 selector 進行選擇。
- VIEW：當 STORE 中的 STATE 改變後，會觸發更新畫面。

## 該怎麼把 React 跟 Redux 串起來？

可使用套件 react-redux 或是較新推出的 Redux Toolkit 來協助，以 react-redux 來說有兩種方式：  
1. hook 方式：可在 component 內直接使用 `useSelector` 引入 store，以及使用 `useDispatch` 傳入 action 指令
    ```
    import { useSelector, useDispatch } from 'react-redux';
    import { selectTodos } from './redux/selectors';
    import { addTodo } from './redux/actions';

    function TodosRedux() {
        const todos = useSelector(selectTodos);
        const dispatch = useDispatch();
        console.log('state: ', todos);
        return (
            <div>
            <button
                onClick={() => {
                dispatch(addTodo(Math.random()));
                }}
            >
                add Todo
            </button>
            <ul>
                {todos.map((todo) => (
                <li key={todo.id}>
                    {todo.id} {todo.name}
                </li>
                ))}
            </ul>
            </div>
        );
    }
    ```
2. 使用 `connect` 將 Redux 與 component 串聯起來，並將需要的 state 及 action 以 props 傳遞給 dumb component，實際引入時需引入與 Redux 產生串聯的 container 
    ```
    import { useSelector, useDispatch, connect } from 'react-redux';
    import { selectTodos } from './redux/selectors';
    import { addTodo } from './redux/actions';

    // dumb component 只負責 UI 顯示，透過 props 取得 store 及操作 state 的方式
    function AddTodo({ addTodo }) {
        return (
            <button
            onClick={() => {
                addTodo(Math.random());
            }}
            >
            add Todo
            </button>
        );
    }

    // 傳入 state，類似 useSelector
    const mapStateToProps = (store) => {
        return {
            todos: store.todoState.todos,
        };
    };

    // 傳入 action, 如果 props 名稱等於 action 名稱可省略直接回傳 addTodo
    // const mapDispatchToProps = { addTodo }
    const mapDispatchToProps = (dispatch) => {
        return {
            addTodo: (payload) => dispatch(addTodo(payload))
        };
    };
    
    const connectToStore = connect(mapStateToProps, mapDispatchToProps);

    // Higher Order Component: 將原 component 與 redux 串接起來，因為是實際與 redux 互動串聯的元件，故也被稱作 smart component 或 container
    const ConnectedAddTodo = connectToStore(AddTodo);

    export default ConnectedAddTodo
    ```