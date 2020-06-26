//  [LIOJ1053 - 走迷宮](https://oj.lidemy.com/problem/1053)

const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

function solve(lines) {
  const [H, W] = lines[0].split(' ').map(Number);
  const maze = [];
  for (let i = 1; i < lines.length; i += 1) {
    const temp = lines[i].split('');
    maze.push(temp);
  }
  //  將所在位置設為起點
  let [nowH, nowW] = [0, 0];
  const queue = [{
    H: 0,
    W: 0,
    step: 0,
  }];
  //  未達終點時繼續迴圈，因採廣度優先搜尋故只要走到終點必為最短路徑
  while (!(nowH === H - 1 && nowW === W - 1)) {
    const nowStep = queue[0].step;
    //  將數列第一個點作為此次起點
    nowH = queue[0].H;
    nowW = queue[0].W;
    //  將目前此點設定為抵達步數，除紀錄外亦可避免走回頭路
    maze[nowH][nowW] = queue[0].step;
    //  右方可通行時將其存入數列備查
    if (nowH - 1 >= 0) {
      if (maze[nowH - 1][nowW] === '.') {
        queue.push({
          H: nowH - 1,
          W: nowW,
          step: nowStep + 1,
        });
      }
    }
    //  下方可通行時將其存入數列備查
    if (nowH + 1 < H) {
      if (maze[nowH + 1][nowW] === '.') {
        queue.push({
          H: nowH + 1,
          W: nowW,
          step: nowStep + 1,
        });
      }
    }
    //  右方可通行時將其存入數列備查
    if (nowW + 1 < W) {
      if (maze[nowH][nowW + 1] === '.') {
        queue.push({
          H: nowH,
          W: nowW + 1,
          step: nowStep + 1,
        });
      }
    }
    //  左方可通行時將其存入數列備查
    if (nowW - 1 >= 0) {
      if (maze[nowH][nowW - 1] === '.') {
        queue.push({
          H: nowH,
          W: nowW - 1,
          step: nowStep + 1,
        });
      }
    }
    /*
    此時可篩選此輪找到的可行路線，若其中已包含終點可提早 return 結束，若不篩選也不會影響答案
    function filterBy(queue, h, w) {
      return queue.filter(item => item.H == h && item.W == w)
    }
    if(filterBy(queue,H-1,W-1)!=0){
        console.log(nowStep+1)
        //console.table(maze) 可印出圖表
        return
    }
    */
    //  移除起點後繼續從備查數列中依序搜尋，直到終點成為 queue[0]
    queue.shift();
  }
  console.log(maze[H - 1][W - 1]);
}

rl.on('close', () => solve(liness));
