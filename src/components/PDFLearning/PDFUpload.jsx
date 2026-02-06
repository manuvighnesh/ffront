// // src/components/PDFLearning/PDFUpload.jsx
// import React from 'react';
// import { Upload } from 'lucide-react';

// const PDFUpload = ({ onFileUpload, uploading }) => {
//   return (
//     <div className="max-w-2xl mx-auto">
//       <div className="bg-white rounded-lg shadow-md p-8 text-center">
//         <Upload className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">Upload Your PDF</h2>
//         <p className="text-gray-600 mb-6">
//           Upload a PDF document to start learning. After upload, you can generate flashcards, 
//           quizzes, notes, summaries, and ask questions.
//         </p>
//         <label className="inline-block">
//           <input
//             type="file"
//             accept=".pdf"
//             onChange={(e) => onFileUpload(e.target.files[0])}
//             className="hidden"
//             disabled={uploading}
//           />
//           <span className="cursor-pointer bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 inline-block">
//             {uploading ? 'Uploading...' : 'Choose PDF File'}
//           </span>
//         </label>
//         <p className="text-sm text-gray-500 mt-4">Only PDF files are supported</p>
//       </div>
//     </div>
//   );
// };

// export default PDFUpload;
// src/components/PDFLearning/PDFUpload.jsx
import React, { useState } from 'react';
import { Upload, CloudUpload } from 'lucide-react';

const PDFUpload = ({ onFileUpload, uploading }) => {
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileUpload(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Upload PDF</h1>
        <p className="text-gray-600">Upload a document to create interactive learning materials</p>
      </div>

      {/* Main Upload Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 mb-8 shadow-sm hover:shadow-md transition-shadow">
        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
            dragOver 
              ? 'border-indigo-500 bg-indigo-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <CloudUpload className="w-10 h-10 text-white" />
          </div>

          {/* Text Content */}
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            {uploading ? 'Processing Document...' : 'Drop your PDF here'}
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Or click the button below to select a file from your computer
          </p>

          {/* Upload Button */}
          <label className="inline-block">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
              disabled={uploading}
            />
            <div className={`flex items-center justify-center space-x-3 px-8 py-3 rounded-lg font-medium transition-all ${
              uploading 
                ? 'bg-indigo-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow hover:shadow-md cursor-pointer'
            }`}>
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span className="text-white">Uploading...</span>
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5 text-white" />
                  <span className="text-white">Select PDF File</span>
                </>
              )}
            </div>
          </label>

          {/* File Info */}
          <p className="text-sm text-gray-500 mt-6">
            Maximum file size: 50MB
          </p>
        </div>
      </div>

      {/* Simple Info Section */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-bold text-gray-900 mb-3">Supported Documents</h3>
        <ul className="text-gray-700 space-y-2">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Text-based PDFs (not scanned images)
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Lecture notes and textbooks
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            Research papers and articles
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PDFUpload;