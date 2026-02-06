// src/components/CourseRecommendation/CourseCategories.jsx - NEW FILE
import React, { useState, useEffect } from 'react';
import { 
  Code, 
  Database, 
  Smartphone, 
  PaintBucket, 
  LineChart, 
  Globe, 
  Shield, 
  Cloud,
  Gamepad2,
  Brain,
  Building,
  Heart,
  Music,
  BookOpen,
  ChevronRight,
  Sparkles,
  Filter,
  Search,
  TrendingUp
} from 'lucide-react';
import { api } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import CourseCard from './CourseCard';

const CourseCategories = ({ preview = false, userId }) => {
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const categoryIcons = {
    'Web Development': Globe,
    'Programming': Code,
    'Data Science': LineChart,
    'Mobile Development': Smartphone,
    'UI/UX Design': PaintBucket,
    'Cybersecurity': Shield,
    'Cloud Computing': Cloud,
    'Game Development': Gamepad2,
    'AI & Machine Learning': Brain,
    'Business': Building,
    'Health & Wellness': Heart,
    'Music & Arts': Music,
    'Other': BookOpen
  };

  const categoryColors = {
    'Web Development': 'from-blue-500 to-cyan-500',
    'Programming': 'from-purple-500 to-pink-500',
    'Data Science': 'from-green-500 to-emerald-500',
    'Mobile Development': 'from-orange-500 to-amber-500',
    'UI/UX Design': 'from-red-500 to-rose-500',
    'Cybersecurity': 'from-indigo-500 to-blue-500',
    'Cloud Computing': 'from-sky-500 to-blue-500',
    'Game Development': 'from-violet-500 to-purple-500',
    'AI & Machine Learning': 'from-teal-500 to-green-500',
    'Business': 'from-gray-600 to-gray-800',
    'Health & Wellness': 'from-rose-500 to-pink-500',
    'Music & Arts': 'from-yellow-500 to-amber-500',
    'Other': 'from-gray-500 to-gray-700'
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const data = await api.getCategorizedCourses();
      if (data.success && data.categories) {
        setCategories(data.categories);
        
        // If no categories from API, create sample structure
        if (Object.keys(data.categories).length === 0) {
          setCategories({
            'Web Development': [],
            'Programming': [],
            'Data Science': [],
            'Mobile Development': [],
            'UI/UX Design': [],
            'Other': []
          });
        }
      } else {
        // Fallback to getAllCourses and categorize them
        const allCourses = await api.getAllCourses(50);
        if (allCourses.success && allCourses.courses) {
          categorizeCourses(allCourses.courses);
        }
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      // Set empty categories structure
      setCategories({
        'Web Development': [],
        'Programming': [],
        'Data Science': [],
        'Mobile Development': [],
        'UI/UX Design': [],
        'Other': []
      });
    } finally {
      setLoading(false);
    }
  };

  const categorizeCourses = (courses) => {
    const categoriesMap = {
      'Web Development': [],
      'Programming': [],
      'Data Science': [],
      'Mobile Development': [],
      'UI/UX Design': [],
      'Cybersecurity': [],
      'Cloud Computing': [],
      'Game Development': [],
      'AI & Machine Learning': [],
      'Business': [],
      'Health & Wellness': [],
      'Music & Arts': [],
      'Other': []
    };

    courses.forEach(course => {
      const title = course.title?.toLowerCase() || '';
      const description = course.description?.toLowerCase() || '';
      const skills = course.skills?.toLowerCase() || '';

      // Categorization logic
      if (title.includes('web') || title.includes('html') || title.includes('css') || 
          title.includes('javascript') || title.includes('frontend') || title.includes('backend')) {
        categoriesMap['Web Development'].push(course);
      } else if (title.includes('python') || title.includes('java') || title.includes('programming') || 
                 title.includes('coding') || title.includes('software')) {
        categoriesMap['Programming'].push(course);
      } else if (title.includes('data') || title.includes('machine learning') || 
                 title.includes('ai') || title.includes('analytics')) {
        categoriesMap['Data Science'].push(course);
      } else if (title.includes('mobile') || title.includes('android') || 
                 title.includes('ios') || title.includes('react native')) {
        categoriesMap['Mobile Development'].push(course);
      } else if (title.includes('design') || title.includes('ui') || 
                 title.includes('ux') || title.includes('figma')) {
        categoriesMap['UI/UX Design'].push(course);
      } else if (title.includes('cyber') || title.includes('security')) {
        categoriesMap['Cybersecurity'].push(course);
      } else if (title.includes('cloud') || title.includes('aws') || 
                 title.includes('azure') || title.includes('google cloud')) {
        categoriesMap['Cloud Computing'].push(course);
      } else if (title.includes('game') || title.includes('unity') || 
                 title.includes('unreal')) {
        categoriesMap['Game Development'].push(course);
      } else if (title.includes('business') || title.includes('marketing') || 
                 title.includes('finance') || title.includes('management')) {
        categoriesMap['Business'].push(course);
      } else {
        categoriesMap['Other'].push(course);
      }
    });

    // Remove empty categories
    Object.keys(categoriesMap).forEach(key => {
      if (categoriesMap[key].length === 0) {
        delete categoriesMap[key];
      }
    });

    setCategories(categoriesMap);
  };

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

  const CategoryCard = ({ category, courses }) => {
    const Icon = categoryIcons[category] || BookOpen;
    const color = categoryColors[category] || 'from-gray-500 to-gray-700';
    
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 bg-gradient-to-r ${color} rounded-lg`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{category}</h3>
              <p className="text-gray-600">{courses.length} courses available</p>
            </div>
          </div>
          <button 
            onClick={() => setSelectedCategory({ name: category, courses })}
            className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
          >
            View All <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.slice(0, 2).map((course, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 text-sm line-clamp-2">{course.title}</h4>
                {course.rating && (
                  <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                    <span className="font-bold">{course.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-600 line-clamp-2 mb-3">{course.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                  course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                  course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {course.difficulty || 'All Levels'}
                </span>
                <button 
                  onClick={() => window.open(course.url || '#', '_blank')}
                  className="text-indigo-600 hover:text-indigo-800 text-xs font-medium"
                >
                  View Course →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CategoryDetailView = ({ category }) => {
    const filteredCourses = getFilteredCourses(category.courses);
    const Icon = categoryIcons[category.name] || BookOpen;
    const color = categoryColors[category.name] || 'from-gray-500 to-gray-700';

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`p-3 bg-gradient-to-r ${color} rounded-lg`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{category.name} Courses</h2>
                <p className="text-gray-600">{filteredCourses.length} courses available</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              ← Back to Categories
            </button>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder={`Search ${category.name} courses...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
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

          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, idx) => (
                <CourseCard 
                  key={idx} 
                  course={course}
                  userId={userId}
                  onEnroll={() => {
                    // Handle enroll callback
                    alert(`Enrolled in ${course.title}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Found</h3>
              <p className="text-gray-600 mb-4">Try changing your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDifficultyFilter('all');
                }}
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (selectedCategory) {
    return <CategoryDetailView category={selectedCategory} />;
  }

  if (loading) {
    return <LoadingSpinner message="Loading categories..." />;
  }

  return (
    <div className="space-y-8">
      {!preview && (
        <>
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Explore Learning Paths</h1>
                <p className="text-indigo-100">Discover courses across all categories to expand your skills</p>
              </div>
              <Sparkles size={60} className="opacity-80" />
            </div>
          </div>

          {/* Search and Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Browse All Categories</h2>
                <p className="text-gray-600">
                  Total courses: {Object.values(categories).reduce((acc, cat) => acc + cat.length, 0)}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search all courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
        </>
      )}

      {/* Categories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(categories)
          .filter(([category, courses]) => {
            if (searchQuery || difficultyFilter !== 'all') {
              const filtered = getFilteredCourses(courses);
              return filtered.length > 0;
            }
            return true;
          })
          .slice(0, preview ? 4 : Object.keys(categories).length)
          .map(([category, courses]) => (
            <CategoryCard 
              key={category} 
              category={category} 
              courses={getFilteredCourses(courses)} 
            />
          ))}
      </div>

      {preview && Object.keys(categories).length > 4 && (
        <div className="text-center">
          <button
            onClick={() => setSelectedCategory(null)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
          >
            View All Categories →
          </button>
        </div>
      )}

      {!preview && Object.keys(categories).length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Available</h3>
          <p className="text-gray-600">Check back soon for new course categories.</p>
        </div>
      )}
    </div>
  );
};

export default CourseCategories;