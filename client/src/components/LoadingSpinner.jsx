import React from "react";

const LoadingSpinner = ({ size }) => {
  // Determine the size classes based on the 'size' prop
  const sizeClasses = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-gray-200 dark:border-gray-200 ${sizeClasses[size]}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
