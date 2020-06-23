function multiply(a, b){
  //a, b已超過數字可儲存範圍，故分割成陣列儲存
  let aArray = a.split("")  
  let bArray = b.split("")  
  // n 位數乘以 m 位數的值最多為 n+m 位數，故建立一長度相符的陣列供存取後續運算
  let result = Array(a.length + b.length).fill(0)  
  //先不考慮進位狀況，將直式乘法運算結果依位數儲存至陣列內對應位置
    for(let i = 0 ; i<aArray.length ; i++){   
    for(let j = 0 ; j<bArray.length ; j++){
      result[i+j+1] += aArray[i]*bArray[j]    //result[0]保留給最高位需進位時使用
    }
  }
  //處理各位數進位狀況
  for(let i = result.length-1 ; i>=0 ; i--){
    if(result[i] > 10){
      result[i-1] += Math.floor(result[i]/10);  //將進位結果加至前一位
      result[i] = result[i] % 10 ; //完成進位，該位只留下餘數
    }
  }
  return result
}

//參考資料：https://www.itread01.com/content/1550181095.html