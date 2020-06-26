const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

function solve(lines) {
  const N = Number(lines[0]);
  for (let i = 1; i <= N; i += 1) {
    console.log('*'.repeat(i));
  }
}

rl.on('close', () => solve(liness));
