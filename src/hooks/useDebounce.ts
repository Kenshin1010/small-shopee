import { useEffect, useState } from "react";

type debouncedType = {
  value: string;
  delay: number;
};

function useDebounce({ value, delay }: debouncedType) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const debounceId = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(debounceId);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
