const request = require('request');

const API_URL = 'https://lidemy-book-store.herokuapp.com';
const args = process.argv;
const action = args[2];
const params = args[3];

function listBooks() {
  request(
    `${API_URL}/books?_limit=20`,
    (err, response, body) => {
      if (err) {
        return console.log('抓取失敗', err);
      }
      //  回傳不符 JSON 格式時處理
      let json;
      try {
        json = JSON.parse(body);
      } catch (error) {
        console.log(error);
      }
      for (let i = 0; i < json.length; i += 1) {
        console.log(`${json[i].id} ${json[i].name}`);
      }
      return true;
    },
  );
}

function readBook(id) {
  request(
    `${API_URL}/books/${id}`,
    (err, response, body) => {
      if (err) {
        return console.log('抓取失敗', err);
      }
      //  當目前此書被刪除時
      if (body === '{}') {
        console.log('此書籍已被刪除');
      }
      //  回傳不符 JSON 格式時處理
      let json;
      try {
        json = JSON.parse(body);
      } catch (error) {
        console.log(error);
      }
      return console.log(json.name);
    },
  );
}

function deleteBooks(id) {
  request.delete(
    `${API_URL}/books/${id}`,
    (error) => {
      if (error) {
        return console.log('刪除失敗', error);
      }
      return console.log('刪除成功');
    },
  );
}

function creatBook(name) {
  request.post(
    {
      url: `${API_URL}/books/`,
      form: {
        name,
      },
    }, (error) => {
      if (error) {
        return console.log('新增失敗', error);
      }
      return console.log('新增成功');
    },
  );
}

function updateBook(id, newName) {
  request.patch(
    {
      url: `${API_URL}/books/${id}`,
      form: {
        name: newName,
      },
    }, (error) => {
      if (error) {
        return console.log('更新失敗', error);
      }
      return console.log('更新成功');
    },
  );
}

switch (action) {
  //  node hw2.js list 輸出前二十本書的 id 與書名
  case 'list':
    listBooks();
    break;
  //  node hw2.js read 1 輸出 id 為 1 的書籍
  case 'read':
    readBook(params);
    break;
  //  node hw2.js delete 1 刪除 id 為 1 的書籍
  case 'delete':
    deleteBooks(params);
    break;
  //  node hw2.js create "I love coding" 新增一本名為 I love coding 的書
  case 'create':
    creatBook(params);
    break;
  //  node hw2.js update 1 "new name" 更新 id 為 1 的書名為 new name
  case 'update':
    updateBook(params, args[4]);
    break;
  default:
    console.log('輸入錯誤!請輸入正確指令');
}
