// frontend/src/components/landing/Landing.jsx
import React from 'react';
import { GraduationCap, Upload, Brain, Users, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

const Landing = ({ onGetStarted, onSignin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <h1 className="text-xl font-bold text-gray-900">Learning Assistant</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onGetStarted}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button
                onClick={onSignin}
                className="text-gray-600 hover:text-indigo-700 font-medium px-4 py-2 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-grow flex flex-col justify-center px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Personal Learning Assistant
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your personal AI-powered study companion for enhanced learning and productivity
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Card 1: Document Upload */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100 cursor-pointer"
               onClick={onGetStarted}>
            <div className="flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-xl mb-6 group-hover:bg-indigo-600 transition-colors">
              <Upload className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Document Upload</h3>
            <p className="text-gray-600 leading-relaxed">
              Upload your study materials (PDFs, notes) and get instant flashcards, quizzes, summaries, and Q&A sessions tailored to your content.
            </p>
          </div>

          {/* Card 2: AI Analysis */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100 cursor-pointer"
               onClick={onGetStarted}>
            <div className="flex items-center justify-center w-16 h-16 bg-purple-100 rounded-xl mb-6 group-hover:bg-purple-600 transition-colors">
              <Brain className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">AI - Powered Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
              Leverage advanced AI to automatically generate summaries, key insights, and practice questions from your uploaded documents instantly.
            </p>
          </div>

          {/* Card 3: Personalized Learning */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100 cursor-pointer"
               onClick={onGetStarted}>
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6 group-hover:bg-blue-600 transition-colors">
              <Users className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Personalized Learning</h3>
            <p className="text-gray-600 leading-relaxed">
              Get course recommendations and learning paths tailored specifically to your interests, goals, and current skill level.
            </p>
          </div>

          {/* Card 4: Progress Tracking */}
          <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 p-8 border border-gray-100 cursor-pointer"
               onClick={onSignin}>
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6 group-hover:bg-green-600 transition-colors">
              <BarChart3 className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Progress Tracking</h3>
            <p className="text-gray-600 leading-relaxed">
              Monitor your learning progress, track quiz scores, and maintain streaks with detailed analytics dashboards.
            </p>
          </div>
        </div>

        {/* Target Audience Section */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Who is this for?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Students */}
            <div className="bg-white rounded-xl p-6 border-t-4 border-indigo-500 shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-indigo-100 rounded-full mr-3">
                  <GraduationCap className="w-6 h-6 text-indigo-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Students</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Enhance your study materials with AI flashcards and quizzes to master subjects faster.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Auto-generated flashcards</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Smart quizzes from PDFs</span>
                </li>
              </ul>
            </div>

            {/* Faculty */}
            <div className="bg-white rounded-xl p-6 border-t-4 border-purple-500 shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-purple-100 rounded-full mr-3">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Faculty</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Create content efficiently and track student progress with AI-powered tools.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Generate course summaries</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Track student analytics</span>
                </li>
              </ul>
            </div>

            {/* Employees */}
            <div className="bg-white rounded-xl p-6 border-t-4 border-blue-500 shadow-md">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-full mr-3">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">Employees</h4>
              </div>
              <p className="text-gray-600 text-sm mb-3">
                Accelerate career development with personalized courses and skill assessments.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Personalized recommendations</span>
                </li>
                <li className="flex items-start text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Skill gap analysis</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;