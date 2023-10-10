import { useEffect, useState } from "react";

const useDebouch = (keyword: string, delay: number) => {
  let [debouncheValue, setDebouncheValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncheValue(keyword);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [keyword]);

  return {debouncheValue}
};

export default useDebouch;
