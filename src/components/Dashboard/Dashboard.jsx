// src/components/Dashboard/Dashboard.jsx
import React from 'react';
import { Upload, Brain } from 'lucide-react';
import Navbar from '../Layout/Navbar.jsx';

const Dashboard = ({ user, onLogout, onSelectMode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
          <p className="text-xl text-gray-600">Select how you'd like to learn today</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* PDF Learning Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-left border-2 border-transparent hover:border-indigo-500 cursor-pointer"
               onClick={() => onSelectMode('pdf')}>
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-xl mb-6 group-hover:bg-indigo-600 transition-colors">
              <Upload className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Learn by PDF</h3>
            <p className="text-gray-600 mb-4">Upload your study materials and get instant flashcards, quizzes, notes, and Q&A sessions</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span>Generate Flashcards</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span>Create Quiz Questions</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span>Smart Study Notes</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                <span>Interactive Q&A</span>
              </li>
            </ul>
          </div>

          {/* Topic Learning Card */}
          <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-8 text-left border-2 border-transparent hover:border-purple-500 cursor-pointer"
               onClick={() => onSelectMode('topic')}>
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-6 group-hover:bg-purple-600 transition-colors">
              <Brain className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Learn by Topic</h3>
            <p className="text-gray-600 mb-4">Explore any topic with AI-guided learning tailored to your level and goals</p>
            <ul className="space-y-2 text-sm text-gray-500">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                <span>Topic Explanations</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                <span>Adaptive Difficulty</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                <span>Custom Learning Path</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full"></span>
                <span>Step-by-Step Guidance</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;