function search(arr, n) {
    let start = 0;
    let end = arr.length-1;
    while(start<=end){
      let mid = Math.floor((start+end)/2)
      if(arr[mid]===n){
        return mid
      }
      else if(arr[mid]>n){
        end = mid - 1
      }
      else {
        start = mid + 1
      }
    }
    return -1
  }

console.log(search([1,2,4,5,6], 5));
