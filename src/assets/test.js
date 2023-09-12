/**
 * @param {string} str
 * @return {number}
 */
var strToInt = function(arr) {
    for(let i = 0;i < arr.length-1;i++){
        for(let j = 0;j < arr.length-1-i;j++){
            if(arr[j+1] < arr[j]){
                [arr[j+1],arr[j]] = [arr[j],arr[j+1]];
            }
        }
    }
    return arr;
};
console.log(strToInt([2,1,3]));
