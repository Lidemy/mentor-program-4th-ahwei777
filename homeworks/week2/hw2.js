function capitalize(str) {
    let result = ""
    let findLowerCase = false
    for(let i = 0 ; i<str.length ; i++){
      //若先找到大寫字母則直接 return 原字串
      if(str[i]>="A" && str[i]<="Z"){
        return str
      }
      //若找到小寫則轉為大寫，並設定跳出判斷
      if(str[i]>="a" && str[i]<="z" && !find){
            result += str[i].toUpperCase()
            findLowerCase = true
      }
      else{
          result += str[i]
      }
    }
    return result
  }

console.log(capitalize('hello'));
