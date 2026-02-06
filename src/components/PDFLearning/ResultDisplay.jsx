// src/components/PDFLearning/ResultDisplay.jsx
import React from 'react';
import FormattedDisplay from '../Common/FormattedDisplay.jsx';

const ResultDisplay = ({ result, onClear, type = 'default' }) => {
  const getDisplayType = () => {
    if (result.toLowerCase().includes('question') && result.toLowerCase().includes('answer')) {
      if (result.toLowerCase().includes('a)') || result.toLowerCase().includes('option')) {
        return 'quiz';
      }
      return 'flashcards';
    }
    return 'default';
  };

  const displayType = type === 'default' ? getDisplayType() : type;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-900">Result</h3>
        <button
          onClick={onClear}
          className="text-gray-500 hover:text-gray-700 px-3 py-1 rounded hover:bg-gray-100"
        >
          Clear
        </button>
      </div>
      
      <div className="mt-4">
        <FormattedDisplay content={result} type={displayType} />
      </div>
    </div>
  );
};

export default ResultDisplay;