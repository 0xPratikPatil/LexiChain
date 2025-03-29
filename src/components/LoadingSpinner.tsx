
import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="relative h-12 w-12">
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto animate-spin h-10 w-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 m-auto animate-spin h-8 w-8 border-4 border-secondary border-t-transparent rounded-full" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
