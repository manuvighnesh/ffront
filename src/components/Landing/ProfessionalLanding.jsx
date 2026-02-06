// src/components/Landing/ProfessionalLanding.jsx - FINAL VERSION
import React, { useState } from 'react';
import {
  GraduationCap,
  Sparkles,
  Brain,
  BookOpen,
  TrendingUp,
  Award,
  ArrowRight,
  Rocket,
  Target
} from 'lucide-react';

const ProfessionalLanding = ({ onGetStarted, onSignIn }) => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Intelligent algorithms adapt to your learning style and pace",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Smart Content Analysis",
      description: "Upload documents and get instant summaries, quizzes, and flashcards",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Personalized Paths",
      description: "Custom learning journeys based on your goals and interests",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Detailed analytics and achievement tracking",
      color: "from-orange-500 to-amber-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  LearnAssist Pro
                </h1>
                <p className="text-xs text-gray-500">AI Learning Platform</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-indigo-600 font-medium">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 font-medium">How it Works</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={onSignIn}
                className="text-gray-700 hover:text-indigo-700 font-medium px-4 py-2"
              >
                Sign In
              </button>
              <button
                onClick={onGetStarted}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 flex items-center space-x-2"
              >
                <span>Get Started</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Learning Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Learn Smarter,{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Not Harder
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 mt-6 mb-8 max-w-2xl">
                Transform your learning experience with AI-powered tools that create personalized study materials, 
                track your progress, and accelerate your knowledge acquisition.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={onGetStarted}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-medium hover:shadow-xl transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Begin Your Journey</span>
                  <Rocket className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: Brain, title: "Smart Quizzes", color: "bg-blue-100 text-blue-600" },
                    { icon: BookOpen, title: "PDF Analysis", color: "bg-purple-100 text-purple-600" },
                    { icon: TrendingUp, title: "Progress", color: "bg-green-100 text-green-600" },
                    { icon: Award, title: "Achievements", color: "bg-orange-100 text-orange-600" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-shadow">
                      <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-3`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Powerful Features</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Accelerate Learning
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From document analysis to personalized courses, we provide all tools for effective learning.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:scale-105 cursor-pointer ${
                    activeFeature === idx ? 'ring-2 ring-indigo-500' : ''
                  }`}
                  onClick={() => setActiveFeature(idx)}
                >
                  <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple,{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Effective Process
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started in minutes and see immediate results
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Upload & Analyze",
                description: "Upload your study materials or choose from our library",
                icon: UploadIcon
              },
              {
                step: "02",
                title: "AI Processing",
                description: "Our AI generates summaries, quizzes, and learning paths",
                icon: Brain
              },
              {
                step: "03",
                title: "Learn & Track",
                description: "Study with personalized materials and track progress",
                icon: Target
              }
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-6 top-12 w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {step.step}
                </div>
                <div className="bg-gray-50 rounded-2xl p-8 ml-12">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                    <step.icon className="w-7 h-7 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">LearnAssist Pro</h3>
                <p className="text-gray-400 text-sm">AI Learning Platform</p>
              </div>
            </div>
            <p className="text-gray-400 max-w-md mx-auto mb-8">
              Empowering learners with AI-powered education tools.
            </p>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} LearnAssist Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper component for Upload icon
const UploadIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

export default ProfessionalLanding;