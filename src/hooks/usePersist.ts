import { useState, useCallback, useEffect } from 'react';

const usePersist = <T>(initialValue: T, key: string): [T, (value: T) => void] => {
  const [value, setValue] = useState(initialValue);

  const updateValue = useCallback(
    (nextValue: T) => {
      localStorage.setItem(key, JSON.stringify(nextValue));
      setValue(nextValue);
    },
    [key],
  );

  useEffect(() => {
    const valueString = localStorage.getItem(key);
    if (valueString) {
      setValue(JSON.parse(valueString));
    }
  }, [key]);

  return [value, updateValue];
};

export default usePersist;
