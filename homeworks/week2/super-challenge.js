function add(a,b){
  let sum = a ^ b;         //各位數相加後，各位數呈現的"樣子"
  let carry = (a & b) << 1 //各位數相加後，如發生進位會呈現於此
  /*
  此時 sum + carry 即為答案，但因不可使用四則運算符，故需再思考如何繼續運用位元運算求解
  觀察後發現 sum 與 carry 可繼續當作參數傳入原函數繼續進行位元運算，
  每次運算都會逐步從右至左處理進位，此時 carry 也將從右開始逐漸歸零
  直到不再產生進位時( carry = 0)，此時答案即為 sum + 0 = sum
  */
  if( carry === 0){ //當不需進位時即為各位數相加值(sum)
    return sum
  }
  else{
    return add(sum,carry) //需要進位 → 再次遞迴呼叫本身進行位元運算
  }
}

//參考資料：https://blog.csdn.net/m8705/article/details/104652390?utm_medium=distribute.pc_relevant.none-task-blog-baidujs-3