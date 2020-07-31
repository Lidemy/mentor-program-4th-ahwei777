//  將固定資訊儲存成變數
const API_URL = 'https://api.twitch.tv/kraken';
const errorMessage = '出現問題，請稍後再試';
let selectingGame;
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
//  建立函數：呼叫 api 並回傳熱門遊戲名稱
function getGames(cb) {
  const request = new XMLHttpRequest();
  request.open('GET', `${API_URL}/games/top?limit=5`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'dydednz75uxxl9yy8cilw7t40ofcsw');
  request.onload = () => {
    const statusCode = request.status;
    if (statusCode >= 200 && statusCode < 400) {
      let json;
      try {
        json = JSON.parse(request.response);
      } catch (err) {
        cb(errorMessage);
        console.log(err);
        return;
      }
      cb(null, json);
    }
  };
  request.onerror = () => {
    cb(errorMessage);
  };
  request.send();
}
//  建立函數：呼叫 api 並回傳實況頻道資訊
function getStreams(name, cb) {
  const request = new XMLHttpRequest();
  //  因遊戲名稱唯一無設限字串，需先使用編碼函數處理以免與 Query string 混淆
  request.open('GET', `${API_URL}/streams/?game=${encodeURIComponent(name)}&limit=100`, true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', 'dydednz75uxxl9yy8cilw7t40ofcsw');
  request.onload = () => {
    const statusCode = request.status;
    if (statusCode >= 200 && statusCode < 400) {
      let json;
      try {
        json = JSON.parse(request.response);
      } catch (err) {
        cb(errorMessage);
        console.log(err);
        return;
      }
      cb(null, json);
    }
  };
  request.onerror = () => {
    cb(errorMessage);
  };
  request.send();
}
//  設定目前遊戲頁面下新增元素的計數器，每次呼叫 appendStreams 後會紀錄，如果點選別的遊戲會再重置
let streamsCount = 0;
//  建立函數：依據回傳實況資訊填入模板對應欄位，並新增該元素
function appendStreams(streamsList) {
  if (streamsCount === 100) {
    // eslint-disable-next-line
    alert('No more streams!');
    return;
  }
  for (let i = streamsCount; i < (streamsCount + 25); i += 1) {
    const div = document.createElement('div');
    const content = template
      .replace('$preview', streamsList[i].preview.medium)
      .replace('$logo', streamsList[i].channel.logo)
      .replace('$status', streamsList[i].channel.status)
      .replace('$name', streamsList[i].channel.name);
    document.querySelector('.streams__list').appendChild(div);
    div.outerHTML = content;
  }
  streamsCount += 25;
}
//  建立函數：建立占位元素用於修正尾行版面
function addPlaceholder() {
  const element = document.createElement('div');
  element.classList.add('stream-empty');
  document.querySelector('.streams__list').appendChild(element);
}
function removePlaceholder() {
  document.querySelector('.streams__list').removeChild(document.querySelector('.streams__list').lastChild);
}

//  呼叫 api 函數
getGames((err, json) => {
  if (err) {
    // eslint-disable-next-line
    alert(err);
    return;
  }
  //  取出前五名遊戲名稱並儲存為一陣列
  const topGames = json.top.map(ele => ele.game.name);
  //  依序將前五名遊戲名稱填入遊戲列表
  // eslint-disable-next-line
  for (const topGame of topGames) {
    const div = document.createElement('div');
    div.innerText = topGame;
    div.classList.add('topGames');
    document.querySelector('.navbar__list').appendChild(div);
  }
  //  預設顯示第一名的遊戲，將該遊戲選項設為已點擊
  document.querySelector('.navbar__list').firstChild.classList.add('active');
  //  預設顯示第一名的遊戲實況列表，調用相關函數以更新頁面元素
  getStreams(topGames[0], (error, data) => {
    if (error) {
      // eslint-disable-next-line
      alert(error);
      return;
    }
    //  更新實況列表的主標題
    // eslint-disable-next-line
    [document.querySelector('.game__info-name').innerText] = topGames;
    //  填入建立好的實況元素
    appendStreams(data.streams);
    //  尾端填入三個空白占位元素，確保最後一行元素置左
    addPlaceholder();
    addPlaceholder();
    addPlaceholder();
    // eslint-disable-next-line
    [selectingGame] = topGames;
  });
});
//  於遊戲列表設置代理事件監聽器
document.querySelector('.navbar__list').addEventListener('click', (e) => {
  if (e.target.classList.contains('topGames')) {
    const lists = e.target.parentNode.childNodes;
    //  清空其他遊戲選項的被點選標記
    // eslint-disable-next-line
    for (const list of lists) {
      list.classList.remove('active');
    }
    //  清空元素計數器
    streamsCount = 0;
    //  將目前點選的遊戲選項添加標記
    e.target.classList.add('active');
    const targetGame = e.target.innerText;
    //  更新實況列表的主標題為目前點選的遊戲名稱
    document.querySelector('.game__info-name').innerText = targetGame;
    //  清空實況列表欄位
    document.querySelector('.streams__list').innerHTML = '';
    //  調用相關函數以更新頁面元素
    getStreams(targetGame, (err, json) => {
      if (err) {
        // eslint-disable-next-line
        alert(err);
        return;
      }
      appendStreams(json.streams);
      addPlaceholder();
      addPlaceholder();
      addPlaceholder();
      selectingGame = targetGame;
    });
  }
});
//  看更多實況的按鈕動作
document.querySelector('.more-btn').classList.remove('hide');
document.querySelector('.more-btn').addEventListener('click', () => {
  getStreams(selectingGame, (err, json) => {
    if (err) {
      // eslint-disable-next-line
      alert(err);
      return;
    }
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
