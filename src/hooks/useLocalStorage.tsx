import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;
type RemoveValue = () => void;

const getValueStorage = <T,>(key: string, initialState: T | (() => T)): T => {
  const savedValue = localStorage.getItem(key);
  return savedValue !== null
    ? JSON.parse(savedValue)
    : initialState instanceof Function
    ? initialState()
    : initialState;
};

export const useLocalStorage = <T,>(
  key: string,
  initialState: T | (() => T)
): [T, SetValue<T>, RemoveValue] => {
  const [value, setValue] = useState(() => getValueStorage(key, initialState));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  const removeValue = () => {
    const newValue =
      initialState instanceof Function ? initialState() : initialState;
    setValue(newValue);
    localStorage.removeItem(key);
  };

  return [value, setValue, removeValue];
};
