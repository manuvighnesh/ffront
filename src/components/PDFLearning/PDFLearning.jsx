// // src/components/PDFLearning/PDFLearning.jsx - COMPLETE FIX
// import React, { useState } from 'react';
// import Navbar from '../Layout/Navbar';
// import PDFUpload from './PDFUpload';
// import Sidebar from './Sidebar';
// import FlashcardsTab from './FlashcardsTab';
// import QuizTab from './QuizTab';
// import SummaryTab from './SummaryTab';
// import NotesTab from './NotesTab';
// import QATab from './QATab';
// import ResultDisplay from './ResultDisplay';
// import InteractiveQuiz from './InteractiveQuiz';
// import { api } from '../../services/api';

// const PDFLearning = ({ user, onBack }) => {
//   const [currentDocument, setCurrentDocument] = useState(null);
//   const [uploading, setUploading] = useState(false);
//   const [activeTab, setActiveTab] = useState('upload');
//   const [loading, setLoading] = useState(false);
//   const [result, setResult] = useState('');
//   const [showInteractiveQuiz, setShowInteractiveQuiz] = useState(false);
//   const [currentQuizData, setCurrentQuizData] = useState(null);

//   const handleFileUpload = async (file) => {
//     if (!file) return;

//     setUploading(true);
//     try {
//       const data = await api.uploadPDF(file);
      
