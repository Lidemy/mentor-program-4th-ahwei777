/* eslint-disable import/no-unresolved */
// 引入 bootstrap 的 CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

// week24
import { Provider } from 'react-redux';
import BlogAppRedux from './components/Blog-redux/App';
import store from './components/Blog-redux/redux/store';

// <React.StrictMode> 嚴格模式可能會造成偵錯問題，可先取消
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        {/* blog 下層會再使用 router ，此層不可設為 exact，因會由上往下逐層篩選 */}
        <Route path="/BlogAppRedux">
          <BlogAppRedux />
        </Route>
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
