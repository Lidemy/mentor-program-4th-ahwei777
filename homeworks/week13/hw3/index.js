/* global $ */
//  將固定資訊儲存成變數
const API_URL = 'https://api.twitch.tv/kraken';
//  const errorMessage = '出現問題，請稍後再試';
let selectingGame;
//  設定目前遊戲頁面下新增元素的計數器，每次呼叫 appendStreams 後會紀錄，如果點選別的遊戲會再重置
let streamsCount = 0;

//  建立實況元素模板
const template = `
<div class = 'stream'>
  <img class = 'stream-preview' src = '$preview'></img>
  <div class = 'stream-info'>
    <img class = 'stream-logo' src = '$logo'></img>
    <div class = 'stream-info-right'>
      <div class = 'stream-info-status'>$status</div>
      <div class = 'stream-info-name'>$name</div>
    </div>
  </div>
</div>
`;

//  建立 fetch 函數：呼叫 api 並回傳熱門遊戲名稱，無參數
const getGamesByFetch = new Promise((resolve, reject) => {
  fetch(`${API_URL}/games/top?limit=5`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'dydednz75uxxl9yy8cilw7t40ofcsw',
    },
  }).then((response) => {
    //  執行成功：將 response 轉為 json 格式後回傳
    resolve(response.json());
  }).catch((err) => {
    //  執行失敗：回傳 err
    reject(err);
  });
});

//  建立 fetch 函數：呼叫 api 並回傳指定遊戲目前實況頻道資訊，需傳入一個參數 name
// eslint-disable-next-line
const getStreamsByFetch = (name) => new Promise((resolve, reject) => {
  fetch(`${API_URL}/streams/?game=${encodeURIComponent(name)}&limit=100`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'dydednz75uxxl9yy8cilw7t40ofcsw',
    },
  }).then((response) => {
    //  執行成功：將 response 轉為 json 格式後回傳
    resolve(response.json());
  }).catch((err) => {
    //  執行失敗：回傳 err
    reject(err);
  });
});

//  建立函數：依據回傳實況資訊填入模板對應欄位，並新增該元素
function appendStreams(streamsList) {
  for (let i = streamsCount; i < (streamsCount + 25); i += 1) {
    const element = template
      .replace('$preview', streamsList[i].preview.medium)
      .replace('$logo', streamsList[i].channel.logo)
      .replace('$status', streamsList[i].channel.status)
      .replace('$name', streamsList[i].channel.name);
    $('.streams__list').append(element);
  }
  streamsCount += 25;
  //  如果當次取得實況數量已達上限，則隱藏更多按鈕
  if (streamsCount === 100) {
    $('.more-btn').hide();
  }
}
//  建立函數：建立占位元素用於修正最後一行排版
function addPlaceholder() {
  const element = "<div class='stream-empty'></div>";
  $('.streams__list').append(element);
}
function removePlaceholder() {
  $('.streams__list').children().last().remove();
}

//  呼叫 api 函數
getGamesByFetch
  //  錯誤處理
  .catch((err) => {
    console.log(err);
  }).then((json) => {
    //  取出前五名遊戲名稱並儲存為一陣列
    const topGames = json.top.map(ele => ele.game.name);
    //  依序將前五名遊戲名稱填入遊戲列表
    // eslint-disable-next-line
    for (const topGame of topGames) {
      const element = `<div class='topGames'>${topGame}</div>`;
      $('.navbar__list').append(element);
    }
    //  預設顯示第一名的遊戲，將該遊戲選項設為已點擊
    $('.navbar__list').children().first().addClass('active');
    //  預設顯示第一名的遊戲實況列表，調用相關函數以更新頁面元素
    getStreamsByFetch(topGames[0])
      //  錯誤處理
      .catch((error) => {
        console.log(error);
      }).then((json1) => {
        //  更新實況列表的主標題
        // eslint-disable-next-line
        $('.game__info-name').html(topGames[0]);
        //  填入建立好的實況元素
        appendStreams(json1.streams);
        //  尾端填入三個空白占位元素，確保最後一行元素置左
        addPlaceholder();
        addPlaceholder();
        addPlaceholder();
        // eslint-disable-next-line
        [selectingGame] = topGames;
      });
  });

//  於遊戲列表設置代理事件監聽器
$('.navbar__list').on('click', '.topGames', (e) => {
  //  清空其他遊戲選項的被點選標記
  const lists = $('.topGames');
  // eslint-disable-next-line
  for (const list of lists) {
    list.classList.remove('active');
  }
  //  清空元素計數器
  streamsCount = 0;
  //  將目前點選的遊戲選項添加標記
  $(e.target).addClass('active');
  //  更新實況列表的主標題為目前點選的遊戲名稱
  const targetGame = $(e.target).text();
  $('.game__info-name').html(targetGame);
  //  清空實況列表欄位
  $('.streams__list').empty();
  //  調用相關函數以更新頁面元素
  getStreamsByFetch(targetGame)
    //  錯誤處理
    .catch((err) => {
      console.log(err);
    }).then((json) => {
      appendStreams(json.streams);
      addPlaceholder();
      addPlaceholder();
      addPlaceholder();
      selectingGame = targetGame;
    });
});

//  看更多按鈕點擊後動作
$('.more-btn').click(() => {
  getStreamsByFetch(selectingGame)
  //  錯誤處理
    .catch((err) => {
      console.log(err);
    }).then((json) => {
      //  先清空原本的空白占位元素
      removePlaceholder();
      removePlaceholder();
      removePlaceholder();
      appendStreams(json.streams);
      addPlaceholder();
      addPlaceholder();
      addPlaceholder();
    });
});
