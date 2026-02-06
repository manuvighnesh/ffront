import React, { useState, useEffect, useRef } from 'react';
import { 
  Upload, Brain, BookOpen, Trophy, TrendingUp, 
  Calendar, Award, Clock, Target,
  ExternalLink, User, ChevronRight, ChevronLeft, Search, Filter, MoreHorizontal
} from 'lucide-react';
import Navbar from '../Layout/Navbar.jsx';
import CourseRecommendations from '../CourseRecommendation/CourseRecommendations.jsx';
import { api } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';

const EnhancedDashboard = ({ user, onLogout, onSelectMode, onProfileUpdate }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [expandedDescriptions, setExpandedDescriptions] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (user && user.id) {
      loadDashboardData();
      loadEnrolledCourses();
      loadAllCourses();
    }
  }, [user]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const data = await api.getDashboardData(user.id);
      setDashboardData(data);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setDashboardData({
        user: {
          id: user.id,
          name: user.name,
          points: user.points || 0,
          streak_days: user.streak_days || 0,
          level: "Beginner",
          interests: user.interests || ["programming"],
          experience_level: user.experience_level || "beginner"
        },
        quiz_stats: {
          total_quizzes: 0,
          average_score: 50,
          best_score: 100,
          quizzes_today: 0
        },
        course_stats: {
          total_courses: 0,
          completed_courses: 0,
          in_progress_courses: 0,
          average_progress: 0,
          total_learning_time: 60,
          enrolled_courses: []
        },
        learning_activity: {
          total_activities: 0,
          weekly_activities: 0,
          recent_activities: []
        },
        achievements: {
          quizzes_completed: false,
          courses_completed: false,
          streak_7_days: false,
          streak_30_days: false,
          perfect_quiz: false,
          course_master: false,
          weekly_learner: false
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const loadEnrolledCourses = async () => {
    try {
      const data = await api.getUserCourses(user.id);
      if (data.success && data.enrolled_courses) {
        setEnrolledCourses(data.enrolled_courses);
      }
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
    }
  };

  const loadAllCourses = async () => {
    try {
      const data = await api.getCategorizedCourses();
      if (data.success && data.categories) {
        setCategories(data.categories);
        // Flatten all courses for search
        const allCourses = Object.values(data.categories).flat();
        setAllCourses(allCourses);
      }
    } catch (error) {
      console.error('Error loading categorized courses:', error);
      // Fallback to getAllCourses
      const fallbackData = await api.getAllCourses(100);
      if (fallbackData.success && fallbackData.courses) {
        organizeCoursesByCategory(fallbackData.courses);
      }
    }
  };

  const organizeCoursesByCategory = (courses) => {
    const categoriesMap = {};
    
    // Common categories based on course skills/titles
    const categoryKeywords = {
      'Web Development': ['web', 'html', 'css', 'javascript', 'frontend', 'backend', 'full stack'],
      'Programming': ['python', 'java', 'javascript', 'programming', 'coding', 'software'],
      'Data Science': ['data', 'machine learning', 'ai', 'analytics', 'statistics'],
      'Business': ['business', 'management', 'marketing', 'finance', 'entrepreneurship'],
      'Design': ['design', 'ui', 'ux', 'graphic', 'creative'],
      'Health': ['health', 'medical', 'biology', 'nutrition', 'fitness'],
      'Psychology': ['psychology', 'mental', 'behavior', 'social'],
      'Mathematics': ['math', 'calculus', 'algebra', 'statistics']
    };

    courses.forEach(course => {
      let assigned = false;
      const title = course.title?.toLowerCase() || '';
      const skills = course.skills?.toLowerCase() || '';
      const description = course.description?.toLowerCase() || '';
      
      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        for (const keyword of keywords) {
          if (title.includes(keyword) || skills.includes(keyword) || description.includes(keyword)) {
            if (!categoriesMap[category]) {
              categoriesMap[category] = [];
            }
            categoriesMap[category].push(course);
            assigned = true;
            break;
          }
        }
        if (assigned) break;
      }
      
      if (!assigned) {
        if (!categoriesMap['Other']) {
          categoriesMap['Other'] = [];
        }
        categoriesMap['Other'].push(course);
      }
    });

    setCategories(categoriesMap);
    setAllCourses(courses);
  };

  // Filter courses based on search and difficulty
  const getFilteredCourses = (courses) => {
    return courses.filter(course => {
      const matchesSearch = !searchQuery || 
        course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.skills?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDifficulty = difficultyFilter === 'all' || 
        course.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
  };

  const handleViewCourse = (course) => {
    if (course.url && course.url !== '#') {
      window.open(course.url, '_blank');
    }
  };

  const toggleDescription = (courseId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const handleViewAll = (category, courses) => {
    setSelectedCategory({ name: category, courses });
  };

  const LearningOptionCard = ({ icon: Icon, title, description, onClick, color }) => (
    <div 
      className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all p-6 text-left border-2 border-transparent hover:border-${color}-500 cursor-pointer`}
      onClick={onClick}
    >
      <div className={`flex items-center justify-center w-12 h-12 bg-${color}-100 rounded-xl mb-4 group-hover:bg-${color}-600 transition-colors`}>
        <Icon className={`w-6 h-6 text-${color}-600 group-hover:text-white transition-colors`} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </div>
  );

  const EnrolledCourseCard = ({ course }) => (
    <div 
      className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow cursor-pointer h-full"
      onClick={() => handleViewCourse(course)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-lg mb-1 hover:text-indigo-600 line-clamp-2 min-h-[3.5rem]">
            {course.title}
          </h3>
          <div className="flex items-center text-gray-600 text-sm mb-2">
            <span className="truncate">{course.university || "Various Universities"}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {course.rating && (
            <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm whitespace-nowrap">
              <span className="font-bold">{course.rating.toFixed(1)}</span>
            </div>
          )}
          {course.completed ? (
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm whitespace-nowrap">
              Completed
            </span>
          ) : (
            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm whitespace-nowrap">
              {course.progress || 0}%
            </span>
          )}
        </div>
      </div>
      
      <div className="mb-3">
        <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
          course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
          course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
          course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {course.difficulty || 'All Levels'}
        </span>
      </div>
      
      <p className={`text-gray-700 text-sm mb-3 ${expandedDescriptions[course.course_id] ? '' : 'line-clamp-3'}`}>
        {course.description || 'No description available.'}
      </p>
      
      {course.skills && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
            {course.skills.split(',').slice(0, 4).map((skill, idx) => (
              <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded whitespace-nowrap">
                {skill.trim()}
              </span>
            ))}
            {course.skills.split(',').length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                +{course.skills.split(',').length - 4}
              </span>
            )}
          </div>
        </div>
      )}
      
      <div className="flex justify-between text-xs text-gray-500 mt-auto">
        <span>Progress: {course.progress || 0}%</span>
        <span className="text-indigo-600">Click to open course</span>
      </div>
    </div>
  );

  const CourseCard = ({ course, onEnroll }) => {
    const [isEnrolling, setIsEnrolling] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);

    useEffect(() => {
      setIsEnrolled(enrolledCourses.some(ec => ec.course_id === course.course_id));
    }, [enrolledCourses, course.course_id]);

    const handleEnroll = async () => {
      if (!user?.id || isEnrolled) return;
      
      setIsEnrolling(true);
      try {
        await api.enrollCourse(user.id, course.course_id, course.title);
        setIsEnrolled(true);
        if (onEnroll) onEnroll(course);
        alert(`Successfully enrolled in "${course.title}"!`);
      } catch (error) {
        console.error('Error enrolling:', error);
        alert('Failed to enroll in course. Please try again.');
      } finally {
        setIsEnrolling(false);
      }
    };

    const isDescriptionExpanded = expandedDescriptions[course.course_id];

    return (
      <div className="bg-white rounded-lg shadow border border-gray-200 p-4 hover:shadow-md transition-shadow flex-shrink-0 w-[280px] h-[420px] flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-w-0">
            <h3 
              className="font-bold text-gray-900 text-lg mb-1 hover:text-indigo-600 cursor-pointer line-clamp-2 min-h-[3.5rem]"
              onClick={() => handleViewCourse(course)}
              title={course.title}
            >
              {course.title}
            </h3>
            <div className="flex items-center text-gray-600 text-sm mb-2">
              <span className="truncate" title={course.university || "Various Universities"}>
                {course.university || "Various Universities"}
              </span>
            </div>
          </div>
          {course.rating && (
            <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm whitespace-nowrap">
              <span className="font-bold">{course.rating?.toFixed(1)}</span>
            </div>
          )}
        </div>
        
        <div className="mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
            course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {course.difficulty || 'All Levels'}
          </span>
        </div>
        
        <div className="flex-1 min-h-0">
          <p className={`text-gray-700 text-sm mb-3 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}>
            {course.description || 'No description available.'}
          </p>
          
          {course.description && course.description.length > 150 && (
            <button
              onClick={() => toggleDescription(course.course_id)}
              className="text-indigo-600 text-xs font-medium hover:text-indigo-800 mb-3"
            >
              {isDescriptionExpanded ? 'Read Less' : 'Read More'}
            </button>
          )}
          
          {course.skills && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                {course.skills.split(',').slice(0, 4).map((skill, idx) => (
                  <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded whitespace-nowrap">
                    {skill.trim()}
                  </span>
                ))}
                {course.skills.split(',').length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                    +{course.skills.split(',').length - 4}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-auto">
          <div className="flex space-x-2">
            {!isEnrolled ? (
              <button
                onClick={handleEnroll}
                disabled={isEnrolling}
                className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors flex items-center justify-center text-sm"
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
              <div className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg font-medium flex items-center justify-center text-sm">
                <span>Enrolled</span>
              </div>
            )}
            <button
              onClick={() => handleViewCourse(course)}
              className="flex items-center justify-center p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="View course details"
            >
              <ExternalLink className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const CategoryCarousel = ({ title, courses, categoryId }) => {
    const carouselRef = useRef(null);
    const filteredCourses = getFilteredCourses(courses);
    const displayCourses = filteredCourses.slice(0, 10); // Show only first 10 courses
    
    if (displayCourses.length === 0) return null;

    const scrollLeft = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
      }
    };

    const scrollRight = () => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
      }
    };

    return (
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="text-gray-600 text-sm">
              {filteredCourses.length} courses available
              {filteredCourses.length !== courses.length && 
                ` (filtered from ${courses.length} total)`
              }
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={scrollLeft}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label={`Scroll ${title} left`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-indigo-600 transition-colors"
              aria-label={`Scroll ${title} right`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            {filteredCourses.length > 10 && (
              <button
                onClick={() => handleViewAll(title, courses)}
                className="ml-2 text-indigo-600 hover:text-indigo-800 font-medium flex items-center text-sm"
              >
                View All
                <MoreHorizontal className="w-4 h-4 ml-1" />
              </button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <div 
            ref={carouselRef}
            className="flex overflow-x-auto scrollbar-hide space-x-4 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayCourses.map((course, idx) => (
              <CourseCard 
                key={idx} 
                course={course}
                onEnroll={(newCourse) => {
                  setEnrolledCourses(prev => [...prev, newCourse]);
                }}
              />
            ))}
          </div>
          
          {/* Gradient fade on edges */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
        </div>
      </div>
    );
  };

  const CategoryDetailView = ({ category }) => {
    const filteredCourses = getFilteredCourses(category.courses);

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Navbar 
          user={user} 
          onLogout={onLogout} 
          onProfileUpdate={onProfileUpdate}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {category.name} Courses
                  </h1>
                  <p className="text-gray-600">
                    {filteredCourses.length} courses available in {category.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
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
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All {category.name} Courses ({filteredCourses.length})
              </h2>
              <div className="text-gray-600">
                Showing {filteredCourses.length} of {category.courses.length} courses
              </div>
            </div>
            
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, idx) => (
                  <CourseCard 
                    key={idx} 
                    course={course}
                    onEnroll={(newCourse) => {
                      setEnrolledCourses(prev => [...prev, newCourse]);
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No courses found matching your criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setDifficultyFilter('all');
                  }}
                  className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (selectedCategory) {
    return <CategoryDetailView category={selectedCategory} />;
  }

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Navbar 
        user={user} 
        onLogout={onLogout} 
        onProfileUpdate={onProfileUpdate}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || 'Learner'}! 👋
              </h1>
              <p className="text-gray-600">
                {user?.experience_level === 'beginner' ? 'Ready to start your learning journey?' : 
                 user?.experience_level === 'intermediate' ? 'Continue your learning adventure!' :
                 'Master new skills today!'}
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-4 md:mt-0">
              <button
                onClick={() => onSelectMode('profile')}
                className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              <div className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full">
                <span className="font-bold">{dashboardData?.user?.level || 'Beginner'}</span> Level
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full flex items-center">
                <Trophy className="w-4 h-4 mr-1" />
                <span className="font-bold">{dashboardData?.user?.points || 0}</span> pts
              </div>
              <div className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span className="font-bold">{dashboardData?.user?.streak_days || 0}</span> day streak
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'overview' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Overview
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'courses' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <BookOpen className="w-4 h-4 inline mr-2" />
            Courses
          </button>
          <button
            onClick={() => setActiveTab('learn')}
            className={`px-4 py-2 rounded-lg font-medium ${activeTab === 'learn' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            <Brain className="w-4 h-4 inline mr-2" />
            Learn
          </button>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard 
                icon={BookOpen} 
                title="Courses Enrolled" 
                value={enrolledCourses.length}
                subtitle={`${dashboardData?.course_stats?.completed_courses || 0} completed`}
                color="blue"
              />
              <StatCard 
                icon={Target} 
                title="Avg Quiz Score" 
                value={`${dashboardData?.quiz_stats?.average_score || 0}%`}
                subtitle={`Best: ${dashboardData?.quiz_stats?.best_score || 0}%`}
                color="green"
              />
              <StatCard 
                icon={Clock} 
                title="Learning Time" 
                value={`${Math.round((dashboardData?.course_stats?.total_learning_time || 0) / 60)}h`}
                subtitle="This month"
                color="yellow"
              />
              <StatCard 
                icon={Award} 
                title="Achievements" 
                value={Object.values(dashboardData?.achievements || {}).filter(v => v).length}
                subtitle="Unlocked"
                color="purple"
              />
            </div>

            {enrolledCourses.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
                  <span className="text-gray-600">
                    {enrolledCourses.length} courses enrolled
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.slice(0, 3).map((course, idx) => (
                    <EnrolledCourseCard 
                      key={idx} 
                      course={course}
                    />
                  ))}
                </div>
                {enrolledCourses.length > 3 && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setActiveTab('courses')}
                      className="text-indigo-600 hover:text-indigo-800 font-medium"
                    >
                      View all {enrolledCourses.length} enrolled courses →
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
                <button 
                  onClick={() => setActiveTab('courses')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  View all →
                </button>
              </div>
              <CourseRecommendations user={user} />
            </div>
          </>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Browse All Courses</h2>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search courses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
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
                </div>
              </div>

              {Object.entries(categories).map(([category, courses]) => (
                <CategoryCarousel 
                  key={category}
                  title={category}
                  courses={courses}
                  categoryId={category}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
                <span className="text-gray-600">
                  {enrolledCourses.length} courses enrolled
                </span>
              </div>
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledCourses.map((course, idx) => (
                    <EnrolledCourseCard 
                      key={idx} 
                      course={course}
                    />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">You haven't enrolled in any courses yet.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'learn' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
              <p className="text-gray-600">Select how you'd like to learn today</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <LearningOptionCard
                icon={Upload}
                title="Learn by PDF"
                description="Upload study materials and get instant flashcards, quizzes, notes, and Q&A"
                onClick={() => onSelectMode('pdf')}
                color="indigo"
              />
              <LearningOptionCard
                icon={Brain}
                title="Learn by Topic"
                description="Explore any topic with AI-guided learning tailored to your level"
                onClick={() => onSelectMode('topic')}
                color="purple"
              />
            </div>
          </div>
        )}
      </div>
      
      {/* Add custom CSS for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EnhancedDashboard;