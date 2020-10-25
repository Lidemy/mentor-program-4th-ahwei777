const bcrypt = require('bcrypt'); // 引入 bcrypt 用於 hash 密碼

const saltRounds = 10; // 複雜程度(加鹽)

// 直接引入完成 ORM 的 models
const db = require('../models');

const { Admin, Lottery } = db;

// controller 負責串接 model 及 render
const adminController = {
  login: (req, res) => res.render('admin/login'),
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    //  空值檢查
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next(); //  將控制權移交給下個 middleware -> goback
    }
    await Admin.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        // 找不到該名 user 時回傳值為 null
        if (!user) {
          req.flash('errorMessage', '帳號不存在');
          return next();
        }
        //  檢查密碼 hash 後是否與資料庫內的值相同
        bcrypt.compare(password, user.password, (err, isValid) => {
          // result == true 時驗證相等
          if (err || !isValid) {
            req.flash('errorMessage', '密碼錯誤');
            return next();
          }
          //  驗證成功
          req.session.username = user.username;
          return res.redirect('/admin');
        });
        return true;
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  handleLogout: (req, res) => {
    req.session.username = null;
    return res.redirect('/index');
  },
  register: (req, res) => res.render('admin/register'),
  handleRegister: (req, res, next) => {
    const { username, password } = req.body;
    //  空值檢查
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    //  先將密碼做 hash 處理，完成後執行 callback 寫入資料庫
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      Admin.create({
        username,
        password: hash, // hash 結果
      })
        .then(() => {
          //  成功登入後設置 session
          req.session.username = username;
          return res.redirect('/');
        })
        .catch((error) => {
          const { errno } = err.original;
          if (errno === 1062) {
            // 欄位值重複
            req.flash('errorMessage', '此帳號名稱已被使用');
          } else {
            req.flash('errorMessage', error.toString());
          }
          return next();
        });
      return true;
    });
    return true;
  },
  //  獎項管理
  admin: async (req, res) => {
    // 取得資料庫所有獎項
    await Lottery.findAll()
      .then((lotteries) => {
        // 無資料時回傳值為 []
        if (lotteries.length === 0) {
          // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
          const errorMessage = '目前無任何獎項，請先新增獎項';
          return res.render('admin/admin', {
            errorMessage,
          });
        }
        return res.render('admin/admin', {
          lotteries,
        });
      })
      .catch((err) => {
        const errorMessage = err.toString();
        return res.render('admin/admin', {
          errorMessage,
        });
      });
    return true;
  },
};

module.exports = adminController;
