import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white  z-50">
      <div className="flex items-center space-x-2">
        <p className="text-gray-600">Loading...</p>
        <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-blue-500 border-opacity-25"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
