const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

function isPrime(n) {
  if (n === 1) {
    return false;
  }
  const end = Math.sqrt(n);
  for (let i = 2; i <= end; i += 1) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

function solve(lines) {
  const arr = [];
  for (let i = 1; i < lines.length; i += 1) {
    arr.push(Number(lines[i]));
  }
  for (let i = 0; i < arr.length; i += 1) {
    if (isPrime(arr[i])) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('close', () => solve(liness));
