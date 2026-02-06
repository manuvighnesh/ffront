// // src/components/PDFLearning/FlashcardsTab.jsx
// import React, { useState } from 'react';

// const FlashcardsTab = ({ onGenerate, loading }) => {
//   const [topic, setTopic] = useState('');
//   const [count, setCount] = useState(10);
//   const [difficulty, setDifficulty] = useState('medium');

//   const handleSubmit = () => {
//     onGenerate({ topic, count, difficulty });
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-gray-900 mb-6">Generate Flashcards</h2>
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">Topic (Optional)</label>
//           <input
//             type="text"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             placeholder="e.g., Photosynthesis"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Number of Cards</label>
//             <input
//               type="number"
//               value={count}
//               onChange={(e) => setCount(parseInt(e.target.value) || 10)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//               min="1"
//               max="50"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
//             <select
//               value={difficulty}
//               onChange={(e) => setDifficulty(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
//             >
//               <option value="easy">Easy</option>
//               <option value="medium">Medium</option>
//               <option value="hard">Hard</option>
//             </select>
//           </div>
//         </div>
//         <button
//           onClick={handleSubmit}
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
//         >
//           {loading ? 'Generating...' : 'Generate Flashcards'}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FlashcardsTab;
// src/components/PDFLearning/FlashcardsTab.jsx - SIMPLIFIED
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCcw, 
  Shuffle, 
  CheckCircle, 
  XCircle,
  Star,
  BookOpen,
  Zap,
  Trash2
} from 'lucide-react';

