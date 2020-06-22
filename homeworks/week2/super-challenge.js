function add(a,b){
  let sum = a ^ b; //各位數相加後，各位數呈現的狀況
  let carry = (a & b) << 1 //各位數相加後如有發生進位會記錄於此
  /*sum + carry 即為結果，但某位數相加後還需再考慮前一位是否有產生進位，
  有的話又會再產生進位，直到不用再進位時才結束
  */
  if( carry === 0){ //當不需進位時即為各位數相加值(sum)
    return sum
  }
  else{
    return add(sum,carry) //需要進位 → 再次遞迴呼叫本身進行位元運算
  }
}

https://blog.csdn.net/m8705/article/details/104652390?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-3