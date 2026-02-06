// // src/components/PDFLearning/InteractiveQuiz.jsx - COMPLETE WORKING VERSION
// import React, { useState, useEffect } from 'react';
// import { Clock, Award } from 'lucide-react';
// import { api } from '../../services/api';

// const InteractiveQuiz = ({ userId, documentId, quizData, onComplete }) => {
//   console.log("🎮 InteractiveQuiz mounted with data:", quizData);
  
//   const [currentQuizData, setCurrentQuizData] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [timeElapsed, setTimeElapsed] = useState(0);
//   const [quizStarted, setQuizStarted] = useState(false);
//   const [quizCompleted, setQuizCompleted] = useState(false);
//   const [quizResult, setQuizResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   // Initialize quiz
//   useEffect(() => {
//     const initQuiz = () => {
//       console.log("🔧 Initializing quiz...");
      
//       let parsedData = null;
      
//       // Handle different data formats
//       if (typeof quizData === 'string') {
//         try {
//           parsedData = JSON.parse(quizData);
//         } catch (err) {
//           console.error("❌ Failed to parse quiz data string:", err);
//           parsedData = null;
//         }
//       } else if (quizData && typeof quizData === 'object') {
//         parsedData = quizData;
//       }
      
//       console.log("📊 Parsed quiz data:", parsedData);
      
//       if (!parsedData) {
//         setError("No quiz data provided");
//         createSampleQuiz();
//         return;
//       }
      
//       // Extract questions from different possible structures
//       let questions = [];
      
//       if (parsedData.questions && Array.isArray(parsedData.questions)) {
//         questions = parsedData.questions;
//       } else if (parsedData.quiz_data && parsedData.quiz_data.questions) {
//         questions = parsedData.quiz_data.questions;
//       } else if (parsedData.quiz && parsedData.quiz.questions) {
//         questions = parsedData.quiz.questions;
//       }
      
//       console.log("❓ Questions extracted:", questions.length);
      
//       if (questions.length === 0) {
//         console.warn("⚠️ No questions found, creating sample questions");
//         createSampleQuiz();
//         return;
//       }
      
//       // Initialize quiz
//       setCurrentQuizData({
//         title: parsedData.title || "Quiz",
//         difficulty: parsedData.difficulty || "medium",
//         questions: questions
//       });
      
//       // Initialize answers
//       const initialAnswers = {};
//       questions.forEach((_, index) => {
//         initialAnswers[index] = null;
//       });
//       setUserAnswers(initialAnswers);
      
//       setQuizStarted(true);
//       setTimeElapsed(0);
//       setError(null);
      
//       console.log("✅ Quiz initialized successfully");
//     };
    
//     initQuiz();
//   }, [quizData]);

//   // Create sample quiz if no data
//   const createSampleQuiz = () => {
//     console.log("🔄 Creating sample quiz");
//     const sampleQuiz = {
//       title: "Sample Quiz",
//       difficulty: "medium",
//       questions: [
//         {
//           id: 1,
//           question: "What is the main topic of the document?",
//           options: [
//             { id: "A", text: "Main concepts and applications" },
//             { id: "B", text: "Historical background" },
//             { id: "C", text: "Technical specifications" },
//             { id: "D", text: "Personal opinions" }
//           ],
//           correct_answer: "A",
//           explanation: "Documents typically focus on main concepts."
//         },
//         {
//           id: 2,
//           question: "Which method is commonly discussed?",
//           options: [
//             { id: "A", text: "Systematic approach" },
//             { id: "B", text: "Random trials" },
//             { id: "C", text: "Theoretical analysis" },
//             { id: "D", text: "Case studies" }
//           ],
//           correct_answer: "A",
//           explanation: "Systematic approaches are commonly discussed."
//         },
//         {
//           id: 3,
//           question: "What are the key benefits mentioned?",
//           options: [
//             { id: "A", text: "Practical applications" },
//             { id: "B", text: "Memorization" },
//             { id: "C", text: "Theoretical knowledge" },
//             { id: "D", text: "Entertainment" }
//           ],
//           correct_answer: "A",
//           explanation: "Practical applications are key benefits."
//         }
//       ]
//     };
    
