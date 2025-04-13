import { useEffect, useRef } from "react";

export default function useClickOutside(callback) {
  const ref = useRef(null);

  useEffect(() => {
    
    function handleClickOutside(event) {
        console.log(event.target)
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [callback]);

  return ref;
}