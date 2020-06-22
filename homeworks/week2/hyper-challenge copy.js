function multiply(a,b){
    let aArray = a.split("")
    let bArray = b.split("")
    let sum = 0
    for(let i = 0 ; i<aArray.length ; i++){
      for(let j = bArray.length-1 ; j>=0 ; j--){
        sum += aArray[i]*Math.pow(10,aArray.length-1-i)*bArray[j]*Math.pow(10,bArray.length-1-j)
      }
    }
    return sum
  }