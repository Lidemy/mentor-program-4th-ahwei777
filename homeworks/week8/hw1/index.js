//  將固定網址及文字設為變數
const API_URL = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
const errorMessage = '系統不穩定，請再試一次';
//  設立一用來 call API 的函數，呼叫後會回傳 err(失敗)或經處理後的物件 json(成功)，後續再設定 callback function 處理回傳值
function getPrize(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', API_URL, true);
  //  有送出 request 時
  request.onload = () => {
    //  成功取得 response 時
    if (request.status >= 200 && request.status < 400) {
      let json;
      //  如 response 非 JSON 格式字串的預處理
      try {
        json = JSON.parse(request.response);
      } catch (err) {
        cb(errorMessage);
        console.log(err);
        return;
      }
      //  response 是 JSON 格式字串，但沒有需要的資料索引
      if (!json.prize) {
        cb(errorMessage);
        return;
      }
      //  成功取得帶有 prize 資料的 JSON 格式字串，作為第二個參數傳給 cb
      cb(null, json);
    } else {
      //  未取得 response 時
      cb(errorMessage);
    }
  };
  //  未送出 request 時
  request.onerror = () => {
    cb(errorMessage);
  };
  //  執行送出 request 的函數
  request.send();
}
//  設定按下後的監聽行為
document.querySelector('.lottery-btn').addEventListener('click', () => {
  getPrize((err, json) => {
    //  產生錯誤時跳出 alert
    if (err) {
      // eslint-disable-next-line
      alert(err);
      return;
    }
    //  將各獎項資訊物件化，類似設定檔
    const prizes = {
      FIRST: {
        className: 'first-prize',
        prizeTitle: '恭喜你中頭獎了！日本東京來回雙人遊！',
      },
      SECOND: {
        className: 'second-prize',
        prizeTitle: '二獎！90 吋電視一台！',
      },
      THIRD: {
        className: 'third-prize',
        prizeTitle: '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！',
      },
      NONE: {
        className: 'none-prize',
        prizeTitle: '銘謝惠顧',
      },
    };
    //  解構語法
    const { className, prizeTitle } = prizes[json.prize];
    //  依據獎項更換對應背景的 class
    document.querySelector('.section-lottery').classList.add(className);
    //  依據獎項更換對應的文字
    document.querySelector('.lottery-result__title').innerText = prizeTitle;
    //  抽獎後隱藏抽獎說明資訊
    document.querySelector('.lottery-block').classList.add('hide');
    //  抽獎後顯示獲得獎項資訊
    document.querySelector('.lottery__result').classList.remove('hide');
  });
});
