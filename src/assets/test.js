const fn = (arr, n) => {
  let res = [];
  let path = [];
  let sum = 0;
  arr.sort((a,b)=>a-b);
  const dfs = (m) => {
    if (sum == n) {
      res.push([...path]);
      return;
    }
    for (let i = m; i < arr.length; i++) {
      path.push(arr[i]);
      sum += arr[i];
      dfs(i + 1);
      sum -= arr[i];
      path.pop();
    }
  };
  dfs(0);
  console.log(res);
  let max = -Infinity;
  for (let k of res) {
    if (k.length) max = Math.max(k.length, max);
  }
  let ans = [];
  for (let k of res) {
    if (k.length == max) ans.push(k);
  }
  let s = Array.from(new Set(ans.map((v) => v.join("")))).map(v=>{
    let l = v.split('');
    return l.map(v=>parseInt(v))
  });
  return s;
};

let arr = [10,1,2,7,6,1,5];;
let n = 8;
console.log(fn(arr, n));