//     setCurrentQuizData(sampleQuiz);
    
//     const initialAnswers = {};
//     sampleQuiz.questions.forEach((_, index) => {
//       initialAnswers[index] = null;
//     });
//     setUserAnswers(initialAnswers);
    
//     setQuizStarted(true);
//     setTimeElapsed(0);
//   };

//   // Timer
//   useEffect(() => {
//     let timer;
//     if (quizStarted && !quizCompleted) {
//       timer = setInterval(() => {
//         setTimeElapsed(prev => prev + 1);
//       }, 1000);
//     }
//     return () => clearInterval(timer);
//   }, [quizStarted, quizCompleted]);

//   const handleAnswerSelect = (questionIndex, answerId) => {
//     setUserAnswers(prev => ({
//       ...prev,
//       [questionIndex]: answerId
//     }));
//   };

//   const nextQuestion = () => {
//     if (currentQuestion < (currentQuizData?.questions?.length || 0) - 1) {
//       setCurrentQuestion(prev => prev + 1);
//     }
//   };

//   const prevQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(prev => prev - 1);
//     }
//   };

//   const submitQuiz = async () => {
//     if (!currentQuizData) return;
    
//     const unanswered = Object.values(userAnswers).some(answer => answer === null);
//     if (unanswered) {
//       if (!window.confirm('You have unanswered questions. Submit anyway?')) {
//         return;
//       }
//     }
    
//     setLoading(true);
//     try {
//       // Calculate score
//       let score = 0;
//       const questions = currentQuizData.questions || [];
      
//       questions.forEach((q, index) => {
//         const userAnswer = userAnswers[index];
//         if (userAnswer && userAnswer.toUpperCase() === q.correct_answer.toUpperCase()) {
//           score += 1;
//         }
//       });
      
//       const maxScore = questions.length;
//       const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
      
//       // Get incorrect questions
//       const incorrectQuestions = questions
//         .map((q, index) => ({
//           question: q.question,
//           user_answer: userAnswers[index],
//           correct_answer: q.correct_answer,
//           explanation: q.explanation
//         }))
//         .filter((_, index) => {
//           const userAnswer = userAnswers[index];
//           const correctAnswer = questions[index].correct_answer;
//           return userAnswer === null || userAnswer.toUpperCase() !== correctAnswer.toUpperCase();
//         });
      
//       const result = {
//         score,
//         max_score: maxScore,
//         percentage,
//         points_earned: Math.floor(percentage / 10),
//         feedback: getFeedback(percentage),
//         incorrect_questions: incorrectQuestions
//       };
      
//       console.log("📊 Quiz result:", result);
      
//       setQuizResult(result);
//       setQuizCompleted(true);
      
//       // Try to save to backend
//       try {
//         await api.submitQuiz(
//           userId,
//           quizData?._id || quizData?.quiz_id || 'offline_quiz',
//           userAnswers,
//           timeElapsed
//         );
//         console.log("✅ Score saved to backend");
//       } catch (saveError) {
//         console.warn("⚠️ Could not save score to backend:", saveError);
//       }
      
//       if (onComplete) {
//         onComplete(result);
//       }
      
//     } catch (error) {
//       console.error('❌ Error calculating score:', error);
//       alert('Error calculating score. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFeedback = (percentage) => {
//     if (percentage >= 90) return "Excellent! 🎉 You've mastered this!";
//     if (percentage >= 70) return "Good job! 👍 Solid understanding.";
//     if (percentage >= 50) return "Not bad! 📚 Keep practicing.";
//     return "Keep studying! 💪 Review the material.";
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   // ===== RENDER LOGIC =====

//   if (error) {
//     return (
//       <div className="p-6">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//           <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
//           <p className="text-red-600">{error}</p>
//           <button
//             onClick={createSampleQuiz}
//             className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//           >
//             Load Sample Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!quizStarted) {
//     return (
//       <div className="text-center p-8">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
//         <p className="text-gray-600">Setting up your quiz...</p>
//         <p className="text-sm text-gray-500 mt-2">This should only take a moment</p>
//       </div>
//     );
//   }

