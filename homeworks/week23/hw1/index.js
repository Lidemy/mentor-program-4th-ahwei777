/* eslint-disable import/no-unresolved */
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
// 引入主題(可設定類似 mixin 的全域變數供使用
//  import { ThemeProvider } from "styled-components";

// week23
import { Provider } from 'react-redux';
import TodosRedux from './App';
import store from './redux/store';

// <React.StrictMode> 嚴格模式可能會造成偵錯問題，可先取消
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path="/TodosRedux">
          <TodosRedux />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
