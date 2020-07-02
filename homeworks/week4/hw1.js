const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    //  console.log('statusCode:', response && response.statusCode)
    //  若 response 非合法的 JSON 字串會回傳錯誤，加上 try catch 以確保該錯誤可被捕獲處理
    if (error) {
      return console.log('抓取失敗', error);
    }
    let json;
    try {
      json = JSON.parse(body);
    } catch (e) {
      console.log(e); //  錯誤處理
    }
    for (let i = 0; i < json.length; i += 1) {
      console.log(`${json[i].id} ${json[i].name}`);
    }
    return true;
  },
);