//   if (!currentQuizData || !currentQuizData.questions) {
//     return (
//       <div className="text-center p-8">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
//           <h3 className="text-lg font-semibold text-yellow-700 mb-2">No Quiz Data</h3>
//           <p className="text-yellow-600">Unable to load quiz questions.</p>
//           <button
//             onClick={createSampleQuiz}
//             className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
//           >
//             Load Sample Quiz
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (quizCompleted && quizResult) {
//     return (
//       <div className="p-6">
//         <div className="text-center mb-8">
//           <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
//           <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
//           <p className="text-gray-600">Here are your results</p>
//         </div>
        
//         <div className="grid grid-cols-2 gap-4 mb-8">
//           <div className="bg-blue-50 p-4 rounded-lg">
//             <div className="text-4xl font-bold text-blue-700">{quizResult.score}/{quizResult.max_score}</div>
//             <div className="text-blue-600">Score</div>
//           </div>
//           <div className="bg-green-50 p-4 rounded-lg">
//             <div className="text-4xl font-bold text-green-700">{quizResult.percentage}%</div>
//             <div className="text-green-600">Percentage</div>
//           </div>
//           <div className="bg-purple-50 p-4 rounded-lg">
//             <div className="text-4xl font-bold text-purple-700">{formatTime(timeElapsed)}</div>
//             <div className="text-purple-600">Time Taken</div>
//           </div>
//           <div className="bg-yellow-50 p-4 rounded-lg">
//             <div className="text-4xl font-bold text-yellow-700">{quizResult.points_earned}</div>
//             <div className="text-yellow-600">Points Earned</div>
//           </div>
//         </div>
        
//         <div className="bg-gray-50 p-4 rounded-lg mb-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-2">Feedback</h3>
//           <p className="text-gray-700">{quizResult.feedback}</p>
//         </div>
        
//         {quizResult.incorrect_questions.length > 0 && (
//           <div className="bg-red-50 p-4 rounded-lg mb-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Questions to Review</h3>
//             <div className="space-y-3">
//               {quizResult.incorrect_questions.map((q, idx) => (
//                 <div key={idx} className="bg-white p-3 rounded border">
//                   <p className="font-medium text-gray-900">{q.question}</p>
//                   <p className="text-sm text-red-600 mt-1">Your answer: {q.user_answer || "No answer"}</p>
//                   <p className="text-sm text-green-600">Correct answer: {q.correct_answer}</p>
//                   {q.explanation && (
//                     <p className="text-sm text-gray-600 mt-1">💡 {q.explanation}</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
        
//         <button
//           onClick={() => window.location.reload()}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
//         >
//           Take Another Quiz
//         </button>
//       </div>
//     );
//   }
//   const currentQ = currentQuizData.questions[currentQuestion];
//   const totalQuestions = currentQuizData.questions.length;
//   const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  
//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       {/* Quiz Header */}
//       <div className="mb-8">
//         <div className="flex justify-between items-center mb-4">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">{currentQuizData.title}</h2>
//             <div className="flex items-center gap-2 mt-1">
//               <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                 currentQuizData.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
//                 currentQuizData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
//                 'bg-red-100 text-red-800'
//               }`}>
//                 {currentQuizData.difficulty.charAt(0).toUpperCase() + currentQuizData.difficulty.slice(1)}
//               </span>
//               <div className="flex items-center text-gray-600">
//                 <Clock className="w-4 h-4 mr-1" />
//                 <span className="text-sm">{formatTime(timeElapsed)}</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="text-right">
//             <div className="text-lg font-semibold text-gray-900">
//               Question {currentQuestion + 1} of {totalQuestions}
//             </div>
//             <div className="text-sm text-gray-500">
//               {Object.values(userAnswers).filter(a => a !== null).length} of {totalQuestions} answered
//             </div>
//           </div>
//         </div>
        
//         {/* Progress Bar */}
//         <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
//           <div 
//             className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
//             style={{ width: `${progressPercentage}%` }}
//           ></div>
//         </div>
//         <div className="flex justify-between text-sm text-gray-600">
//           <span>{Math.round(progressPercentage)}% Complete</span>
//           <span>{totalQuestions - (currentQuestion + 1)} questions remaining</span>
//         </div>
//       </div>
      
//       {/* Current Question */}
//       <div className="mb-8">
//         <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm mb-6">
//           <h3 className="text-xl font-semibold text-gray-900 mb-6">
//             {currentQ.question}
//           </h3>
          
//           <div className="space-y-3">
//             {currentQ.options && currentQ.options.map((option) => (
//               <button
//                 key={option.id}
//                 onClick={() => handleAnswerSelect(currentQuestion, option.id)}
//                 className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
//                   userAnswers[currentQuestion] === option.id
//                     ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
//                     : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
//                 }`}
//               >
//                 <div className="flex items-center">
//                   <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 ${
//                     userAnswers[currentQuestion] === option.id
//                       ? 'bg-indigo-600 text-white'
//                       : 'bg-gray-100 text-gray-700'
//                   }`}>
//                     {option.id}
//                   </div>
//                   <span className="font-medium">{option.text}</span>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>
        
//         {/* Question Navigation */}
//         <div className="flex justify-between items-center">
//           <div>
//             {currentQuestion > 0 && (
//               <button
//                 onClick={prevQuestion}
//                 className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 ← Previous
//               </button>
//             )}
//           </div>
          
//           <div className="flex items-center gap-3">
//             {userAnswers[currentQuestion] !== null && (
//               <span className="text-green-600 text-sm font-medium flex items-center">
//                 <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                 </svg>
//                 Answer selected
//               </span>
//             )}
//           </div>
          
//           <div>
//             {currentQuestion < totalQuestions - 1 ? (
//               <button
//                 onClick={nextQuestion}
//                 disabled={!userAnswers[currentQuestion]}
//                 className={`px-6 py-3 rounded-lg font-medium transition-colors ${
//                   userAnswers[currentQuestion]
//                     ? 'bg-indigo-600 text-white hover:bg-indigo-700'
//                     : 'bg-gray-200 text-gray-400 cursor-not-allowed'
//                 }`}
//               >
//                 Next Question →
//               </button>
//             ) : (
//               <button
//                 onClick={submitQuiz}
//                 disabled={loading}
//                 className={`px-8 py-3 rounded-lg font-medium transition-colors ${
//                   loading
//                     ? 'bg-gray-400 text-white cursor-not-allowed'
//                     : 'bg-green-600 text-white hover:bg-green-700'
//                 }`}
//               >
//                 {loading ? (
//                   <span className="flex items-center">
//                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                     </svg>
//                     Submitting...
//                   </span>
//                 ) : (
//                   'Submit Quiz'
//                 )}
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
      
//       {/* Question List Navigation */}
//       <div className="mt-10">
//         <h4 className="text-lg font-semibold text-gray-900 mb-4">Question Navigation</h4>
//         <div className="grid grid-cols-5 gap-3">
//           {currentQuizData.questions.map((question, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentQuestion(index)}
//               className={`p-3 rounded-lg border text-center transition-colors ${
//                 currentQuestion === index
//                   ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
//                   : userAnswers[index] !== null
//                   ? 'border-green-200 bg-green-50 text-green-800'
//                   : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <div className="font-medium">Q{index + 1}</div>
//               <div className="text-xs mt-1">
//                 {userAnswers[index] !== null ? (
//                   <span className="text-green-600">✓ Answered</span>
//                 ) : (
//                   <span className="text-gray-500">Not answered</span>
//                 )}
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>
      
//       {/* Quiz Instructions */}
//       <div className="mt-8 pt-6 border-t border-gray-200">
//         <div className="flex items-start text-sm text-gray-600">
//           <svg className="w-5 h-5 mr-2 text-indigo-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
//           </svg>
//           <div>
//             <p className="font-medium text-gray-900 mb-1">Quiz Instructions</p>
//             <ul className="list-disc list-inside space-y-1">
//               <li>Select an answer for each question before proceeding</li>
//               <li>You can navigate between questions using Previous/Next buttons</li>
//               <li>Click on any question number to jump directly to that question</li>
//               <li>Submit only when you're ready - you can review answers before submitting</li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InteractiveQuiz;

// Updated InteractiveQuiz.jsx - Fixed score submission and user points update
import React, { useState, useEffect } from 'react';
import { Clock, Award, CheckCircle, XCircle } from 'lucide-react';
import { api } from '../../services/api';

const InteractiveQuiz = ({ userId, documentId, quizData, onComplete }) => {
  console.log("🎯 InteractiveQuiz mounted with data:", quizData);
  
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizResult, setQuizResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize quiz
  useEffect(() => {
    const initQuiz = () => {
      console.log("🔧 Initializing quiz...");
      
      let parsedData = null;
      
      if (typeof quizData === 'string') {
        try {
          parsedData = JSON.parse(quizData);
        } catch (err) {
          console.error("❌ Failed to parse quiz data string:", err);
          parsedData = null;
        }
      } else if (quizData && typeof quizData === 'object') {
        parsedData = quizData;
      }
      
      console.log("📋 Parsed quiz data:", parsedData);
      
      if (!parsedData) {
        setError("No quiz data provided");
        createSampleQuiz();
        return;
      }
      
      let questions = [];
      
      if (parsedData.questions && Array.isArray(parsedData.questions)) {
        questions = parsedData.questions;
      } else if (parsedData.quiz_data && parsedData.quiz_data.questions) {
        questions = parsedData.quiz_data.questions;
      } else if (parsedData.quiz && parsedData.quiz.questions) {
        questions = parsedData.quiz.questions;
      }
      
      console.log("✅ Questions extracted:", questions.length);
      
      if (questions.length === 0) {
        console.warn("⚠️ No questions found, creating sample questions");
        createSampleQuiz();
        return;
      }
      
      setCurrentQuizData({
        title: parsedData.title || "Quiz",
        difficulty: parsedData.difficulty || "medium",
        questions: questions,
        quiz_id: parsedData.quiz_id || parsedData._id || `quiz_${Date.now()}`
      });
      
      const initialAnswers = {};
      questions.forEach((_, index) => {
        initialAnswers[index] = null;
      });
      setUserAnswers(initialAnswers);
      
      setQuizStarted(true);
      setTimeElapsed(0);
      setError(null);
      
      console.log("✅ Quiz initialized successfully");
    };
    
    initQuiz();
  }, [quizData]);

  const createSampleQuiz = () => {
    console.log("🔄 Creating sample quiz");
    const sampleQuiz = {
      title: "Sample Quiz",
      difficulty: "medium",
      questions: [
        {
          id: 1,
          question: "What is the main topic of the document?",
          options: [
            { id: "A", text: "Main concepts and applications" },
            { id: "B", text: "Historical background" },
            { id: "C", text: "Technical specifications" },
            { id: "D", text: "Personal opinions" }
          ],
          correct_answer: "A",
          explanation: "Documents typically focus on main concepts."
        },
        {
          id: 2,
          question: "Which method is commonly discussed?",
          options: [
            { id: "A", text: "Systematic approach" },
            { id: "B", text: "Random trials" },
            { id: "C", text: "Theoretical analysis" },
            { id: "D", text: "Case studies" }
          ],
          correct_answer: "A",
          explanation: "Systematic approaches are commonly discussed."
        },
        {
          id: 3,
          question: "What are the key benefits mentioned?",
          options: [
            { id: "A", text: "Practical applications" },
            { id: "B", text: "Memorization" },
            { id: "C", text: "Theoretical knowledge" },
            { id: "D", text: "Entertainment" }
          ],
          correct_answer: "A",
          explanation: "Practical applications are key benefits."
        }
      ]
    };
    
    setCurrentQuizData({
      ...sampleQuiz,
      quiz_id: `sample_quiz_${Date.now()}`
    });
    
    const initialAnswers = {};
    sampleQuiz.questions.forEach((_, index) => {
      initialAnswers[index] = null;
    });
    setUserAnswers(initialAnswers);
    
    setQuizStarted(true);
    setTimeElapsed(0);
  };

  // Timer
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted]);

  const handleAnswerSelect = (questionIndex, answerId) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerId
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < (currentQuizData?.questions?.length || 0) - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const submitQuiz = async () => {
    if (!currentQuizData) return;
    
    const unanswered = Object.values(userAnswers).some(answer => answer === null);
    if (unanswered) {
      if (!window.confirm('You have unanswered questions. Submit anyway?')) {
        return;
      }
    }
    
    setLoading(true);
    try {
      // Calculate score
      let score = 0;
      const questions = currentQuizData.questions || [];
      
      questions.forEach((q, index) => {
        const userAnswer = userAnswers[index];
        if (userAnswer && userAnswer.toUpperCase() === q.correct_answer.toUpperCase()) {
          score += 1;
        }
      });
      
      const maxScore = questions.length;
      const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 0;
      const points_earned = score * 10; // 10 points per correct answer
      
      // Get incorrect questions
      const incorrectQuestions = questions
        .map((q, index) => ({
          question_id: index + 1,
          question: q.question,
          user_answer: userAnswers[index],
          correct_answer: q.correct_answer,
          explanation: q.explanation
        }))
        .filter((_, index) => {
          const userAnswer = userAnswers[index];
          const correctAnswer = questions[index].correct_answer;
          return userAnswer === null || userAnswer.toUpperCase() !== correctAnswer.toUpperCase();
        });
      
      const result = {
        score,
        max_score: maxScore,
        percentage,
        points_earned,
        feedback: getFeedback(percentage),
        incorrect_questions: incorrectQuestions
      };
      
      console.log("📊 Quiz result:", result);
      
      setQuizResult(result);
      setQuizCompleted(true);
      
      // Save to backend
      try {
        const submissionResult = await api.submitQuiz(
          userId,
          currentQuizData.quiz_id,
          userAnswers,
          timeElapsed
        );
        console.log("✅ Score saved to backend:", submissionResult);
        
        // Update user points in the result
        if (submissionResult.points_earned) {
          result.points_earned = submissionResult.points_earned;
        }
        
      } catch (saveError) {
        console.warn("⚠️ Could not save score to backend:", saveError);
      }
      
      if (onComplete) {
        onComplete(result);
      }
      
    } catch (error) {
      console.error('❌ Error calculating score:', error);
      alert('Error calculating score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getFeedback = (percentage) => {
    if (percentage >= 90) return "Excellent! 🎉 You've mastered this!";
    if (percentage >= 70) return "Good job! 👍 Solid understanding.";
    if (percentage >= 50) return "Not bad! 📚 Keep practicing.";
    return "Keep studying! 💪 Review the material.";
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ===== RENDER LOGIC =====

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Error</h3>
          <p className="text-red-600">{error}</p>
          <button
            onClick={createSampleQuiz}
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Load Sample Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!quizStarted) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Setting up your quiz...</p>
        <p className="text-sm text-gray-500 mt-2">This should only take a moment</p>
      </div>
    );
  }

  if (!currentQuizData || !currentQuizData.questions) {
    return (
      <div className="text-center p-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 inline-block">
          <h3 className="text-lg font-semibold text-yellow-700 mb-2">No Quiz Data</h3>
          <p className="text-yellow-600">Unable to load quiz questions.</p>
          <button
            onClick={createSampleQuiz}
            className="mt-3 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
          >
            Load Sample Quiz
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted && quizResult) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600">Here are your results</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-700">{quizResult.score}/{quizResult.max_score}</div>
            <div className="text-blue-600 text-sm">Score</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-700">{quizResult.percentage}%</div>
            <div className="text-green-600 text-sm">Percentage</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-700">{formatTime(timeElapsed)}</div>
            <div className="text-purple-600 text-sm">Time Taken</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-700">+{quizResult.points_earned}</div>
            <div className="text-yellow-600 text-sm">Points Earned</div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <div className="flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Feedback</h3>
              <p className="text-gray-700">{quizResult.feedback}</p>
            </div>
          </div>
        </div>
        
        {quizResult.incorrect_questions.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <XCircle className="w-6 h-6 text-red-600 mr-3" />
              <h3 className="text-lg font-semibold text-gray-900">Questions to Review ({quizResult.incorrect_questions.length})</h3>
            </div>
            <div className="space-y-4">
              {quizResult.incorrect_questions.map((q, idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg border border-red-100">
                  <p className="font-medium text-gray-900 mb-2">Q{q.question_id}: {q.question}</p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Your answer:</p>
                      <div className="bg-red-100 text-red-800 px-3 py-2 rounded">
                        {q.user_answer || "No answer"}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">Correct answer:</p>
                      <div className="bg-green-100 text-green-800 px-3 py-2 rounded">
                        {q.correct_answer}
                      </div>
                    </div>
                  </div>
                  {q.explanation && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium">💡 Explanation:</span> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Take Another Quiz
          </button>
          <button
            onClick={() => {
              // Navigate back to PDF learning
              window.location.href = '/pdf-learning';
            }}
            className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            Back to PDF Learning
          </button>
        </div>
      </div>
    );
  }

  const currentQ = currentQuizData.questions[currentQuestion];
  const totalQuestions = currentQuizData.questions.length;
  const progressPercentage = ((currentQuestion + 1) / totalQuestions) * 100;
  const answeredCount = Object.values(userAnswers).filter(a => a !== null).length;
  
  return (
    <div className="p-4 md:p-6 max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{currentQuizData.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                currentQuizData.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuizData.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {currentQuizData.difficulty.charAt(0).toUpperCase() + currentQuizData.difficulty.slice(1)}
              </span>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span className="text-sm">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
          
          <div className="text-center md:text-right">
            <div className="text-lg font-semibold text-gray-900">
              Question {currentQuestion + 1} of {totalQuestions}
            </div>
            <div className="text-sm text-gray-500">
              {answeredCount} of {totalQuestions} answered
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{Math.round(progressPercentage)}% Complete</span>
          <span>{totalQuestions - (currentQuestion + 1)} questions remaining</span>
        </div>
      </div>
      
      {/* Current Question */}
      <div className="mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            <span className="text-indigo-600 mr-2">Q{currentQuestion + 1}:</span>
            {currentQ.question}
          </h3>
          
          <div className="space-y-3">
            {currentQ.options && currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(currentQuestion, option.id)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                  userAnswers[currentQuestion] === option.id
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-900 ring-2 ring-indigo-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 ${
                    userAnswers[currentQuestion] === option.id
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {option.id}
                  </div>
                  <span className="font-medium">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Question Navigation */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            {currentQuestion > 0 && (
              <button
                onClick={prevQuestion}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
              >
                ← Previous
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {userAnswers[currentQuestion] !== null && (
              <span className="text-green-600 text-sm font-medium flex items-center bg-green-50 px-3 py-1 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                Answer selected
              </span>
            )}
          </div>
          
          <div>
            {currentQuestion < totalQuestions - 1 ? (
              <button
                onClick={nextQuestion}
                disabled={!userAnswers[currentQuestion]}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  userAnswers[currentQuestion]
                    ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Next Question →
              </button>
            ) : (
              <button
                onClick={submitQuiz}
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium transition-colors flex items-center ${
                  loading
                    ? 'bg-gray-400 text-white cursor-not-allowed'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Submit Quiz'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {/* Question List Navigation */}
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Question Navigation</h4>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {currentQuizData.questions.map((question, index) => (
            <button
              key={index}
              onClick={() => setCurrentQuestion(index)}
              className={`p-3 rounded-lg border text-center transition-colors ${
                currentQuestion === index
                  ? 'border-indigo-600 bg-indigo-50 text-indigo-900'
                  : userAnswers[index] !== null
                  ? 'border-green-200 bg-green-50 text-green-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium">Q{index + 1}</div>
              <div className="text-xs mt-1">
                {userAnswers[index] !== null ? (
                  <span className="text-green-600">✓</span>
                ) : (
                  <span className="text-gray-500">–</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveQuiz;