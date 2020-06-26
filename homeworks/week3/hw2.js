const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

function isNarcissistic(n) {
  const nArr = n.toString().split('');
  const L = nArr.length;
  let sum = 0;
  for (let i = 0; i < L; i += 1) {
    sum += Number(nArr[i]) ** L;
  }
  if (sum === n) {
    return true;
  }
  return '';
}

function solve(lines) {
  const [N, M] = lines[0].split(' ').map(x => Number(x));
  for (let i = N; i <= M; i += 1) {
    if (isNarcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('close', () => solve(liness));
