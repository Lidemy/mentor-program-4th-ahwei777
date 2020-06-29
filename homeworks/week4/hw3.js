const request = require('request');

const name = process.argv[2];
//  console.log(process.argv)

request(
  `https://restcountries.eu/rest/v2/name/${name}`,
  (error, response, body) => {
    if (error) {
      return console.log('抓取失敗', error);
    }
    const json = JSON.parse(body);
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
