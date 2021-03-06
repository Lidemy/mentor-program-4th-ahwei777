/* eslint-disable import/no-unresolved */
const bcrypt = require('bcrypt'); // 引入 bcrypt 用於 hash 密碼

const saltRounds = 10; // 複雜程度(加鹽)

const fetch = require('node-fetch');

const FormData = require('form-data');

const db = require('../models'); // 引入完成 ORM 的 models

const {
  Admin, Lottery, Menu, Faq,
} = db;


function fetchToImgur(encodeImage) {
  // const albumID = ''
  const formData = new FormData();
  formData.append('image', encodeImage);
  return fetch('https://api.imgur.com/3/image', {
    method: 'POST',
    headers: {
      Authorization: 'Client-ID ef0e0fd605be920',
    },
    body: formData,
  })
    .then((response) => {
      //  判斷 status
      const { status } = response;
      //  status 正常，將 response 轉為 json 格式後回傳
      if (status >= 200 && status < 400) {
        return response.json();
      }
      //  status 有誤，丟出錯誤後終止程式碼
      throw new Error(status);
      //  server 無正確回應，例如錯誤網址直接找不到 server 或連線異常等
    })
    .catch((error) => {
      console.log(error);
    });
}

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
    try {
      const admin = await Admin.findOne({
        where: {
          username,
        },
      });
      // 找不到該名 user 時回傳值為 null
      if (!admin) {
        req.flash('errorMessage', '帳號不存在');
        return next();
      }
      //  找到資料時回傳值為該名使用者在資料庫中儲存的資料
      //  檢查目前輸入的密碼 hash 後是否與資料庫內的值相同
      bcrypt.compare(password, admin.password, (err, isValid) => {
        // result == true 時驗證相等
        if (err || !isValid) {
          req.flash('errorMessage', '密碼錯誤');
          return next();
        }
        //  驗證成功
        req.session.username = admin.username;
        return res.redirect('/admin');
      });
      return true;
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
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
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      // 處理完畢後才會進入 callback 開始比對
      if (err) {
        req.flash('errorMessage', err.toString());
        return next();
      }
      try {
        // eslint-disable-next-line no-unused-vars
        const admin = await Admin.create({
          username,
          password: hash, // hash 結果
        });
        //  確認寫入完成後設置 session 並導至後台首頁
        req.session.username = username;
        return res.redirect('/admin');
      } catch (error) {
        const { errno } = error.original;
        if (errno === 1062) {
          // 欄位值重複
          req.flash('errorMessage', '此帳號名稱已被使用');
        } else {
          // 捕捉其他預期外的錯誤並印出
          req.flash('errorMessage', error.toString());
          console.log(error.toString());
        }
        return next();
      }
    });
    return true;
  },
  //  獎項管理
  adminLottery: async (req, res) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const lotteries = await Lottery.findAll();
      // 無資料時回傳值為 []，回傳錯誤訊息
      if (lotteries.length === 0) {
        // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
        const errorMessage = '目前無任何獎項，請先新增獎項';
        return res.render('admin/admin_lottery', {
          errorMessage,
        });
      }
      // 有資料時回傳資料
      return res.render('admin/admin_lottery', {
        lotteries,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('admin/admin', {
        errorMessage,
      });
    }
  },
  deleteLottery: (req, res, next) => {
    Lottery.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect('/admin_lottery')) //  成功則導回首頁
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        console.log(err.toString());
        return next();
      });
    return true;
  },
  addLottery: async (req, res, next) => {
    const { name, content, chance } = req.body;
    const encodeImage = req.file.buffer.toString('base64');
    //  空值檢查
    if (!name || !content || !chance || !encodeImage) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    // 機率檢查
    const reg = new RegExp('^([1-9]|[1-9]\\d|100)$');
    if (!reg.test(chance)) {
      req.flash('errorMessage', '獎項加權數不符規定');
      return next();
    }
    const result = await fetchToImgur(encodeImage);
    Lottery.create({
      name,
      content,
      chance,
      imageURL: result.data.link,
    })
      .then(() => res.redirect('/admin_lottery'))
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
  updateLottery: async (req, res, next) => {
    const { id } = req.params;
    try {
      const lottery = await Lottery.findOne({
        where: {
          id,
        },
      });
      // 有資料時回傳資料
      return res.render('admin/admin_updateLottery', {
        lottery,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleUpdateLottery: async (req, res, next) => {
    const { name, content, chance } = req.body;
    const encodeImage = req.file.buffer.toString('base64');
    //  空值檢查
    if (!name || !content || !chance || !encodeImage) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    // 機率檢查
    if (chance >= 100) {
      req.flash('errorMessage', '機率權重超過100，請重新修正');
      return next();
    }
    try {
      const result = await fetchToImgur(encodeImage);
      await Lottery.update(
        {
          name,
          content,
          chance,
          imageURL: result.data.link,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      return res.redirect('/admin_lottery');
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  //  Menu 管理
  adminMenu: async (req, res) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const menus = await Menu.findAll({
        order: [['sequence', 'ASC']],
      });
      // 無資料時回傳值為 []，回傳錯誤訊息
      if (menus.length === 0) {
        // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
        const errorMessage = '目前無任何菜單，請先新增';
        return res.render('admin/admin_menu', {
          errorMessage,
        });
      }
      // 有資料時回傳資料
      return res.render('admin/admin_menu', {
        menus,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('admin/admin_menu', {
        errorMessage,
      });
    }
  },
  deleteMenu: (req, res, next) => {
    Menu.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect('/admin_menu')) //  成功則導回首頁
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        console.log(err.toString());
        return next();
      });
    return true;
  },
  addMenu: async (req, res, next) => {
    const { name, price, sequence } = req.body;
    const encodeImage = req.file.buffer.toString('base64');
    //  空值檢查
    if (!name || !price || !sequence || !encodeImage) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    const result = await fetchToImgur(encodeImage);
    Menu.create({
      name,
      price,
      sequence,
      url: result.data.link,
    })
      .then(() => res.redirect('/admin_menu'))
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
  updateMenu: async (req, res, next) => {
    const { id } = req.params;
    try {
      const menu = await Menu.findOne({
        where: {
          id,
        },
      });
      // 有資料時回傳資料
      return res.render('admin/admin_updateMenu', {
        menu,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleUpdateMenu: async (req, res, next) => {
    const { name, price, sequence } = req.body;
    const encodeImage = req.file.buffer.toString('base64');
    //  空值檢查
    if (!name || !price || !sequence || !encodeImage) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    try {
      const result = await fetchToImgur(encodeImage);
      await Menu.update(
        {
          name,
          price,
          sequence,
          url: result.data.link,
        },
        {
          where: {
            id: req.params.id,
          },
        },
      );
      return res.redirect('/admin_menu');
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  adminFaq: async (req, res) => {
    try {
      // 回傳值為目前資料庫內的獎項
      const faqs = await Faq.findAll({
        order: [['sequence', 'ASC']],
      });
      // 無資料時回傳值為 []，回傳錯誤訊息
      if (faqs.length === 0) {
        // 如果直接 render 的話 req.flash 無法帶過去，需要另外宣告後一併回傳
        const errorMessage = '目前無任何常見問題，請先新增';
        return res.render('admin/admin_faq', {
          errorMessage,
        });
      }
      // 有資料時回傳資料
      return res.render('admin/admin_faq', {
        faqs,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      const errorMessage = error.toString();
      console.log(error.toString());
      return res.render('admin/admin_faq', {
        errorMessage,
      });
    }
  },
  addFaq: async (req, res, next) => {
    const { name, content, sequence } = req.body;
    //  空值檢查
    if (!name || !content || !sequence) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Faq.create({
      name,
      content,
      sequence,
    })
      .then(() => res.redirect('/admin_faq'))
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
  deleteFaq: (req, res, next) => {
    Faq.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect('/admin_faq'))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        console.log(err.toString());
        return next();
      });
    return true;
  },
  updateFaq: async (req, res, next) => {
    const { id } = req.params;
    try {
      const faq = await Faq.findOne({
        where: {
          id,
        },
      });
      // 有資料時回傳資料
      return res.render('admin/admin_updateFaq', {
        faq,
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      req.flash('errorMessage', error.toString());
      console.log(error.toString());
      return next();
    }
  },
  handleUpdateFaq: async (req, res, next) => {
    const { name, content, sequence } = req.body;
    //  空值檢查
    if (!name || !content || !sequence) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Faq.update(
      {
        name,
        content,
        sequence,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )
      .then(() => res.redirect('/admin_faq'))//  成功則導回首頁
      .catch((error) => {
        // 捕捉其他預期外的錯誤並印出
        req.flash('errorMessage', error.toString());
        console.log(error.toString());
        return next();
      });
    return true;
  },
};

module.exports = adminController;
