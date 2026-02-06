// src/components/Common/LoadingSpinner.jsx
import React from 'react';
import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'medium' }) => {
  const sizeClasses = {
    small: 'h-8 w-8',
    medium: 'h-12 w-12',
    large: 'h-16 w-16',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <Loader2 className={`${sizeClasses[size]} text-indigo-600 animate-spin mb-4`} />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export const BackendConnectionCheck = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Checking backend connection...</p>
      </div>
    </div>
  );
};

export const BackendError = ({ onRetry }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Backend Connection Failed</h1>
        <p className="text-gray-700 mb-4">
          Cannot connect to the backend server at http://localhost:8000/api.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded mb-4">
          <p className="text-sm text-yellow-800">
            <strong>To fix this:</strong><br/>
            1. Open terminal in backend folder<br/>
            2. Run: <code className="bg-gray-100 px-2 py-1 rounded">uvicorn main:app --reload --port 8000</code><br/>
            3. Make sure MongoDB is running: <code className="bg-gray-100 px-2 py-1 rounded">mongod</code><br/>
            4. Refresh this page
          </p>
        </div>
        <button
          onClick={onRetry}
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default LoadingSpinner;