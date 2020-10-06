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
function getGamesByFetch() {
  return fetch(`${API_URL}/games/top?limit=5`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'dydednz75uxxl9yy8cilw7t40ofcsw',
    },
  //  server 有正確回應時
  }).then((response) => {
    //  判斷 status
    const { status } = response;
    //  status 正常，將 response 轉為 json 格式後回傳
    if (status >= 200 && status < 400) {
      return response.json();
    }
    //  status 有誤，丟出錯誤後終止程式碼
    throw new Error(status);
  //  server 無正確回應，例如錯誤網址直接找不到 server 或連線異常等
  }).catch((error) => {
    console.log(error);
  });
}

function appendGames(gamesList) {
  //  取出前五名遊戲名稱並儲存為一陣列
  const topGames = gamesList.top.map(ele => ele.game.name);
  //  依序將前五名遊戲名稱填入遊戲列表
  // eslint-disable-next-line
  for (const topGame of topGames) {
    const element = `<div class='topGames'>${topGame}</div>`;
    $('.navbar__list').append(element);
  }
  //  預設顯示第一名的遊戲，將該遊戲選項設為已點擊
  $('.navbar__list').children().first().addClass('active');
  //  執行完畢後直接回傳第一名遊戲名稱，以便後續直接抓取實況
  return topGames[0];
}

//  建立 fetch 函數：呼叫 api 並回傳指定遊戲目前實況頻道資訊，需傳入一個參數 name
// eslint-disable-next-line
function getStreamsByFetch(name) {
  return fetch(`${API_URL}/streams/?game=${encodeURIComponent(name)}&limit=100`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'dydednz75uxxl9yy8cilw7t40ofcsw',
    },
  //  server 有正確回應時
  }).then((response) => {
    //  判斷 status
    const { status } = response;
    //  status 正常，將 response 轉為 json 格式後回傳
    if (status >= 200 && status < 400) {
      return response.json();
    }
    //  status 有誤，丟出錯誤後終止程式碼
    throw new Error(status);
  //  server 無正確回應，例如錯誤網址直接找不到 server 或連線異常等
  }).catch((error) => {
    console.log(error);
  });
}
//  建立函數：建立占位元素用於修正最後一行排版
function addPlaceholder() {
  const element = "<div class='stream-empty'></div>";
  $('.streams__list').append(element);
}
function removePlaceholder() {
  $('.streams__list').children().last().remove();
}
//  建立函數：依據回傳實況資訊填入模板對應欄位，並新增該元素
function appendStreams(streamsList) {
  //  先清空原本的空白占位元素
  removePlaceholder();
  removePlaceholder();
  removePlaceholder();
  for (let i = streamsCount; i < (streamsCount + 25); i += 1) {
    const element = template
      .replace('$preview', streamsList[i].preview.medium)
      .replace('$logo', streamsList[i].channel.logo)
      .replace('$status', streamsList[i].channel.status)
      .replace('$name', streamsList[i].channel.name);
    $('.streams__list').append(element);
  }
  //  尾端填入三個空白占位元素，確保最後一行元素置左
  addPlaceholder();
  addPlaceholder();
  addPlaceholder();
  streamsCount += 25;
  //  如果當次取得實況數量已達上限，則隱藏更多按鈕
  if (streamsCount === 100) {
    $('.more-btn').hide();
  }
}

//  建立函數：初始化，抓取遊戲列表並載入第一名的實況
async function init() {
  //  呼叫 api 函數
  //  預設顯示第一名的遊戲實況列表，調用相關函數以更新頁面元素
  const gamesList = await getGamesByFetch();
  const gameTopOne = appendGames(gamesList);
  const streams = await getStreamsByFetch(gameTopOne);
  appendStreams(streams.streams);
  selectingGame = gameTopOne;
  $('.game__info-name').html(gameTopOne);
}

init();

//  建立函數：初始化，抓取遊戲列表並載入第一名的實況
async function change(game) {
  //  清空其他遊戲選項的被點選標記
  $('.topGames').each((index, el) => { $(el).removeClass('active'); });
  //  清空元素計數器
  streamsCount = 0;
  //  將目前點選的遊戲選項添加標記
  $(game).addClass('active');

  //  更新實況列表的主標題為目前點選的遊戲名稱
  const targetGame = $(game).text();
  $('.game__info-name').html(targetGame);
  selectingGame = targetGame;

  //  清空實況列表欄位
  $('.streams__list').empty();
  //  調用相關函數以更新頁面元素
  const streams = await getStreamsByFetch(targetGame);
  appendStreams(streams.streams);
}

//  於遊戲列表設置代理事件監聽器
$('.navbar__list').on('click', '.topGames', (e) => {
  change(e.target);
});

//  看更多按鈕點擊後動作
$('.more-btn').click(() => {
  getStreamsByFetch(selectingGame)
    .then((json) => {
      appendStreams(json.streams);
    });
});
