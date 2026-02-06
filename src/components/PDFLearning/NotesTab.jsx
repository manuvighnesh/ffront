// src/components/PDFLearning/NotesTab.jsx
import React, { useState } from 'react';

const NotesTab = ({ onGenerate, loading }) => {
  const [topic, setTopic] = useState('');
  const [depth, setDepth] = useState('detailed');
  const [format, setFormat] = useState('exam');

  const handleSubmit = () => {
    onGenerate({ topic, depth, format });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Notes</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Topic (Optional)</label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="e.g., Chapter 5"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Depth</label>
            <select
              value={depth}
              onChange={(e) => setDepth(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="brief">Brief</option>
              <option value="detailed">Detailed</option>
              <option value="comprehensive">Comprehensive</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="exam">Exam</option>
              <option value="lecture">Lecture</option>
              <option value="outline">Outline</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Generating...' : 'Generate Notes'}
        </button>
      </div>
    </div>
  );
};

export default NotesTab;