// src/components/CourseRecommendation/BrowseCourses.jsx
import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  X,
  ChevronRight,
  Star,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  BookOpen,
  Compass,
  Grid,
  List,
  SlidersHorizontal,
  ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import CourseCard from './CourseCard';

const BrowseCourses = ({ user, onEnroll, onViewCourse }) => {
  const [loading, setLoading] = useState(true);
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('relevance');
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [visibleCount, setVisibleCount] = useState(12); // Start with 12, load more on demand
  const [hasMore, setHasMore] = useState(true);

  // Sample categories with icons
  const categoryData = [
    { id: 'all', name: 'All Courses', icon: Grid, color: 'from-indigo-500 to-purple-600', count: 0 },
    { id: 'web', name: 'Web Development', icon: Compass, color: 'from-blue-500 to-cyan-500', count: 0 },
    { id: 'programming', name: 'Programming', icon: BookOpen, color: 'from-purple-500 to-pink-500', count: 0 },
    { id: 'data', name: 'Data Science', icon: TrendingUp, color: 'from-green-500 to-emerald-500', count: 0 },
    { id: 'mobile', name: 'Mobile Dev', icon: Users, color: 'from-orange-500 to-amber-500', count: 0 },
    { id: 'design', name: 'UI/UX Design', icon: Sparkles, color: 'from-red-500 to-rose-500', count: 0 },
    { id: 'business', name: 'Business', icon: TrendingUp, color: 'from-gray-600 to-gray-800', count: 0 },
    { id: 'ai', name: 'AI & ML', icon: Sparkles, color: 'from-teal-500 to-green-500', count: 0 }
  ];

  useEffect(() => {
    loadCourses();
    loadEnrolledCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    try {
      // Remove the limit parameter or set it to a very high number
      const data = await api.getAllCourses(); // or await api.getAllCourses(5000) for a large number
      if (data.success && data.courses) {
        setAllCourses(data.courses);
        setHasMore(data.courses.length > 12);
        
        // Calculate category counts
        const updatedCategories = categoryData.map(cat => {
          let count = 0;
          if (cat.id === 'all') {
            count = data.courses.length;
          } else {
            // Simple categorization logic
            count = data.courses.filter(course => {
              const title = course.title?.toLowerCase() || '';
              const desc = course.description?.toLowerCase() || '';
              const skills = course.skills?.toLowerCase() || '';
              
              if (cat.id === 'web') {
                return title.includes('web') || title.includes('html') || title.includes('css') || 
                       title.includes('javascript') || title.includes('frontend') || title.includes('backend') ||
                       desc.includes('web') || desc.includes('html') || desc.includes('css') || 
                       desc.includes('javascript') || skills.includes('web') || skills.includes('javascript');
              } else if (cat.id === 'programming') {
                return title.includes('programming') || title.includes('python') || title.includes('java') || 
                       title.includes('coding') || title.includes('software') || title.includes('c++') ||
                       desc.includes('programming') || desc.includes('python') || desc.includes('java') ||
                       skills.includes('programming') || skills.includes('python') || skills.includes('java');
              } else if (cat.id === 'data') {
                return title.includes('data') || title.includes('machine learning') || title.includes('ai') || 
                       title.includes('analytics') || title.includes('data science') ||
                       desc.includes('data') || desc.includes('machine learning') || desc.includes('ai') ||
                       skills.includes('data') || skills.includes('machine learning');
              } else if (cat.id === 'mobile') {
                return title.includes('mobile') || title.includes('android') || title.includes('ios') ||
                       desc.includes('mobile') || desc.includes('android') || desc.includes('ios') ||
                       skills.includes('mobile') || skills.includes('android') || skills.includes('ios');
              } else if (cat.id === 'design') {
                return title.includes('design') || title.includes('ui') || title.includes('ux') ||
                       title.includes('user interface') || title.includes('user experience') ||
                       desc.includes('design') || desc.includes('ui') || desc.includes('ux') ||
                       skills.includes('design') || skills.includes('ui') || skills.includes('ux');
              } else if (cat.id === 'business') {
                return title.includes('business') || title.includes('marketing') || title.includes('finance') ||
                       title.includes('management') || title.includes('strategy') ||
                       desc.includes('business') || desc.includes('marketing') || desc.includes('finance') ||
                       skills.includes('business') || skills.includes('marketing');
              } else if (cat.id === 'ai') {
                return title.includes('ai') || title.includes('artificial intelligence') || title.includes('machine learning') ||
                       title.includes('deep learning') || title.includes('neural network') ||
                       desc.includes('ai') || desc.includes('artificial intelligence') || desc.includes('machine learning') ||
                       skills.includes('ai') || skills.includes('machine learning');
              }
              return false;
            }).length;
          }
          return { ...cat, count };
        });
        
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledCourses = async () => {
    try {
      if (user?.id) {
        const data = await api.getUserCourses(user.id);
        if (data.success && data.enrolled_courses) {
          const enrolledIds = new Set(data.enrolled_courses.map(c => c.course_id));
          setEnrolledCourseIds(enrolledIds);
        }
      }
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
    }
  };

  const getFilteredCourses = () => {
    let filtered = [...allCourses];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(course => {
        const title = course.title?.toLowerCase() || '';
        const desc = course.description?.toLowerCase() || '';
        const skills = course.skills?.toLowerCase() || '';
        
        if (selectedCategory === 'web') {
          return title.includes('web') || title.includes('html') || title.includes('css') || 
                 title.includes('javascript') || title.includes('frontend') || title.includes('backend') ||
                 desc.includes('web') || desc.includes('html') || desc.includes('css') || 
                 desc.includes('javascript') || skills.includes('web') || skills.includes('javascript');
        } else if (selectedCategory === 'programming') {
          return title.includes('programming') || title.includes('python') || title.includes('java') || 
                 title.includes('coding') || title.includes('software') || title.includes('c++') ||
                 desc.includes('programming') || desc.includes('python') || desc.includes('java') ||
                 skills.includes('programming') || skills.includes('python') || skills.includes('java');
        } else if (selectedCategory === 'data') {
          return title.includes('data') || title.includes('machine learning') || title.includes('ai') || 
                 title.includes('analytics') || title.includes('data science') ||
                 desc.includes('data') || desc.includes('machine learning') || desc.includes('ai') ||
                 skills.includes('data') || skills.includes('machine learning');
        } else if (selectedCategory === 'mobile') {
          return title.includes('mobile') || title.includes('android') || title.includes('ios') ||
                 desc.includes('mobile') || desc.includes('android') || desc.includes('ios') ||
                 skills.includes('mobile') || skills.includes('android') || skills.includes('ios');
        } else if (selectedCategory === 'design') {
          return title.includes('design') || title.includes('ui') || title.includes('ux') ||
                 title.includes('user interface') || title.includes('user experience') ||
                 desc.includes('design') || desc.includes('ui') || desc.includes('ux') ||
                 skills.includes('design') || skills.includes('ui') || skills.includes('ux');
        } else if (selectedCategory === 'business') {
          return title.includes('business') || title.includes('marketing') || title.includes('finance') ||
                 title.includes('management') || title.includes('strategy') ||
                 desc.includes('business') || desc.includes('marketing') || desc.includes('finance') ||
                 skills.includes('business') || skills.includes('marketing');
        } else if (selectedCategory === 'ai') {
          return title.includes('ai') || title.includes('artificial intelligence') || title.includes('machine learning') ||
                 title.includes('deep learning') || title.includes('neural network') ||
                 desc.includes('ai') || desc.includes('artificial intelligence') || desc.includes('machine learning') ||
                 skills.includes('ai') || skills.includes('machine learning');
        }
        return true;
      });
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title?.toLowerCase().includes(query) ||
        course.description?.toLowerCase().includes(query) ||
        course.skills?.toLowerCase().includes(query) ||
        course.university?.toLowerCase().includes(query)
      );
    }

    // Filter by difficulty
    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(course => 
        course.difficulty === difficultyFilter
      );
    }

    // Filter by rating
    if (ratingFilter > 0) {
      filtered = filtered.filter(course => 
        course.rating >= ratingFilter
      );
    }

    // Sort courses
    switch(sortBy) {
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        // Sort by match score or rating for now
        filtered.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3 };
        filtered.sort((a, b) => 
          (difficultyOrder[a.difficulty] || 0) - (difficultyOrder[b.difficulty] || 0)
        );
        break;
      default: // relevance
        // Keep original order or sort by match score
        filtered.sort((a, b) => (b.match_score || 0) - (a.match_score || 0));
    }

    return filtered;
  };

  const handleEnroll = async (course) => {
    if (!user?.id) {
      alert('Please login to enroll in courses');
      return;
    }

    try {
      await api.enrollCourse(user.id, course.course_id, course.title);
      setEnrolledCourseIds(prev => new Set([...prev, course.course_id]));
      if (onEnroll) onEnroll(course);
      alert(`Successfully enrolled in "${course.title}"!`);
    } catch (error) {
      console.error('Error enrolling:', error);
      alert('Failed to enroll. Please try again.');
    }
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setDifficultyFilter('all');
    setRatingFilter(0);
    setSortBy('relevance');
    setVisibleCount(12);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => {
      const newCount = prev + 12;
      const filteredCourses = getFilteredCourses();
      setHasMore(newCount < filteredCourses.length);
      return newCount;
    });
  };

  const handleViewCourse = (course) => {
    // Directly navigate to course URL or show in new tab
    if (course.url && course.url !== '#') {
      window.open(course.url, '_blank');
    } else {
      // Show course details in a modal or alert
      alert(`Course: ${course.title}\nUniversity: ${course.university}\nRating: ${course.rating}\nDifficulty: ${course.difficulty}\n\n${course.description || 'No description available.'}`);
    }
  };

  const filteredCourses = getFilteredCourses();
  const coursesToShow = filteredCourses.slice(0, visibleCount);
  const selectedCategoryData = categories.find(c => c.id === selectedCategory) || categoryData[0];

  if (loading) {
    return <LoadingSpinner message="Loading courses..." />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Browse Courses</h1>
            <p className="text-indigo-100">Discover thousands of courses across all categories</p>
          </div>
          <Compass size={60} className="opacity-80" />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{allCourses.length}</div>
          <div className="text-sm text-gray-600">Total Courses</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{categories.length - 1}</div>
          <div className="text-sm text-gray-600">Categories</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {allCourses.filter(c => c.rating >= 4.5).length}
          </div>
          <div className="text-sm text-gray-600">Top Rated</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">
            {allCourses.filter(c => c.difficulty === 'Beginner').length}
          </div>
          <div className="text-sm text-gray-600">Beginner Friendly</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search courses by title, description, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-gray-600 whitespace-nowrap">View:</span>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List size={20} />
              </button>
            </div>
            
            <button
              onClick={() => document.getElementById('filters').classList.toggle('hidden')}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <SlidersHorizontal size={18} />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Advanced Filters */}
        <div id="filters" className="hidden lg:block">
          <div className="border-t border-gray-200 pt-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 whitespace-nowrap">Filter by:</span>
                
                <select
                  value={difficultyFilter}
                  onChange={(e) => setDifficultyFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="0">All Ratings</option>
                  <option value="4.5">4.5+ Stars</option>
                  <option value="4">4+ Stars</option>
                  <option value="3">3+ Stars</option>
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="relevance">Sort by: Relevance</option>
                  <option value="rating">Sort by: Highest Rated</option>
                  <option value="popularity">Sort by: Popularity</option>
                  <option value="difficulty">Sort by: Difficulty</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                {(selectedCategory !== 'all' || searchQuery || difficultyFilter !== 'all' || ratingFilter > 0) && (
                  <button
                    onClick={handleClearFilters}
                    className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <X size={16} />
                    <span>Clear Filters</span>
                  </button>
                )}
                
                <div className="text-sm text-gray-600">
                  Showing {Math.min(visibleCount, filteredCourses.length)} of {filteredCourses.length} courses
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setVisibleCount(12);
                }}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all ${
                  isSelected 
                    ? `border-indigo-500 bg-gradient-to-r ${category.color} text-white shadow-lg` 
                    : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                }`}
              >
                <div className={`p-2 rounded-lg mb-2 ${isSelected ? 'bg-white/20' : 'bg-gray-100'}`}>
                  <Icon size={20} className={isSelected ? 'text-white' : 'text-gray-600'} />
                </div>
                <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                  {category.name}
                </span>
                <span className={`text-xs mt-1 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
                  {category.count} courses
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCategoryData.name}</h2>
            <p className="text-gray-600">
              {filteredCourses.length} courses found
              {searchQuery && ` for "${searchQuery}"`}
              {difficultyFilter !== 'all' && ` • ${difficultyFilter} level`}
              {ratingFilter > 0 && ` • ${ratingFilter}+ stars`}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">Sorted by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
            >
              <option value="relevance">Relevance</option>
              <option value="rating">Highest Rated</option>
              <option value="popularity">Popularity</option>
              <option value="difficulty">Difficulty</option>
            </select>
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <>
            {/* Grid/List View */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {coursesToShow.map((course, idx) => (
                  <CourseCard
                    key={idx}
                    course={course}
                    userId={user?.id}
                    onEnroll={handleEnroll}
                    enrolled={enrolledCourseIds.has(course.course_id)}
                    compact={false}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {coursesToShow.map((course, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 
                              className="font-bold text-gray-900 text-lg mb-1 hover:text-indigo-600 cursor-pointer"
                              onClick={() => handleViewCourse(course)}
                            >
                              {course.title}
                            </h3>
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <BookOpen size={14} className="mr-1" />
                              <span>{course.university || 'Various Universities'}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
                              <Star size={12} className="mr-1" />
                              <span className="font-bold">{course.rating?.toFixed(1) || 'N/A'}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3 mb-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {course.difficulty || 'All Levels'}
                          </span>
                          {course.match_score && (
                            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                              {Math.round((course.match_score || 0) * 100)}% match
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                          {course.description || 'No description available.'}
                        </p>
                        
                        {course.skills && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Skills you'll learn:</p>
                            <div className="flex flex-wrap gap-1">
                              {course.skills.split(',').slice(0, 4).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                                  {skill.trim()}
                                </span>
                              ))}
                              {course.skills.split(',').length > 4 && (
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                  +{course.skills.split(',').length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="lg:w-48 space-y-3">
                        {!enrolledCourseIds.has(course.course_id) ? (
                          <button
                            onClick={() => handleEnroll(course)}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                          >
                            Enroll Now
                          </button>
                        ) : (
                          <div className="w-full bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium text-center">
                            Enrolled
                          </div>
                        )}
                        
                        <button
                          onClick={() => handleViewCourse(course)}
                          className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center"
                        >
                          View Course
                          <ExternalLink size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {hasMore && filteredCourses.length > visibleCount && (
              <div className="text-center mt-8">
                <button 
                  onClick={handleLoadMore}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center mx-auto"
                >
                  Load More Courses ({filteredCourses.length - visibleCount} more)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <Compass className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery ? `No courses found for "${searchQuery}"` : 'No courses available in this category'}
            </p>
            <button
              onClick={handleClearFilters}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Featured Categories */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Popular Learning Paths</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Full Stack Development',
              description: 'Learn frontend and backend technologies',
              courses: 245,
              icon: Compass,
              color: 'from-blue-500 to-cyan-500'
            },
            {
              title: 'Data Science & AI',
              description: 'Master machine learning and analytics',
              courses: 189,
              icon: TrendingUp,
              color: 'from-purple-500 to-pink-500'
            },
            {
              title: 'Mobile App Development',
              description: 'Build iOS and Android applications',
              courses: 167,
              icon: Users,
              color: 'from-green-500 to-emerald-500'
            }
          ].map((path, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 bg-gradient-to-r ${path.color} rounded-lg flex items-center justify-center mb-4`}>
                <path.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{path.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{path.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">{path.courses} courses</span>
                <button
                  onClick={() => {
                    setSelectedCategory('web');
                    setVisibleCount(12);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Explore →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseCourses;