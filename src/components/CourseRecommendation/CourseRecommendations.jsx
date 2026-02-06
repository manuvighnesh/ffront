import React, { useState, useEffect } from 'react';
import { BookOpen, Star, Clock, TrendingUp, AlertCircle, Search, Filter, X } from 'lucide-react';
import { api } from '../../services/api';
import CourseCard from './CourseCard';
import LoadingSpinner from '../Common/LoadingSpinner';

const CourseRecommendations = ({ user, showEnrolled = false }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());

  useEffect(() => {
    if (user && user.id) {
      loadRecommendations();
      loadEnrolledCourses();
    }
  }, [user]);

  const loadRecommendations = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await api.getCourseRecommendations(user.id);
      
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      } else {
        setRecommendations([]);
      }
    } catch (err) {
      console.error('❌ Error loading recommendations:', err);
      setError('Failed to load course recommendations');
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledCourses = async () => {
    try {
      const data = await api.getUserCourses(user.id);
      if (data.success && data.enrolled_courses) {
        const enrolledIds = new Set(data.enrolled_courses.map(c => c.course_id));
        setEnrolledCourseIds(enrolledIds);
      }
    } catch (err) {
      console.error('Error loading enrolled courses:', err);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await api.generateCourseRecommendations(user.id);
      if (data.success && data.recommendations) {
        setRecommendations(data.recommendations);
      }
    } catch (err) {
      setError('Failed to refresh recommendations');
    } finally {
      setRefreshing(false);
    }
  };

  const handleEnroll = (course) => {
    setRecommendations(prev => 
      prev.map(rec => 
        rec.course_id === course.course_id 
          ? { ...rec, enrolled: true }
          : rec
      )
    );
    
    setEnrolledCourseIds(prev => new Set([...prev, course.course_id]));
    
    alert(`Successfully enrolled in "${course.title}"!`);
  };

  const filteredRecommendations = recommendations
    .filter(course => {
      if (showEnrolled && !course.enrolled && !enrolledCourseIds.has(course.course_id)) {
        return false;
      }
      
      if (!showEnrolled && (course.enrolled || enrolledCourseIds.has(course.course_id))) {
        return false;
      }
      
      const matchesSearch = !searchQuery || 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (course.skills && course.skills.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesDifficulty = difficultyFilter === 'all' || 
        course.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });

  if (loading) {
    return <LoadingSpinner message="Loading course recommendations..." />;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {showEnrolled ? 'Enrolled Courses' : 'Recommended for You'}
          </h2>
          <p className="text-gray-600">
            {showEnrolled 
              ? 'Courses you are currently enrolled in'
              : `Based on your interests: ${user?.interests?.join(', ') || 'No interests set'}`
            }
          </p>
        </div>
        {!showEnrolled && (
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition-colors flex items-center"
          >
            {refreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Refresh
              </>
            )}
          </button>
        )}
      </div>

      {!showEnrolled && (
        <div className="mb-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses by title, description, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('all');
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700"
                title="Clear filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {filteredRecommendations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {showEnrolled ? 'No enrolled courses found' : 'No Recommendations Found'}
          </h3>
          <p className="text-gray-600 mb-4">
            {showEnrolled 
              ? 'You haven\'t enrolled in any courses yet.'
              : searchQuery || difficultyFilter !== 'all'
                ? 'Try changing your search filters or clear filters to see all recommendations.'
                : 'Update your profile interests to get personalized course recommendations.'
            }
          </p>
          {!showEnrolled && !searchQuery && difficultyFilter === 'all' && (
            <button
              onClick={handleRefresh}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Generate Recommendations
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecommendations.map((course, index) => (
              <CourseCard
                key={`${course.course_id}-${index}`}
                course={course}
                userId={user.id}
                onEnroll={handleEnroll}
                enrolled={course.enrolled || enrolledCourseIds.has(course.course_id)}
              />
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Showing {filteredRecommendations.length} {showEnrolled ? 'enrolled' : 'personalized'} courses
              {searchQuery && ` for "${searchQuery}"`}
              {difficultyFilter !== 'all' && ` at ${difficultyFilter} level`}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default CourseRecommendations;