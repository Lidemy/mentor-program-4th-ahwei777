const request = require('request');

const API_URL = 'https://restcountries.eu/rest/v2';
const name = process.argv[2];
//  console.log(process.argv)

request(
  `${API_URL}/name/${name}`,
  (err, response, body) => {
    //  利用正規表達式判斷輸入
    if (!(/^[A-Za-z]+$/.test(name))) {
      return console.log('請以英文字母輸入該國家名稱');
    }
    if (err) {
      return console.log('抓取失敗', err);
    }
    let json;
    try {
      json = JSON.parse(body);
    } catch (error) {
      console.log(error);
    }
    if (json.status === 404) {
      return console.log('「找不到國家資訊」');
    }
    for (let i = 0; i < json.length; i += 1) {
      console.log('============');
      console.log(`國家：${json[i].name}`);
      console.log(`首都：${json[i].capital}`);
      console.log(`貨幣：${json[i].currencies[0].code}`);
      console.log(`國碼：${json[i].callingCodes}`);
    }
    return true;
  },
);
