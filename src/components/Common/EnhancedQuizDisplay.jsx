// src/components/Common/EnhancedQuizDisplay.jsx
import React from 'react';
import { parseQuizContent, parseFlashcards } from '../../utils/quizParser.js';

const EnhancedQuizDisplay = ({ content, type = 'auto' }) => {
  const detectType = () => {
    if (type !== 'auto') return type;
    
    const text = content.toLowerCase();
    if (text.includes('a)') && text.includes('b)') && text.includes('c)') && text.includes('d)')) {
      return 'quiz';
    }
    if (text.includes('questions:') && text.includes('answers:')) {
      return 'flashcards';
    }
    return 'text';
  };

  const displayType = detectType();
  
  if (displayType === 'quiz') {
    const { questions, answers } = parseQuizContent(content);
    
    return (
      <div className="space-y-8">
        {/* Questions Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-indigo-700">Quiz Questions</h3>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
              {questions.length} Questions
            </span>
          </div>
          
          <div className="space-y-6">
            {questions.map((q) => (
              <div key={q.number} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <div className="flex items-start mb-3">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-100 text-indigo-800 rounded-full mr-3">
                    {q.number}
                  </span>
                  <p className="font-medium text-gray-900">{q.question}</p>
                </div>
                
                <div className="ml-11 space-y-2">
                  {q.options.map((opt) => (
                    <div key={opt.letter} className="flex items-center p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium w-6">{opt.letter})</span>
                      <span className="ml-2">{opt.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Answers Section */}
        {answers.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-green-700 mb-4">Answer Key</h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {answers.map((ans) => (
                  <div key={ans.number} className="flex items-center p-3 bg-white rounded border">
                    <span className="font-bold text-gray-900 mr-3">{ans.number}.</span>
                    <div className="flex-1">
                      <span className="font-bold text-green-700 mr-2">Answer: {ans.correct}</span>
                      {ans.explanation && (
                        <span className="text-gray-600 text-sm">- {ans.explanation}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  if (displayType === 'flashcards') {
    const { questions, answers } = parseFlashcards(content);
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Questions Column */}
        <div>
          <h3 className="text-xl font-bold text-blue-700 mb-4">Questions</h3>
          <div className="space-y-3">
            {questions.map((q) => (
              <div key={q.number} className="bg-white border border-blue-100 rounded-lg p-4 shadow-sm">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 rounded-full mr-3">
                    {q.number}
                  </span>
                  <p className="font-medium text-gray-900">{q.question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Answers Column */}
        <div>
          <h3 className="text-xl font-bold text-green-700 mb-4">Answers</h3>
          <div className="space-y-3">
            {answers.map((ans) => (
              <div key={ans.number} className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-800 rounded-full mr-3">
                    {ans.number}
                  </span>
                  <p className="font-medium text-gray-900">{ans.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  // Default text display
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm">
        {content}
      </pre>
    </div>
  );
};

export default EnhancedQuizDisplay;