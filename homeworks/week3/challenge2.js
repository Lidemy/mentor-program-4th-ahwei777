//  [LIOJ1052 - 貪婪的小偷 Part2](https://oj.lidemy.com/problem/1052)

const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

function solve(lines) {
  const [N, W] = lines[0].split(' ').map(Number);
  //  console.log(N,W)
  const weightArr = [];
  const priceArr = [];
  for (let i = 1; i < lines.length; i += 1) {
    const arr = lines[i].split(' ').map(Number);
    weightArr.push(arr[0]);
    priceArr.push(arr[1]);
  }
  const result = [];
  //  設 w 為背包容量，依序找出每個容量下可容納的最大價值
  for (let w = 0; w <= W; w += 1) {
    // 設 result 為二維陣列
    result[w] = [];
    //  j為對應物品編號,共有 N 個
    for (let j = 0; j < N; j += 1) {
      //  取第一個物品，如目前容量已經小於其重量則無法取，大於才可取
      if (j === 0) {
        result[w][j] = weightArr[j] > w ? 0 : priceArr[j];
      //  目前容量完全無法容納物品 j 時不需比較取前取後價值，故目前背包價值 = 取前價值
      } else if (w < weightArr[j]) {
        result[w][j] = result[w][j - 1];
      //  目前容量可取物品 j ,但為了價值最大化需比較取與不取的結果 :(物品 j 價值 + 剩餘空間最大價值) 與 (取前價值)
      } else {
        result[w][j] = Math.max(
          result[w - weightArr[j]][j - 1] + priceArr[j],
          result[w][j - 1],
        );
      }
    }
  }
  //  console.table(result)
  console.log(result[W][N - 1]);
}

rl.on('close', () => solve(liness));