const FlashcardsTab = ({ 
  onGenerate, 
  loading, 
  flashcardsData = null, 
  onClearResults,
  bookmarkedCards: externalBookmarks = [],
  onBookmarkUpdate 
}) => {
  const [topic, setTopic] = useState('');
  const [count, setCount] = useState(10);
  const [difficulty, setDifficulty] = useState('medium');
  const [flashcards, setFlashcards] = useState([]);
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studyMode, setStudyMode] = useState('learn');
  const [showAnswer, setShowAnswer] = useState(false);
  const [showHints, setShowHints] = useState(true);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [bookmarkedCards, setBookmarkedCards] = useState(externalBookmarks);
  const [showStats, setShowStats] = useState(false);
  const flipRef = useRef(null);

  // Sync bookmarks with parent
  useEffect(() => {
    setBookmarkedCards(externalBookmarks);
  }, [externalBookmarks]);

  // Initialize with data if provided
  useEffect(() => {
    if (flashcardsData && flashcardsData.length > 0) {
      setFlashcards(flashcardsData);
      setCurrentCard(0);
      setIsFlipped(false);
      setShowAnswer(false);
    }
  }, [flashcardsData]);

  const handleSubmit = () => {
    onGenerate({ topic, count, difficulty });
  };

  const nextCard = () => {
    if (currentCard < flashcards.length - 1) {
      setIsFlipped(false);
      setShowAnswer(false);
      setCurrentCard(prev => prev + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setIsFlipped(false);
      setShowAnswer(false);
      setCurrentCard(prev => prev - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!showAnswer) setShowAnswer(true);
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCard(0);
    setIsFlipped(false);
    setShowAnswer(false);
  };

  const resetStudy = () => {
    setCurrentCard(0);
    setIsFlipped(false);
    setShowAnswer(false);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
    setShowStats(false);
  };

  const handleAnswer = (isCorrect) => {
    const currentCardId = flashcards[currentCard].id;
    if (isCorrect) {
      setCorrectAnswers(prev => [...prev, currentCardId]);
    } else {
      setIncorrectAnswers(prev => [...prev, currentCardId]);
    }
    
    if (currentCard < flashcards.length - 1) {
      setTimeout(() => {
        nextCard();
      }, 500);
    } else {
      setShowStats(true);
    }
  };

  const toggleBookmark = (cardId) => {
    const newBookmarks = bookmarkedCards.includes(cardId) 
      ? bookmarkedCards.filter(id => id !== cardId)
      : [...bookmarkedCards, cardId];
    
    setBookmarkedCards(newBookmarks);
    
    // Notify parent component
    if (onBookmarkUpdate) {
      onBookmarkUpdate(newBookmarks);
    }
  };

  const clearFlashcards = () => {
    if (onClearResults) {
      onClearResults();
    }
    setFlashcards([]);
    setBookmarkedCards([]);
    setCorrectAnswers([]);
    setIncorrectAnswers([]);
  };

  if (flashcards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <BookOpen className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Flashcards</h2>
          <p className="text-gray-600 mb-8">
            Generate interactive flashcards from your PDF content
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Topic <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="e.g., Java Programming, Biology, History..."
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Cards
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setCount(prev => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-gray-100 rounded-l-lg hover:bg-gray-200 transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value) || 1)}
                    className="w-full px-4 py-2 border-y border-gray-300 text-center focus:outline-none"
                    min="1"
                    max="50"
                  />
                  <button 
                    onClick={() => setCount(prev => Math.min(50, prev + 1))}
                    className="px-4 py-2 bg-gray-100 rounded-r-lg hover:bg-gray-200 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <div className="flex space-x-2">
                  {['easy', 'medium', 'hard'].map((level) => (
                    <button
                      key={level}
                      onClick={() => setDifficulty(level)}
                      className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                        difficulty === level
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                  Generating Flashcards...
                </>
              ) : (
                <>
                  <BookOpen className="w-5 h-5 mr-2" />
                  Generate Flashcards
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showStats && studyMode === 'test') {
    const accuracy = flashcards.length > 0 
      ? Math.round((correctAnswers.length / flashcards.length) * 100)
      : 0;
    
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Test Complete!</h2>
            <p className="text-gray-600">Your performance summary</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
              <div className="text-3xl font-bold text-green-700 mb-1">{correctAnswers.length}</div>
              <div className="text-sm text-green-600">Correct</div>
            </div>
            <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
              <div className="text-3xl font-bold text-red-700 mb-1">{incorrectAnswers.length}</div>
              <div className="text-sm text-red-600">Incorrect</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
              <div className="text-3xl font-bold text-blue-700 mb-1">{accuracy}%</div>
              <div className="text-sm text-blue-600">Accuracy</div>
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={resetStudy}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Restart Test
            </button>
            <button
              onClick={() => {
                resetStudy();
                setShowStats(false);
              }}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Back to Learning Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentFlashcard = flashcards[currentCard];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header with Clear button */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Flashcards</h2>
          <p className="text-gray-600">
            Card {currentCard + 1} of {flashcards.length}
            {bookmarkedCards.includes(currentFlashcard?.id) && (
              <span className="ml-2 text-yellow-500">
                <Star className="w-4 h-4 inline" fill="currentColor" />
              </span>
            )}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={clearFlashcards}
            className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-lg font-medium hover:bg-red-200 transition-colors"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Clear All
          </button>
          <button
            onClick={() => setStudyMode('learn')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              studyMode === 'learn' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Learn
          </button>
          <button
            onClick={() => setStudyMode('test')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              studyMode === 'test' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Test
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progress</span>
          <span>{Math.round(((currentCard + 1) / flashcards.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentCard + 1) / flashcards.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Flashcard Container */}
      <div className="relative">
        {/* 3D Flip Card */}
        <div className="relative w-full h-[400px] mb-8 perspective-1000">
          <div
            ref={flipRef}
            className={`relative w-full h-full transition-transform duration-500 preserve-3d ${
              isFlipped ? 'rotate-y-180' : ''
            }`}
            onClick={handleFlip}
          >
            {/* Front of Card */}
            <div className="absolute w-full h-full backface-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-xl cursor-pointer">
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      currentFlashcard.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                      currentFlashcard.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {currentFlashcard.difficulty}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {currentFlashcard.category}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(currentFlashcard.id);
                    }}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    <Star 
                      className="w-5 h-5" 
                      fill={bookmarkedCards.includes(currentFlashcard.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center max-w-2xl">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {currentFlashcard.question}
                    </h3>
                    {showHints && (
                      <p className="text-gray-500 text-sm">
                        Click card to reveal answer
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                  {studyMode === 'test' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswer(true);
                      }}
                      className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                    >
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Know It
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div className="absolute w-full h-full backface-hidden rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl rotate-y-180 cursor-pointer">
              <div className="p-8 h-full flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                      Answer
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(currentFlashcard.id);
                    }}
                    className="text-gray-400 hover:text-yellow-500 transition-colors"
                  >
                    <Star 
                      className="w-5 h-5" 
                      fill={bookmarkedCards.includes(currentFlashcard.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                
                <div className="flex-1">
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Question:</h4>
                    <p className="text-gray-800 mb-4">{currentFlashcard.question}</p>
                    
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Answer:</h4>
                    <div className="bg-white rounded-xl p-4 mb-4 border border-gray-200">
                      <p className="text-xl font-bold text-gray-900">{currentFlashcard.answer}</p>
                    </div>
                    
                    {currentFlashcard.explanation && (
                      <>
                        <h4 className="text-sm font-medium text-gray-600 mb-2">Explanation:</h4>
                        <p className="text-gray-700 bg-white/50 rounded-lg p-3">
                          {currentFlashcard.explanation}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-6 border-t border-indigo-100">
                  {studyMode === 'test' && showAnswer && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnswer(false);
                        }}
                        className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      >
                        <XCircle className="w-4 h-4 inline mr-2" />
                        Need Review
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAnswer(true);
                        }}
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4 inline mr-2" />
                        Got It
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={prevCard}
              disabled={currentCard === 0}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentCard === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            <button
              onClick={nextCard}
              disabled={currentCard === flashcards.length - 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentCard === flashcards.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={shuffleCards}
              className="flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-medium hover:bg-purple-200 transition-colors"
            >
              <Shuffle className="w-4 h-4 mr-2" />
              Shuffle
            </button>
            
            <button
              onClick={resetStudy}
              className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </button>
            
            <button
              onClick={handleFlip}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              {isFlipped ? 'Show Question' : 'Show Answer'}
            </button>
          </div>
        </div>
      </div>

      {/* Study Options */}
      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Study Options</h4>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={showHints}
                  onChange={(e) => setShowHints(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                />
                <span className="ml-2 text-sm text-gray-700">Show Hints</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={bookmarkedCards.includes(currentFlashcard.id)}
                  onChange={(e) => toggleBookmark(currentFlashcard.id)}
                  className="w-4 h-4 text-yellow-500 rounded focus:ring-yellow-500"
                />
                <span className="ml-2 text-sm text-gray-700">Bookmark This Card</span>
              </label>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-sm">
              <span className="text-gray-600">Bookmarked:</span>
              <span className="ml-2 font-medium">{bookmarkedCards.length}</span>
            </div>
            <div className="text-sm">
              <span className="text-gray-600">Mastered:</span>
              <span className="ml-2 font-medium text-green-600">{correctAnswers.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card List Preview */}
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-medium text-gray-900">All Cards</h4>
          <div className="text-sm text-gray-600">
            {bookmarkedCards.length > 0 && (
              <span className="text-yellow-600">
                {bookmarkedCards.length} bookmarked
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {flashcards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => {
                setCurrentCard(index);
                setIsFlipped(false);
                setShowAnswer(false);
              }}
              className={`p-3 rounded-lg text-center transition-all ${
                currentCard === index
                  ? 'bg-indigo-600 text-white shadow-md transform scale-105'
                  : 'bg-gray-100 hover:bg-gray-200'
              } ${
                correctAnswers.includes(card.id)
                  ? 'border-2 border-green-500'
                  : incorrectAnswers.includes(card.id)
                  ? 'border-2 border-red-500'
                  : ''
              }`}
            >
              <div className="font-medium">#{index + 1}</div>
              {bookmarkedCards.includes(card.id) && (
                <Star className="w-3 h-3 mx-auto mt-1 text-yellow-500" fill="currentColor" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsTab;