import { useCallback, useEffect, useRef, useState } from "react";

const TOAST_DURATION = 2000;

export const useCopyToClipboard = () => {
  const [toast, setToast] = useState("");
  const timeoutRef = useRef(null);

  const copyToClipboard = useCallback(async (text, label = "Text") => {
    if (!text) return false;

    try {
      await navigator.clipboard.writeText(text);

      setToast(`${label} copied!`);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setToast("");
      }, TOAST_DURATION);

      return true;
    } catch (error) {
      console.error("Failed to copy:", error);

      setToast("Failed to copy");

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setToast("");
      }, TOAST_DURATION);

      return false;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    copyToClipboard,
    toast,
  };
};