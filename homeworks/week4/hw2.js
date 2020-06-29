const request = require('request');

//  node hw2.js list // 印出前二十本書的 id 與書名
if (process.argv[2] === 'list') {
  request(
    'https://lidemy-book-store.herokuapp.com/books?_limit=20',
    (error, response, body) => {
    //  console.log('statusCode:', response && response.statusCode)
      const json = JSON.parse(body);
      for (let i = 0; i < json.length; i += 1) {
        console.log(`${json[i].id} ${json[i].name}`);
      }
    },
  );
}
//  node hw2.js read 1 // 輸出 id 為 1 的書籍
if (process.argv[2] === 'read') {
  request(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error, response, body) => {
      if (error) {
        return console.log('讀取失敗', error);
      }
      const json = JSON.parse(body);
      if (body === '{}') {
        console.log('此書籍已被刪除');
      } else {
        console.log(json.name);
      }
      return true;
    },
  );
}
//  node hw2.js delete 1 // 刪除 id 為 1 的書籍
if (process.argv[2] === 'delete') {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
    (error) => {
      if (error) {
        console.log('刪除失敗', error);
      } else {
        console.log('刪除成功');
      }
      return true;
    },
  );
}
//  node hw2.js create "I love coding" // 新增一本名為 I love coding 的書
if (process.argv[2] === 'create') {
  request.post(
    {
      url: 'https://lidemy-book-store.herokuapp.com/books/',
      form: {
        name: process.argv[3],
      },
    },
    (error) => {
      if (error) {
        console.log('新增失敗', error);
      } else {
        console.log('新增成功');
      }
      return true;
    },
  );
}
//  node hw2.js update 1 "new name" // 更新 id 為 1 的書名為 new name
if (process.argv[2] === 'update') {
  request.patch(
    {
      url: `https://lidemy-book-store.herokuapp.com/books/${process.argv[3]}`,
      form: {
        name: process.argv[4],
      },
    },
    (error) => {
      if (error) {
        console.log('更新失敗', error);
      } else {
        console.log('更新成功');
      }
      return true;
    },
  );
}
