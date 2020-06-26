const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

function solve(lines) {
  const arr = lines[0].split('');
  const reverse = arr.reverse().join('');
  if (reverse === lines[0]) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('close', () => solve(liness));
