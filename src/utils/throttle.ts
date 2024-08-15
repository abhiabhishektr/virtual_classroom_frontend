export function throttle(fn: (arg: number) => void, wait: number) {
    let timeout: NodeJS.Timeout | null = null;
    return function (this: any, arg: number) {
      if (!timeout) {
        fn(arg);
        timeout = setTimeout(() => {
          timeout = null;
        }, wait);
      }
    };
}

