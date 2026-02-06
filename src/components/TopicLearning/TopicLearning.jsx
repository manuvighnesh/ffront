// src/components/TopicLearning/TopicLearning.jsx
import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';
import { Brain, Sparkles } from 'lucide-react';
import { api } from '../../services/api';

const TopicLearning = ({ user, onBack }) => {
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState('beginner');
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState('');

  const handleLearnTopic = async () => {
    if (!topic.trim()) {
      alert('Please enter a topic to learn');
      return;
    }
    
    setLoading(true);
    setExplanation('');

    try {
      const data = await api.learnTopic(topic, level);
      setExplanation(data.explanation || data.result || 'No explanation generated');
    } catch (error) {
      console.error('Error learning topic:', error);
      setExplanation(`Error: ${error.message}\n\nTry uploading a PDF first in the PDF Learning section.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        onLogout={onBack} 
        title="Topic Learning" 
        onBack={onBack} 
        showBack={true} 
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900">Learn Any Topic</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What would you like to learn?</label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="e.g., Quantum Physics, Machine Learning, Ancient History..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="beginner">Beginner - I'm new to this</option>
                <option value="intermediate">Intermediate - I have some knowledge</option>
                <option value="advanced">Advanced - I want deep insights</option>
              </select>
            </div>

            <button
              onClick={handleLearnTopic}
              disabled={loading || !topic.trim()}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium hover:bg-purple-700 disabled:bg-gray-400 transition-colors"
            >
              {loading ? 'Learning...' : 'Start Learning'}
            </button>
          </div>
        </div>

        {explanation && (
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-purple-600" />
                <span>Your Learning Material</span>
              </h3>
              <button
                onClick={() => setExplanation('')}
                className="text-gray-500 hover:text-gray-700"
              >
                Clear
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="whitespace-pre-wrap text-gray-700 font-sans leading-relaxed text-sm">
                {explanation}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopicLearning;