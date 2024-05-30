import { useEffect, useState } from "react";

type debouncedType = {
  value: string;
  delay: number;
  enabled?: boolean;
};

function useDebounce({ value, delay, enabled = true }: debouncedType) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let debounceId: NodeJS.Timeout | null = null;

    if (enabled) {
      debounceId = setTimeout(() => setDebouncedValue(value), delay);
    } else {
      setDebouncedValue(value);
    }

    return () => {
      if (debounceId) {
        clearTimeout(debounceId);
      }
    };
  }, [value, delay, enabled]);

  return debouncedValue;
}

export default useDebounce;
