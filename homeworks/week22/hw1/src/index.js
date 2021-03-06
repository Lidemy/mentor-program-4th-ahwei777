/* eslint-disable import/no-unresolved */
// 引入 bootstrap 的 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
// 引入主題(可設定類似 mixin 的全域變數供使用
//  import { ThemeProvider } from "styled-components";
//  import BoardApp from './components/Board/App'
// week21
//  import TodosApp from "./components/Todos/App";
//  import GobangApp from "./components/Gobang/App";
//  import FormApp from "./components/Form/App";
// week22
import BlogApp from './components/Blog/App';

// <React.StrictMode> 嚴格模式可能會造成偵錯問題，可先取消
ReactDOM.render(
  <Router>
    <Switch>
      {/* blog 下層會再使用 router ，此層不可設為 exact，因會由上往下逐層篩選 */}
      <Route path="/BlogApp">
        <BlogApp />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root'),
);
