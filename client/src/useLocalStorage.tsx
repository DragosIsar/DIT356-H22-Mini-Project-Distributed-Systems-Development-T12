import { useState, useEffect } from 'react'

type ReturnType<T> = [
  T | undefined,
  React.Dispatch<React.SetStateAction<T | undefined>>
]

export const useLocalStorage = <T,>(
  key: string, 
  initValue?: T
  ): ReturnType<T> => {
  const [state, setState] = useState<T | undefined>(
    () => {
      if (!initValue) return;
      try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : initValue
      } catch (error) {
        return initValue
      }
    }
  );

  useEffect(() => {
    if (state) {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.log(error)
      }
    }
  }, [state])
  return [state, setState]
}