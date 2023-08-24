// 节流函数封装
export function throttle(func: Function, delay: number) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, arguments);
        timer = null;
      }, delay);
    }
  };
}
