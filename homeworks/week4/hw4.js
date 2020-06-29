const request = require('request');

request(
  {
    url: 'https://api.twitch.tv/kraken/games/top',
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': 'dydednz75uxxl9yy8cilw7t40ofcsw',
    },
  },
  (error, response, body) => {
    if (error) {
      return console.log('抓取失敗', error);
    }
    const json = JSON.parse(body);
    for (let i = 0; i < json.top.length; i += 1) {
      console.log(`${json.top[i].viewers} ${json.top[i].game.name}`);
    }
    return true;
  },
);

//  'Accept': 'application/vnd.twitchtv.v5+json'
//  'ID': 'dydednz75uxxl9yy8cilw7t40ofcsw'
