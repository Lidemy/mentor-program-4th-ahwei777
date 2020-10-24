// 占用的 port
const port = process.env.PORT || 3000;
// 引入所有相關套件
// express
const express = require('express');

const app = express(); //  建立 function
app.set('view engine', 'ejs'); // 指定 view 引擎
// body-parser 解析 request
const bodyParser = require('body-parser');

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded 解析透過瀏覽器提交的 POST 表單
app.use(bodyParser.urlencoded({ extended: false }));

// session 身分驗證
const session = require('express-session');

app.use(
  session({
    // session 參數
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  }),
);
// connect-flash 暫存網站提示訊息
const flash = require('connect-flash');

app.use(flash());

//  設置一個 middleware 偵測所有 request，可直接於 req.locals 內設置共同訊息如 session 及 flash
//  類似全域變數可供所有 views 存取，省去在每個路由都做處理及傳遞
app.use((req, res, next) => {
  res.locals.username = req.session.username; // render 時依據權限決定顯示項目
  res.locals.errorMessage = req.flash('errorMessage'); // 錯誤訊息傳遞
  res.locals.url = req.originalUrl; // 依據訪問 url 在 navbar 中提示當前頁面
  next();
});

//  加載靜態資源的文件夾，將 CSS 等文件放在此 static 資料夾底下
const path = require('path');

app.use(express.static(path.join(__dirname, './static')));

// 設定 MVC 結構及訪問路由導向
const adminController = require('./controllers/admin');
const lotteriesController = require('./controllers/lotteries_API');

// 抽獎API, 回傳抽獎品項的名字、圖片還有說明
//  抽獎 GET
app.get('/lotteries', lotteriesController.get);
//  刪除 DELETE
app.delete('/lotteries/:id', lotteriesController.delete);
//  新增 POST
app.post('/lotteries', lotteriesController.add);
//  更新 PATCH
app.patch('/lotteries/:id', lotteriesController.update);

//  根目錄
app.get('/', (req, res) => {
  res.redirect('/index');
});
app.get('/index', (req, res) => {
  res.render('index');
});

// 函式：程序有狀況時將控制權轉交 redirectBack 導回上一頁
function redirectBack(req, res) {
  return res.redirect('back');
}
// 函式：權限檢查
function checkIsLogin(req, res, next) {
  // 沒有登入就導到登入頁
  if (!req.session.username) {
    req.flash('errorMessage', '您無操作權限，請登入管理後台');
    return res.redirect('/login');
  }
  // 有登入就放行交給後續 controller
  return next();
}

// adminController
app.get('/login', adminController.login);
app.post('/login', adminController.handleLogin, redirectBack);
app.get('/logout', adminController.handleLogout);
app.get('/register', adminController.register);
app.post('/register', adminController.handleRegister, redirectBack);
app.get('/admin', checkIsLogin, adminController.admin);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// 輸出函式供 render 時使用
app.locals.getActiveFromURL = (url, str) => {
  if (url.includes(str)) {
    return 'active';
  }
  return true;
};
