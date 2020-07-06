const request = require('request');

const url = 'https://lidemy-book-store.herokuapp.com';

request(
  `${url}/books?_limit=10`, (err, response, body) => {
    //  console.log('statusCode:', response && response.statusCode)
    //  && 運算子：若第一個數值轉換為 true，則回傳第二個數值，否則回傳第一個數值
    //  API 回傳內容失敗時的 error 處理
    if (err) {
      return console.log('抓取失敗', err);
    }
    //  API 成功回傳內容但 response 非合法 JSON 字串時的錯誤處理，加上 try catch 以確保該錯誤可被捕獲
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
