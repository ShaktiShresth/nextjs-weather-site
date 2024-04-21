"use client";

import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";

const AlertError = ({ message, setError }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);

      const timeoutId = setTimeout(() => {
        setIsVisible(false);
        setError("");
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, []);

  return isVisible ? (
    <div className="text-sm p-3 flex gap-4 items-center rounded-lg max-w-[300px] absolute bottom-4 right-4 z-[2] text-red-500 bg-white opacity-75">
      <IoWarningOutline size={28} />
      {message}
    </div>
  ) : null;
};

export default AlertError;
