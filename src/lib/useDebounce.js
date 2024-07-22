import { useCallback, useRef } from "react";

const useDebounce = (callback, delay) => {
  const timer = useRef(null);

  const debouncedCallback = useCallback(
    (...args) => {
      console.log("Debounced callback invoked with args:", args);
      if (timer.current) {
        clearTimeout(timer.current);
        console.log("Existing timer cleared");
      }
      timer.current = setTimeout(() => {
        console.log("Executing callback after delay:", delay);
        callback(...args);
      }, delay);
      console.log("Timer set for:", delay, "ms");
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
