const bcrypt = require('bcrypt'); // 引入 bcrypt 用於 hash 密碼

const saltRounds = 10; // 複雜程度(加鹽)

// 直接引入完成 ORM 的 models
const db = require('../models');

const { User, Post, Category } = db;

// controller 負責串接 model 及 render
// 注意 function 內 return 的時機點，避免與使用的 promise 內的 return 搞混(promise 內 return 會繼續執行)
const adminController = {
  login: (req, res) => res.render('user/login'),
  handleLogin: async (req, res, next) => {
    const { username, password } = req.body;
    //  空值檢查
    if (!username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next(); //  將控制權移交給下個 middleware -> goback
    }
    await User.findOne({
      where: {
        username,
      },
    })
      .then((user) => {
        // 找不到該名 user 時回傳值為 null
        if (!user) {
          req.flash('errorMessage', '帳號不存在');
          // return 就會跳出目前此 .then，但如果後面還有接 .then 因為 chain 特性會繼續
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
          return res.redirect('/index');
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
  register: (req, res) => res.render('user/register'),
  handleRegister: (req, res, next) => {
    const { nickname, username, password } = req.body;
    //  空值檢查
    if (!nickname || !username || !password) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    //  先將密碼做 hash 處理，完成後執行 callback 寫入資料庫
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      User.create({
        nickname,
        username,
        password: hash, // hash 結果
      })
        .then(() => {
          //  成功登入後設置 session
          req.session.username = username;
          return res.redirect('/index');
        })
        .catch((err1) => {
          const { errno } = err1.original;
          if (errno === 1062) {
            // 欄位值重複
            req.flash('errorMessage', '此帳號名稱已被使用');
          } else {
            req.flash('errorMessage', err.toString());
          }
          return next();
        });
      return true;
    });
    return true;
  },
  handleLoogout: (req, res) => {
    //  清空 session
    req.session.username = null;
    return res.redirect('/index');
  },
  //  管理分類
  adminCateg: async (req, res) => {
    //  抓資料庫最新五筆貼文
    await Category.findAll()
      .then(Categories => res.render('user/adminCateg', {
        Categories,
      }))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return res.render('index');
      });
    return true;
  },
  //  管理文章
  adminPost: async (req, res, next) => {
    //  抓資料庫全部貼文並關聯分類
    await Post.findAll({
      include: [Category],
      order: [['createdAt', 'DESC']],
    })
      .then((posts) => {
        // 沒資料時回傳值為空陣列
        if (posts.length === 0) {
          req.flash('errorMessage', '目前無任何文章，請先新增文章');
          return res.redirect('/addPost');
        }
        return res.render('user/adminPost', {
          posts,
        });
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  //  新增分類
  handleAddCateg: async (req, res, next) => {
    const { name, color } = req.body;
    if (!name || !color) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    await Category.create({
      name,
      color,
    })
      .then(() => res.redirect('/adminCateg'))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  handleUpdateCateg: async (req, res, next) => {
    const { id, name, color } = req.body;
    if (!id || !name || !color) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    //  新增分類
    await Category.update(
      {
        name,
        color,
      },
      {
        where: {
          id,
        },
      },
    )
      .then(() => res.redirect('/adminCateg'))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
};

module.exports = adminController;
