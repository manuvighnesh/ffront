// src/components/PDFLearning/QATab.jsx
import React, { useState } from 'react';

const QATab = ({ onAsk, loading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    onAsk(question);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask a Question</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            rows="4"
            placeholder="Ask anything about the document..."
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading || !question.trim()}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
        >
          {loading ? 'Getting Answer...' : 'Get Answer'}
        </button>
      </div>
    </div>
  );
};

export default QATab;