import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface useChangeLocationProps {
  condition: boolean;
  callback: () => void;
}

function useChangeLocation({ condition, callback }: useChangeLocationProps) {
  const location = useLocation();
  const prevLocation = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname !== prevLocation.current) {
      if (condition) {
        callback();
      }

      prevLocation.current = location.pathname;
    }
  }, [location, condition, callback]);
}

export default useChangeLocation;
