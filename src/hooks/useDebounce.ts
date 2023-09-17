// 防抖函数封装
export default function debounce(func:Function, delay:number) {
  let timer = null;
  return function (...argu:any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, argu);
    }, delay);
  };
}
