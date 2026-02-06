// src/components/PDFLearning/Sidebar.jsx
import React from 'react';
import { Sparkles, ClipboardList, FileText, BookOpen, HelpCircle } from 'lucide-react';

const tabs = [
  { id: 'flashcards', label: 'Flashcards', icon: Sparkles },
  { id: 'quiz', label: 'Quiz', icon: ClipboardList },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'notes', label: 'Notes', icon: BookOpen },
  { id: 'qa', label: 'Q&A', icon: HelpCircle }
];

const Sidebar = ({ activeTab, onTabChange }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
      <h3 className="font-semibold text-gray-900 mb-4">Learning Tools</h3>
      <nav className="space-y-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-indigo-50 text-indigo-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;