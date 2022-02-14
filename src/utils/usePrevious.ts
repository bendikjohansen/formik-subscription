import { useEffect, useState } from "react";

export const usePrevious = <T>(value: T) => {
  const [history, setHistory] = useState<[T, T?]>([value, undefined]);

  useEffect(() => {
    if (history[0] === value) {
      return;
    }

    setHistory([value, history[0]]);
  })

  return history[1];
}