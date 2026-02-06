// src/components/PDFLearning/SummaryTab.jsx
import React, { useState } from 'react';

const SummaryTab = ({ onGenerate, loading }) => {
  const [style, setStyle] = useState('concise');
  const [target, setTarget] = useState('revision');

  const handleSubmit = () => {
    onGenerate({ style, target });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Summary</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="concise">Concise</option>
              <option value="detailed">Detailed</option>
              <option value="brief">Brief</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target</label>
            <select
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="revision">Revision</option>
              <option value="exam">Exam</option>
              <option value="overview">Overview</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>
    </div>
  );
};

export default SummaryTab;