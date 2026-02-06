// src/components/Common/FormattedDisplay.jsx
import React from 'react';

const FormattedDisplay = ({ content, type = 'quiz' }) => {
  if (!content) return null;

  // Split content into questions and answers sections
  const splitContent = (text) => {
    const lines = text.split('\n');
    let questions = [];
    let answers = [];
    let currentSection = null;
    
    lines.forEach(line => {
      const trimmed = line.trim();
      
      if (trimmed.toLowerCase().includes('questions:')) {
        currentSection = 'questions';
      } else if (trimmed.toLowerCase().includes('answers:')) {
        currentSection = 'answers';
      } else if (currentSection === 'questions' && trimmed) {
        questions.push(line);
      } else if (currentSection === 'answers' && trimmed) {
        answers.push(line);
      }
    });
    
    return { questions, answers };
  };

  const { questions, answers } = splitContent(content);

  if (type === 'quiz') {
    return (
      <div className="space-y-6">
        {/* Questions Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions:</h3>
          <div className="space-y-4">
            {questions.map((line, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded">
                <div className="whitespace-pre-wrap font-sans">{line}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Answers Section */}
        {answers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Answers:</h3>
            <div className="space-y-2">
              {answers.map((line, index) => (
                <div key={index} className="p-3 bg-green-50 border border-green-200 rounded">
                  <div className="whitespace-pre-wrap font-sans">{line}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (type === 'flashcards') {
    return (
      <div className="space-y-6">
        {/* Questions Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Questions:</h3>
          <div className="space-y-3">
            {questions.map((line, index) => (
              <div key={index} className="p-3 bg-blue-50 rounded border border-blue-100">
                <div className="whitespace-pre-wrap font-sans">{line}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Answers Section */}
        {answers.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Answers:</h3>
            <div className="space-y-3">
              {answers.map((line, index) => (
                <div key={index} className="p-3 bg-green-50 rounded border border-green-100">
                  <div className="whitespace-pre-wrap font-sans">{line}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default display for other types
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <pre className="whitespace-pre-wrap text-gray-700 font-sans text-sm">
        {content}
      </pre>
    </div>
  );
};

export default FormattedDisplay;