//       if (data.document_id) {
//         setCurrentDocument({
//           id: data.document_id,
//           filename: file.name,
//           pages: data.pages
//         });
//         setActiveTab('flashcards');
//         alert('PDF uploaded successfully! You can now generate learning materials.');
//       } else {
//         throw new Error(data.error || 'Upload failed');
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       alert(`Error uploading PDF: ${error.message}`);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleGenerateQuiz = async (params) => {
//     console.log('🚀 Generating quiz with:', params);
//     setLoading(true);
//     setResult('');
//     setShowInteractiveQuiz(false);
//     setCurrentQuizData(null);
    
//     try {
//       // Generate quiz using API
//       const data = await api.generateInteractiveQuiz(
//         user.id,
//         currentDocument.id,
//         params.topic || '',
//         params.count || 5,
//         params.difficulty || 'medium'
//       );
      
//       console.log('📦 Quiz data received:', data);
      
//       // Check if we have valid quiz data
//       if (data && (data.questions || data.quiz_data)) {
//         setCurrentQuizData(data);
//         setShowInteractiveQuiz(true);
//         console.log('✅ Quiz ready to display');
//       } else {
//         console.error('❌ Invalid quiz data:', data);
//         setResult('Error: Invalid quiz data received');
//       }
//     } catch (error) {
//       console.error('❌ Error generating quiz:', error);
//       setResult(`Error: ${error.message}`);
      
//       // Create fallback quiz
//       const fallbackQuiz = {
//         title: "Sample Quiz",
//         difficulty: "medium",
//         questions: [
//           {
//             id: 1,
//             question: "Sample question 1?",
//             options: [
//               { id: "A", text: "Option A" },
//               { id: "B", text: "Option B" },
//               { id: "C", text: "Option C" },
//               { id: "D", text: "Option D" }
//             ],
//             correct_answer: "A",
//             explanation: "Sample explanation"
//           },
//           {
//             id: 2,
//             question: "Sample question 2?",
//             options: [
//               { id: "A", text: "Option A" },
//               { id: "B", text: "Option B" },
//               { id: "C", text: "Option C" },
//               { id: "D", text: "Option D" }
//             ],
//             correct_answer: "B",
//             explanation: "Sample explanation"
//           }
//         ]
//       };
      
//       setCurrentQuizData(fallbackQuiz);
//       setShowInteractiveQuiz(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Other handler functions remain the same...
//   const handleGenerateFlashcards = async (params) => {
//     setLoading(true);
//     setResult('');
//     try {
//       const data = await api.generateFlashcards(
//         currentDocument.id,
//         params.topic,
//         params.count,
//         params.difficulty
//       );
//       setResult(data.flashcards || data.result || 'No flashcards generated');
//     } catch (error) {
//       console.error('Error generating flashcards:', error);
//       setResult(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateSummary = async (params) => {
//     setLoading(true);
//     setResult('');
//     try {
//       const data = await api.generateSummary(
//         currentDocument.id,
//         params.style,
//         params.target
//       );
//       setResult(data.summary || data.result || 'No summary generated');
//     } catch (error) {
//       console.error('Error generating summary:', error);
//       setResult(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGenerateNotes = async (params) => {
//     setLoading(true);
//     setResult('');
//     try {
//       const data = await api.generateNotes(
//         currentDocument.id,
//         params.depth,
//         params.format,
//         params.topic
//       );
//       setResult(data.notes || data.result || 'No notes generated');
//     } catch (error) {
//       console.error('Error generating notes:', error);
//       setResult(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAskQuestion = async (question) => {
//     setLoading(true);
//     setResult('');
//     try {
//       const data = await api.askQuestion(currentDocument.id, question);
//       setResult(data.answer || data.result || 'No answer generated');
//     } catch (error) {
//       console.error('Error getting answer:', error);
//       setResult(`Error: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleQuizComplete = (quizResult) => {
//     console.log('🏁 Quiz completed:', quizResult);
//     alert(`Quiz completed! Score: ${quizResult.score}/${quizResult.max_score} (${quizResult.percentage}%)`);
    
//     // Optionally reset or show results
//     setShowInteractiveQuiz(false);
//     setCurrentQuizData(null);
//   };

//   const handleBackToQuizTab = () => {
//     setShowInteractiveQuiz(false);
//     setCurrentQuizData(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar 
//         user={user} 
//         onLogout={onBack} 
//         title="PDF Learning" 
//         onBack={onBack} 
//         showBack={true} 
//       />

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {!currentDocument ? (
//           <PDFUpload onFileUpload={handleFileUpload} uploading={uploading} />
//         ) : (
//           <div className="grid lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-1">
//               <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
//             </div>

//             <div className="lg:col-span-2 space-y-6">
//               <div className="bg-white rounded-lg shadow-md p-6">
//                 {activeTab === 'flashcards' && (
//                   <FlashcardsTab 
//                     onGenerate={handleGenerateFlashcards} 
//                     loading={loading} 
//                   />
//                 )}
                
//                 {activeTab === 'quiz' && (
//                   <>
//                     {showInteractiveQuiz && currentQuizData ? (
//                       <div>
//                         <button
//                           onClick={handleBackToQuizTab}
//                           className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center"
//                         >
//                           ← Back to Quiz Settings
//                         </button>
//                         <InteractiveQuiz
//                           userId={user.id}
//                           documentId={currentDocument.id}
//                           quizData={currentQuizData}
//                           onComplete={handleQuizComplete}
//                         />
//                       </div>
//                     ) : (
//                       <QuizTab 
//                         userId={user.id}
//                         onGenerate={handleGenerateQuiz} 
//                         loading={loading} 
//                       />
//                     )}
//                   </>
//                 )}
                
//                 {activeTab === 'summary' && (
//                   <SummaryTab 
//                     onGenerate={handleGenerateSummary} 
//                     loading={loading} 
//                   />
//                 )}
                
//                 {activeTab === 'notes' && (
//                   <NotesTab 
//                     onGenerate={handleGenerateNotes} 
//                     loading={loading} 
//                   />
//                 )}
                
//                 {activeTab === 'qa' && (
//                   <QATab 
//                     onAsk={handleAskQuestion} 
//                     loading={loading} 
//                   />
//                 )}
//               </div>

//               {result && !showInteractiveQuiz && (
//                 <ResultDisplay 
//                   result={result} 
//                   onClear={() => setResult('')} 
//                 />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PDFLearning;
// src/components/PDFLearning/PDFLearning.jsx
import React, { useState } from 'react';
import Navbar from '../Layout/Navbar';
import PDFUpload from './PDFUpload';
import Sidebar from './Sidebar';
import FlashcardsTab from './FlashcardsTab';
import QuizTab from './QuizTab';
import SummaryTab from './SummaryTab';
import NotesTab from './NotesTab';
import QATab from './QATab';
import ResultDisplay from './ResultDisplay';
import InteractiveQuiz from './InteractiveQuiz';
import { api } from '../../services/api';

const PDFLearning = ({ user, onBack }) => {
  const [currentDocument, setCurrentDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [showInteractiveQuiz, setShowInteractiveQuiz] = useState(false);
  const [currentQuizData, setCurrentQuizData] = useState(null);
  // States for flashcards
  const [flashcardsData, setFlashcardsData] = useState(null);
  const [bookmarkedCards, setBookmarkedCards] = useState([]); // Track bookmarked cards

  const handleFileUpload = async (file) => {
    if (!file) return;

    setUploading(true);
    try {
      const data = await api.uploadPDF(file);
      
      if (data.document_id) {
        setCurrentDocument({
          id: data.document_id,
          filename: file.name,
          pages: data.pages
        });
        setActiveTab('flashcards');
        alert('PDF uploaded successfully! You can now generate learning materials.');
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(`Error uploading PDF: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const handleGenerateQuiz = async (params) => {
    console.log('🚀 Generating quiz with:', params);
    setLoading(true);
    setResult('');
    setShowInteractiveQuiz(false);
    setCurrentQuizData(null);
    
    try {
      const data = await api.generateInteractiveQuiz(
        user.id,
        currentDocument.id,
        params.topic || '',
        params.count || 5,
        params.difficulty || 'medium'
      );
      
      console.log('📦 Quiz data received:', data);
      
      if (data && (data.questions || data.quiz_data)) {
        setCurrentQuizData(data);
        setShowInteractiveQuiz(true);
        console.log('✅ Quiz ready to display');
      } else {
        console.error('❌ Invalid quiz data:', data);
        setResult('Error: Invalid quiz data received');
      }
    } catch (error) {
      console.error('❌ Error generating quiz:', error);
      setResult(`Error: ${error.message}`);
      
      const fallbackQuiz = {
        title: "Sample Quiz",
        difficulty: "medium",
        questions: [
          {
            id: 1,
            question: "Sample question 1?",
            options: [
              { id: "A", text: "Option A" },
              { id: "B", text: "Option B" },
              { id: "C", text: "Option C" },
              { id: "D", text: "Option D" }
            ],
            correct_answer: "A",
            explanation: "Sample explanation"
          },
          {
            id: 2,
            question: "Sample question 2?",
            options: [
              { id: "A", text: "Option A" },
              { id: "B", text: "Option B" },
              { id: "C", text: "Option C" },
              { id: "D", text: "Option D" }
            ],
            correct_answer: "B",
            explanation: "Sample explanation"
          }
        ]
      };
      
      setCurrentQuizData(fallbackQuiz);
      setShowInteractiveQuiz(true);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateFlashcards = async (params) => {
    setLoading(true);
    setResult('');
    setFlashcardsData(null);
    
    try {
      console.log('🚀 Generating flashcards with params:', params);
      console.log('📄 Document ID:', currentDocument?.id);
      
      const data = await api.generateFlashcards(
        currentDocument.id,
        params.topic || '',
        params.count || 10,
        params.difficulty || 'medium'
      );
      
      console.log('📦 Flashcards API response:', data);
      
      if (data.result || data.flashcards) {
        const rawText = typeof data === 'string' ? data : 
                       data.result ? data.result :
                       data.flashcards ? data.flashcards :
                       JSON.stringify(data);
        
        // Parse the raw response into flashcards format
        const parsedFlashcards = parseFlashcardResponse(rawText, params.count, params.difficulty, params.topic);
        setFlashcardsData(parsedFlashcards);
        
        console.log('✅ Parsed flashcards:', parsedFlashcards);
      } else {
        console.error('❌ No flashcards data in response:', data);
        setResult('Error: No flashcards data received');
      }
      
    } catch (error) {
      console.error('❌ Error generating flashcards:', error);
      setResult(`Error: ${error.message}`);
      
      // Sample flashcards for demo
      const sampleFlashcards = [
        { id: 1, question: 'What makes Java platform independent?', answer: 'The ability to run on any platform with JVM.', explanation: 'Java code is compiled to bytecode that runs on JVM.', category: 'Programming', difficulty: 'medium' },
        { id: 2, question: 'What is the entry point of a Java program?', answer: 'The main method.', explanation: 'public static void main(String[] args)', category: 'Programming', difficulty: 'easy' },
        { id: 3, question: 'Name any two features of Java.', answer: 'Object-oriented and platform independent.', explanation: 'Java supports OOP concepts and runs on any platform.', category: 'Programming', difficulty: 'easy' }
      ];
      
      setFlashcardsData(sampleFlashcards);
    } finally {
      setLoading(false);
    }
  };

  const parseFlashcardResponse = (rawText, count, difficulty, topic) => {
    try {
      const flashcards = [];
      const lines = rawText.split('\n');
      let questions = [];
      let answers = [];
      let isQuestionsSection = false;
      let isAnswersSection = false;

      lines.forEach(line => {
        line = line.trim();
        
        if (line.includes('QUESTIONS:')) {
          isQuestionsSection = true;
          isAnswersSection = false;
        } else if (line.includes('ANSWERS:')) {
          isQuestionsSection = false;
          isAnswersSection = true;
        } else if (line && !line.includes('INFO:') && !line.includes('OpenAI Success')) {
          const match = line.match(/^\d+\.\s*(.+)$/);
          if (match) {
            const content = match[1].trim();
            if (isQuestionsSection) {
              questions.push(content);
            } else if (isAnswersSection) {
              answers.push(content);
            }
          }
        }
      });

      const cardCount = Math.min(questions.length, count || 10);
      for (let i = 0; i < cardCount; i++) {
        flashcards.push({
          id: i + 1,
          question: questions[i] || `Question ${i + 1}`,
          answer: answers[i] || `Answer ${i + 1}`,
          explanation: `This is question ${i + 1} about ${topic || 'the topic'}.`,
          category: topic || 'Generated Content',
          difficulty: difficulty || 'medium'
        });
      }

      return flashcards;
    } catch (error) {
      console.error('Error parsing flashcards:', error);
      return [];
    }
  };

  const handleGenerateSummary = async (params) => {
    setLoading(true);
    setResult('');
    try {
      const data = await api.generateSummary(
        currentDocument.id,
        params.style,
        params.target
      );
      setResult(data.summary || data.result || 'No summary generated');
    } catch (error) {
      console.error('Error generating summary:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateNotes = async (params) => {
    setLoading(true);
    setResult('');
    try {
      const data = await api.generateNotes(
        currentDocument.id,
        params.depth,
        params.format,
        params.topic
      );
      setResult(data.notes || data.result || 'No notes generated');
    } catch (error) {
      console.error('Error generating notes:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAskQuestion = async (question) => {
    setLoading(true);
    setResult('');
    try {
      const data = await api.askQuestion(currentDocument.id, question);
      setResult(data.answer || data.result || 'No answer generated');
    } catch (error) {
      console.error('Error getting answer:', error);
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleQuizComplete = (quizResult) => {
    console.log('🏁 Quiz completed:', quizResult);
    alert(`Quiz completed! Score: ${quizResult.score}/${quizResult.max_score} (${quizResult.percentage}%)`);
    
    setShowInteractiveQuiz(false);
    setCurrentQuizData(null);
  };

  const handleBackToQuizTab = () => {
    setShowInteractiveQuiz(false);
    setCurrentQuizData(null);
  };

  // Function to handle bookmark updates from FlashcardsTab
  const handleBookmarkUpdate = (updatedBookmarks) => {
    setBookmarkedCards(updatedBookmarks);
  };

  // Function to clear flashcards
  const handleClearFlashcards = () => {
    setFlashcardsData(null);
    setBookmarkedCards([]);
    setResult('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        user={user} 
        onLogout={onBack} 
        title="PDF Learning" 
        onBack={onBack} 
        showBack={true} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentDocument ? (
          <PDFUpload onFileUpload={handleFileUpload} uploading={uploading} />
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                {activeTab === 'flashcards' && (
                  <FlashcardsTab 
                    onGenerate={handleGenerateFlashcards} 
                    loading={loading}
                    flashcardsData={flashcardsData}
                    onClearResults={handleClearFlashcards}
                    bookmarkedCards={bookmarkedCards}
                    onBookmarkUpdate={handleBookmarkUpdate}
                  />
                )}
                
                {activeTab === 'quiz' && (
                  <>
                    {showInteractiveQuiz && currentQuizData ? (
                      <div>
                        <button
                          onClick={handleBackToQuizTab}
                          className="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center"
                        >
                          ← Back to Quiz Settings
                        </button>
                        <InteractiveQuiz
                          userId={user.id}
                          documentId={currentDocument.id}
                          quizData={currentQuizData}
                          onComplete={handleQuizComplete}
                        />
                      </div>
                    ) : (
                      <QuizTab 
                        userId={user.id}
                        onGenerate={handleGenerateQuiz} 
                        loading={loading} 
                      />
                    )}
                  </>
                )}
                
                {activeTab === 'summary' && (
                  <SummaryTab 
                    onGenerate={handleGenerateSummary} 
                    loading={loading} 
                  />
                )}
                
                {activeTab === 'notes' && (
                  <NotesTab 
                    onGenerate={handleGenerateNotes} 
                    loading={loading} 
                  />
                )}
                
                {activeTab === 'qa' && (
                  <QATab 
                    onAsk={handleAskQuestion} 
                    loading={loading} 
                  />
                )}
              </div>

              {/* Show result for other tabs (not flashcards) */}
              {result && activeTab !== 'flashcards' && (
                <ResultDisplay 
                  result={result} 
                  onClear={() => setResult('')} 
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFLearning;