import { useRef, useEffect } from "react";

function useOutsideClick(callback: () => void) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: globalThis.MouseEvent) => {
      if (!ref.current?.contains(event.target as HTMLDivElement)) {
        callback();
      }
    };

    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);

  return ref;
}

export default useOutsideClick;
