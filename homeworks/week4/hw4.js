const request = require('request');

const API_URL = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'dydednz75uxxl9yy8cilw7t40ofcsw';

request(
  {
    url: `${API_URL}/games/top`,
    headers: {
      Accept: 'application/vnd.twitchtv.v5+json',
      'Client-ID': CLIENT_ID,
    },
  },
  (err, body) => {
    if (err) {
      return console.log('抓取失敗', err);
    }
    let json;
    try {
      json = JSON.parse(body);
    } catch (error) {
      console.log(error);
    }
    for (let i = 0; i < json.top.length; i += 1) {
      console.log(`${json.top[i].viewers} ${json.top[i].game.name}`);
    }
    return true;
  },
);

//  'Accept': 'application/vnd.twitchtv.v5+json'
//  'ID': 'dydednz75uxxl9yy8cilw7t40ofcsw'
