const request = require('request');

const name = process.argv[2];
/*  eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
request(
  {
    url: `https://api.twitch.tv/kraken/streams/?game=${name}`,
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
    //  console.log(json.streams);
    for (let i = 0; i < json.streams.length; i += 1) {
      console.log(`${json.streams[i].channel.name} ${json.streams[i]._id}`);
    }
    return true;
  },
);

//  'Accept': 'application/vnd.twitchtv.v5+json'
//  'ID': 'dydednz75uxxl9yy8cilw7t40ofcsw'
