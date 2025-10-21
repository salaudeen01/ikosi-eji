import { useEffect, useState } from "react";

export const useBreakingNewsRotation = (length: number, delay: number = 5000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!length || length <= 1) return; // Nothing to rotate

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % length);
    }, delay);

    return () => clearInterval(interval);
  }, [length, delay]);

  return currentIndex;
};

export const useClientUrl = () => {
  const [currentUrl, setCurrentUrl] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
      setOrigin(window.location.origin);
    }
  }, []);

  return { currentUrl, origin };
};
