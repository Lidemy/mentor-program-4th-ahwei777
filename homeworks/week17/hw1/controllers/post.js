// 直接引入完成 ORM 的 models
const db = require('../models');

const { Post, Category } = db;

// controller 負責串接 model 及 render
const postController = {
  aboutme: (req, res) => res.render('post/aboutme'),
  index: (req, res) => {
    //  抓資料庫最新五則貼文(關聯分類)
    Post.findAll({
      include: [Category],
      order: [['createdAt', 'DESC']],
      limit: 5,
    })
      .then((posts) => {
        // 無貼文時回傳值為 []
        if (posts.length === 0) {
          //  已登入導去新增文章
          if (req.session.username) {
            req.flash('errorMessage', '目前無任何文章，請先新增文章');
            return res.redirect('/addPost');
          }
          //  未登入導去登入
          req.flash('errorMessage', '目前無任何文章，請登入後新增文章');
          return res.redirect('/login');
        }
        return res.render('index', {
          posts,
        });
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return res.render('index');
      });
    return true;
  },
  post: (req, res, next) => {
    //  抓資料庫指定 ID 貼文(關聯分類)
    Post.findOne({
      include: [Category],
      where: {
        id: req.params.id,
      },
    })
      .then(post => res.render('post/postSingle', {
        post,
      }))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  postAll: (req, res, next) => {
    const postPerPage = 5;
    const { nowPage } = req.params;
    const offset = (nowPage - 1) * postPerPage; // 該次查詢要略過的資料筆數
    //  抓資料庫全部貼文(關聯分類)
    Post.findAndCountAll({
      include: [Category],
      order: [['createdAt', 'DESC']],
      offset,
      limit: postPerPage,
    })
      .then((posts) => {
        // 無貼文時回傳值為 { count: 0, rows: [] }
        if (posts.count === 0) {
          if (req.session.username) {
            req.flash('errorMessage', '目前無任何文章，請先新增文章');
            return res.redirect('/addPost');
          }
          req.flash('errorMessage', '目前無任何文章，請登入後新增文章');
          return res.redirect('/login');
        }
        return res.render('post/postAll', {
          posts,
          nowPage,
        });
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  postByCateg: async (req, res, next) => {
    //  先抓取所有分類並暫存
    let gotCategories;
    await Category.findAll({
      order: [['createdAt', 'DESC']],
    })
      .then((Categories) => {
        gotCategories = Categories;
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    //  再抓資料庫所有貼文(關聯分類)
    Post.findAll({
      include: [Category],
    })
      .then((posts) => {
        // 無貼文時回傳值為 []
        if (posts.length === 0) {
          //  未登入
          if (req.session.username) {
            req.flash('errorMessage', '目前無任何文章，請先新增文章');
            return res.redirect('/addPost');
          }
          //  已登入
          req.flash('errorMessage', '目前無任何文章，請登入後新增文章');
          return res.redirect('/login');
        }
        return res.render('post/postByCateg', {
          posts,
          gotCategories,
        });
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  addPost: (req, res, next) => {
    //  抓所有分類
    Category.findAll()
      .then(Categories => res.render('post/addPost', {
        Categories,
      }))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  handleAddPost: (req, res, next) => {
    const { title, content, CategoryId } = req.body;
    if (!title || !content || !CategoryId) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Post.create({
      title,
      content,
      CategoryId,
    })
      .then(() => res.redirect('/index'))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  delete: (req, res, next) => {
    Post.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.redirect('/adminPost')) //  成功則導回首頁
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  update: async (req, res, next) => {
    //  先抓取所有分類並暫存
    let gotCategories;
    await Category.findAll({
      order: [['createdAt', 'DESC']],
    })
      .then((Categories) => {
        gotCategories = Categories;
      })
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    //  再抓取要更新的該則貼文
    Post.findOne({
      where: {
        id: req.params.id,
      },
    })
      .then(post => res.render('post/updatePost', {
        post,
        gotCategories,
      }))
      .catch((err) => {
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
  handleUpdate: (req, res, next) => {
    const { title, content, CategoryId } = req.body;
    if (!title || !content || !CategoryId) {
      req.flash('errorMessage', '缺少必要欄位');
      return next();
    }
    Post.update(
      {
        title,
        content,
        CategoryId,
      },
      {
        where: {
          id: req.params.id,
        },
      },
    )
      .then((result) => {
        //  成功則導回首頁
        console.log('update: ', result);
        return res.redirect('/');
      })
      .catch((err) => {
        //  錯誤則退回上一頁
        req.flash('errorMessage', err.toString());
        return next();
      });
    return true;
  },
};

module.exports = postController;
