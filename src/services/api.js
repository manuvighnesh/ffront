import { API_BASE, ERROR_MESSAGES } from './apiConstants';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || ERROR_MESSAGES.SERVER_ERROR);
  }
  return response.json();
};

export const api = {
  // ========== HEALTH CHECK ==========
  healthCheck: async () => {
    try {
      const response = await fetch(`${API_BASE}/health`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  // ========== AUTHENTICATION ==========
  signup: async (userData) => {
    try {
      const formData = new FormData();
      Object.keys(userData).forEach(key => {
        formData.append(key, userData[key]);
      });
      
      const response = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  login: async (email, password) => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      
      const response = await fetch(`${API_BASE}/login`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  // ========== USER PROFILE ==========
  getUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/user/${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  updateProfile: async (userId, profileData) => {
    try {
      const formData = new FormData();
      Object.keys(profileData).forEach(key => {
        if (profileData[key] !== undefined && profileData[key] !== null) {
          formData.append(key, profileData[key]);
        }
      });
      
      const response = await fetch(`${API_BASE}/update-profile/${userId}`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  updateUserInterests: async (userId, interests) => {
    try {
      const formData = new FormData();
      formData.append('interests', interests);
      
      const response = await fetch(`${API_BASE}/update-interests/${userId}`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getUserProfile: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/user-profile/${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getUserDocuments: async (userId, limit = 20) => {
    try {
      const response = await fetch(`${API_BASE}/user-documents/${userId}?limit=${limit}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  changePassword: async (userId, currentPassword, newPassword) => {
    try {
      const formData = new FormData();
      formData.append('current_password', currentPassword);
      formData.append('new_password', newPassword);
      
      const response = await fetch(`${API_BASE}/change-password/${userId}`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  // ========== DASHBOARD & PROGRESS ==========
  getDashboardData: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/dashboard/${userId}`);
      return handleResponse(response);
    } catch (error) {
      // Return basic dashboard structure if API fails
      return {
        stats: {
          total_courses: 0,
          completed_courses: 0,
          learning_hours: 0,
          streak_days: 0,
          average_score: 0,
          points: 0,
          level: 'Beginner'
        },
        recent_courses: [],
        achievements: [],
        weekly_progress: []
      };
    }
  },

  getProgressHistory: async (userId, days = 30) => {
    try {
      const response = await fetch(`${API_BASE}/progress-history/${userId}?days=${days}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  // ========== COURSE RECOMMENDATIONS & CATEGORIES ==========
  getCategorizedCourses: async () => {
    try {
      const response = await fetch(`${API_BASE}/categorized-courses`);
      const data = await handleResponse(response);
      
      // Ensure we always return an object with categories
      if (data.success && data.categories) {
        return data;
      } else {
        // Fallback to getAllCourses and categorize locally
        const allCourses = await api.getAllCourses(100);
        if (allCourses.success && allCourses.courses) {
          const categories = categorizeCoursesLocally(allCourses.courses);
          return {
            success: true,
            categories: categories
          };
        }
        return {
          success: true,
          categories: {
            'Web Development': [],
            'Programming': [],
            'Data Science': [],
            'Mobile Development': [],
            'UI/UX Design': [],
            'Other': []
          }
        };
      }
    } catch (error) {
      console.error('Error loading categorized courses:', error);
      // Return empty categories structure
      return {
        success: true,
        categories: {
          'Web Development': [],
          'Programming': [],
          'Data Science': [],
          'Mobile Development': [],
          'UI/UX Design': [],
          'Other': []
        }
      };
    }
  },

  getCourseCategories: async () => {
    try {
      const response = await fetch(`${API_BASE}/course-categories`);
      return handleResponse(response);
    } catch (error) {
      // Return default categories if API fails
      return {
        success: true,
        categories: [
          'Web Development',
          'Programming',
          'Data Science',
          'Mobile Development',
          'UI/UX Design',
          'Cybersecurity',
          'Cloud Computing',
          'Business',
          'Other'
        ]
      };
    }
  },

  getCategoryCourses: async (category, limit = 10) => {
    try {
      const params = new URLSearchParams({
        category: encodeURIComponent(category),
        limit: limit.toString()
      });
      
      const response = await fetch(`${API_BASE}/category-courses?${params}`);
      return handleResponse(response);
    } catch (error) {
      // Return empty array if API fails
      return {
        success: true,
        courses: []
      };
    }
  },

  generateCourseRecommendations: async (userId) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      
      const response = await fetch(`${API_BASE}/generate-recommendations`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getCourseRecommendations: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/get-recommendations/${userId}`);
      return handleResponse(response);
    } catch (error) {
      // Return empty recommendations if API fails
      return {
        success: true,
        recommendations: []
      };
    }
  },

  enrollCourse: async (userId, courseId, courseTitle) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('course_id', courseId);
      formData.append('course_title', courseTitle);
      
      const response = await fetch(`${API_BASE}/enroll-course`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  updateCourseProgress: async (userId, courseId, progress, quizScore = null, timeSpent = 0) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('course_id', courseId);
      formData.append('progress', progress.toString());
      if (quizScore !== null) formData.append('quiz_score', quizScore.toString());
      formData.append('time_spent', timeSpent.toString());
      
      const response = await fetch(`${API_BASE}/update-course-progress`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getCourseProgress: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/course-progress/${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getUserCourses: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/user-courses/${userId}`);
      const data = await handleResponse(response);
      
      // Ensure we always return the expected structure
      if (data.success) {
        return {
          success: true,
          enrolled_courses: data.enrolled_courses || []
        };
      }
      return {
        success: true,
        enrolled_courses: []
      };
    } catch (error) {
      console.error('Error loading user courses:', error);
      // Return empty enrolled courses if API fails
      return {
        success: true,
        enrolled_courses: []
      };
    }
  },

  getCourseStats: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/course-stats/${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  browseCourses: async (search = '', difficulty = 'all', minRating = 0, limit = 20) => {
    try {
      const params = new URLSearchParams({
        search,
        difficulty,
        min_rating: minRating.toString(),
        limit: limit.toString()
      });
      
      const response = await fetch(`${API_BASE}/browse-courses?${params}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getSimilarCourses: async (courseTitle, limit = 5) => {
    try {
      const response = await fetch(`${API_BASE}/similar-courses/${encodeURIComponent(courseTitle)}?limit=${limit}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getAllCourses: async (limit = 5000) => {
    try {
      const response = await fetch(`${API_BASE}/all-courses?limit=${limit}`);
      const data = await handleResponse(response);
      
      // Ensure we always return the expected structure
      if (data.success) {
        return {
          success: true,
          courses: data.courses || []
        };
      }
      return {
        success: true,
        courses: []
      };
    } catch (error) {
      console.error('Error loading all courses:', error);
      // Return empty courses array if API fails
      return {
        success: true,
        courses: []
      };
    }
  },

  // ========== PDF LEARNING ==========
  uploadPDF: async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  generateFlashcards: async (documentId, topic, count, difficulty) => {
    try {
      const formData = new FormData();
      formData.append('document_id', documentId);
      if (topic) formData.append('topic', topic);
      formData.append('count', count.toString());
      formData.append('difficulty', difficulty);
      
      const response = await fetch(`${API_BASE}/flashcards`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  generateInteractiveQuiz: async (userId, documentId, topic, numQuestions, difficulty) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('document_id', documentId);
      if (topic) formData.append('topic', topic);
      formData.append('num_questions', numQuestions.toString());
      formData.append('difficulty', difficulty);
      
      const response = await fetch(`${API_BASE}/interactive-quiz`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  submitQuiz: async (userId, quizId, userAnswers, timeTaken) => {
    try {
      const formData = new FormData();
      formData.append('user_id', userId);
      formData.append('quiz_id', quizId);
      formData.append('user_answers', JSON.stringify(userAnswers));
      formData.append('time_taken', timeTaken.toString());
      
      const response = await fetch(`${API_BASE}/submit-quiz`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  generateSummary: async (documentId, style, target) => {
    try {
      const formData = new FormData();
      formData.append('document_id', documentId);
      formData.append('style', style);
      formData.append('target', target);
      
      const response = await fetch(`${API_BASE}/summary`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  generateNotes: async (documentId, depth, formatType, topic) => {
    try {
      const formData = new FormData();
      formData.append('document_id', documentId);
      formData.append('depth', depth);
      formData.append('format_type', formatType);
      if (topic) formData.append('topic', topic);
      
      const response = await fetch(`${API_BASE}/notes`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  askQuestion: async (documentId, question) => {
    try {
      const formData = new FormData();
      formData.append('document_id', documentId);
      formData.append('question', question);
      
      const response = await fetch(`${API_BASE}/qa`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  learnTopic: async (topic, level) => {
    try {
      const dummyDocumentId = "dummy_topic_learning_id";
      const formData = new FormData();
      formData.append('document_id', dummyDocumentId);
      formData.append('topic', topic);
      formData.append('level', level);
      
      const response = await fetch(`${API_BASE}/learn-topic`, {
        method: 'POST',
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  // ========== HISTORY & PROGRESS ==========
  getUserHistory: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/user-history/${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getRecentActivities: async (limit = 20) => {
    try {
      const response = await fetch(`${API_BASE}/recent-activities?limit=${limit}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  getQuizScores: async (userId) => {
    try {
      const response = await fetch(`${API_BASE}/quiz-scores/${userId}`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  // ========== DEBUG & UTILITY ==========
  debugRoutes: async () => {
    try {
      const response = await fetch(`${API_BASE}/debug/routes`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  },

  debugUsers: async () => {
    try {
      const response = await fetch(`${API_BASE}/debug/users`);
      return handleResponse(response);
    } catch (error) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
    }
  }
};

// Helper function to categorize courses locally
const categorizeCoursesLocally = (courses) => {
  const categories = {
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

    let categorized = false;

    // Check each category
    if (title.includes('web') || title.includes('html') || title.includes('css') || 
        title.includes('javascript') || title.includes('frontend') || title.includes('backend') ||
        description.includes('web') || skills.includes('web')) {
      categories['Web Development'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('python') || title.includes('java') || 
        title.includes('programming') || title.includes('coding') || 
        description.includes('programming') || skills.includes('programming'))) {
      categories['Programming'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('data') || title.includes('machine learning') || 
        title.includes('ai') || title.includes('analytics') ||
        description.includes('data science') || skills.includes('data'))) {
      categories['Data Science'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('mobile') || title.includes('android') || 
        title.includes('ios') || title.includes('react native') ||
        description.includes('mobile') || skills.includes('mobile'))) {
      categories['Mobile Development'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('design') || title.includes('ui') || 
        title.includes('ux') || title.includes('figma') ||
        description.includes('design') || skills.includes('design'))) {
      categories['UI/UX Design'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('cyber') || title.includes('security') ||
        description.includes('security') || skills.includes('security'))) {
      categories['Cybersecurity'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('cloud') || title.includes('aws') || 
        title.includes('azure') || title.includes('google cloud') ||
        description.includes('cloud') || skills.includes('cloud'))) {
      categories['Cloud Computing'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('game') || title.includes('unity') || 
        title.includes('unreal') || description.includes('game'))) {
      categories['Game Development'].push(course);
      categorized = true;
    }
    
    if (!categorized && (title.includes('business') || title.includes('marketing') || 
        title.includes('finance') || title.includes('management'))) {
      categories['Business'].push(course);
      categorized = true;
    }

    if (!categorized) {
      categories['Other'].push(course);
    }
  });

  // Remove empty categories
  Object.keys(categories).forEach(key => {
    if (categories[key].length === 0) {
      delete categories[key];
    }
  });

  return categories;
};