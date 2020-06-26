const readline = require('readline');

const liness = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.on('line', line => liness.push(line));

/*
無腦 BigInt 方式
function solve(lines) {
    const n = Number(lines[0]);
    for(let i = 1 ; i<lines.length;i++){
      let [a, b, K] = lines[i].split(" ")
      let A = BigInt(a)
      let B = BigInt(b)
      if(A === B){
        console.log("DRAW")
      }
      if(A>B){
        K == 1 ? console.log("A") : console.log("B")
      }
      if(A<B){
        K == 1 ? console.log("B") : console.log("A")
      }
    }
}
*/

//  比較字串長度，長度相同時則以字典序比較字串大小
function solve(lines) {
  for (let i = 1; i < lines.length; i += 1) {
    let [strA, strB, K] = lines[i].split(' ');
    K = parseInt(K, 10);
    //  K=-1 時將 A 與 B 互換
    if (K === -1) {
      const temp = strA;
      strA = strB;
      strB = temp;
    }
    if (strA === strB) {
      console.log('DRAW');
    } else if (strA.length > strB.length) {
      console.log('A');
    } else if (strA.length < strB.length) {
      console.log('B');
    } else if (strA > strB) {
      console.log('A');
    } else {
      console.log('B');
    }
  }
}

rl.on('close', () => solve(liness));
