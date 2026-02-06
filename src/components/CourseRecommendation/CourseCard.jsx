
import React, { useState } from 'react';
import { BookOpen, GraduationCap, Star, Target, CheckCircle, ExternalLink, TrendingUp } from 'lucide-react';
import { api } from '../../services/api';

const CourseCard = ({ course, userId, onEnroll, onViewSimilar, enrolled = false, showSimilarButton = true, compact = false }) => {
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(enrolled);

  const handleEnroll = async () => {
    if (!userId || isEnrolled) return;
    
    setIsEnrolling(true);
    try {
      await api.enrollCourse(userId, course.course_id, course.title);
      setIsEnrolled(true);
      if (onEnroll) onEnroll(course);
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('Failed to enroll in course. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleViewCourse = () => {
    if (course.url && course.url !== '#') {
      window.open(course.url, '_blank');
    }
  };

  const handleViewSimilar = () => {
    if (onViewSimilar && typeof onViewSimilar === 'function') {
      onViewSimilar(course.title);
    }
  };

  const getDifficultyColor = (difficulty) => {
    if (!difficulty) return 'bg-gray-100 text-gray-800';
    switch(difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Compact mode layout
  if (compact) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            <h3 
              className="font-bold text-gray-900 text-sm line-clamp-2 hover:text-indigo-600 cursor-pointer" 
              onClick={handleViewCourse}
            >
              {course.title || 'Untitled Course'}
            </h3>
            <div className="flex items-center text-gray-600 text-xs mt-1">
              <span className="truncate">{course.university || 'Various'}</span>
            </div>
          </div>
          {course.rating && (
            <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
              <Star className="w-3 h-3 mr-1" />
              <span className="font-bold">{course.rating?.toFixed(1) || 'N/A'}</span>
            </div>
          )}
        </div>

        <div className="mb-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty || 'All Levels'}
          </span>
        </div>

        <p className="text-gray-700 text-xs line-clamp-2 mb-3">
          {course.description || 'No description available.'}
        </p>

        <div className="flex justify-between items-center">
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className={`px-3 py-1 rounded-lg text-xs font-medium ${
                isEnrolling 
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
            </button>
          ) : (
            <span className="text-green-600 text-xs font-medium flex items-center">
              <CheckCircle className="w-3 h-3 mr-1" />
              Enrolled
            </span>
          )}
        </div>

        {/* Similar Courses Button for compact mode */}
        {showSimilarButton && !isEnrolled && onViewSimilar && (
          <button
            onClick={handleViewSimilar}
            className="w-full mt-3 text-indigo-600 hover:text-indigo-800 text-xs font-medium flex items-center justify-center"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Similar Courses
          </button>
        )}
      </div>
    );
  }

  // Full version layout
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-5">
        {/* Course Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 
              className="font-bold text-gray-900 text-lg mb-1 line-clamp-2 hover:text-indigo-600 cursor-pointer" 
              onClick={handleViewCourse}
            >
              {course.title || 'Untitled Course'}
              {course.url && course.url !== '#' && (
                <ExternalLink className="w-4 h-4 inline ml-2" />
              )}
            </h3>
            <div className="flex items-center text-gray-600 text-sm">
              <GraduationCap className="w-4 h-4 mr-1" />
              <span className="line-clamp-1">{course.university || 'Various Universities'}</span>
            </div>
          </div>
          <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
            <Star className="w-3 h-3 mr-1" />
            {course.rating?.toFixed(1) || 'N/A'}
          </div>
        </div>

        {/* Course Info */}
        <div className="flex items-center justify-between mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course.difficulty)}`}>
            {course.difficulty || 'All Levels'}
          </span>
          {course.match_score && (
            <div className="flex items-center text-sm text-gray-600">
              <Target className="w-4 h-4 mr-1" />
              <span>{Math.round((course.match_score || 0) * 100)}% match</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">
          {course.description || 'No description available.'}
        </p>

        {/* Skills */}
        {course.skills && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Skills you'll learn:</p>
            <div className="flex flex-wrap gap-1">
              {course.skills.split(',').slice(0, 3).map((skill, idx) => (
                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                  {skill.trim()}
                </span>
              ))}
              {course.skills.split(',').length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                  +{course.skills.split(',').length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Action Button - Only Enroll */}
        <div className="flex space-x-2">
          {!isEnrolled ? (
            <button
              onClick={handleEnroll}
              disabled={isEnrolling}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors flex items-center justify-center"
            >
              {isEnrolling ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enrolling...
                </>
              ) : (
                'Enroll Now'
              )}
            </button>
          ) : (
            <div className="w-full bg-green-100 text-green-800 py-3 px-4 rounded-lg font-medium flex items-center justify-center">
              <CheckCircle className="w-4 h-4 mr-2" />
              Enrolled
            </div>
          )}
        </div>

        {/* Similar Courses Button */}
        {showSimilarButton && !isEnrolled && onViewSimilar && (
          <button
            onClick={handleViewSimilar}
            className="w-full mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center justify-center"
          >
            <TrendingUp className="w-4 h-4 mr-1" />
            View Similar Courses
          </button>
        )}
      </div>

      {/* Progress Bar for enrolled courses */}
      {isEnrolled && course.progress !== undefined && (
        <div className="px-5 pb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span>{Math.round(course.progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${course.progress}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseCard;