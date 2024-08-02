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


// not implemented .

// // src/components/YourComponent.tsx
// import React, { useEffect, useState } from 'react';
// import { throttle } from '../utils/throttle';

// const YourComponent: React.FC = () => {
//   const [scrollPosition, setScrollPosition] = useState<number>(0);

//   const handleScroll = throttle(() => {
//     setScrollPosition(window.scrollY);
//     console.log('Scroll position:', window.scrollY);
//   }, 200);

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [handleScroll]);

//   return <div>Scroll Position: {scrollPosition}</div>;
// };

// export default YourComponent;
