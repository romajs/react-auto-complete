import { useRef } from 'react';

export default function useConst<T>(value: T): T {
  const ref = useRef<T>();
  if (!ref.current) {
    ref.current = value;
  }
  return ref?.current;
}
