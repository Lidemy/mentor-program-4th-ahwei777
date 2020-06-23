function join(arr, concatStr) {
    if(arr == 0){  //special case 當陣列為空時
        return "";
    }
    let result = "";
    for(let i = 0 ; i < arr.length-1 ; i++){
        result += arr[i] + concatStr
    }
    return result + arr[arr.length-1];
}

function repeat(str, times) {
    let result = "";
    for(let i = 1 ; i<=times ; i++){
        result += str
    }
    return result;
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
