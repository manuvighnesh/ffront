export const API_ENDPOINTS = {
  // Auth
  SIGNUP: '/signup',
  LOGIN: '/login',
  
  // PDF Operations
  UPLOAD: '/upload',
  HEALTH: '/health',
  
  // Learning Features
  FLASHCARDS: '/flashcards',
  QUIZ: '/interactive-quiz',
  SUBMIT_QUIZ: '/submit-quiz',
  SUMMARY: '/summary',
  NOTES: '/notes',
  QA: '/qa',
  TOPIC_LEARNING: '/learn-topic',
  
  // User
  GET_USER: '/user',
  UPDATE_PROFILE: '/update-profile',
  
  // History & Progress
  USER_HISTORY: '/user-history',
  RECENT_ACTIVITIES: '/recent-activities',
  QUIZ_SCORES: '/quiz-scores',
};

export const API_BASE = 'http://localhost:8000/api';

export const DEFAULT_CONFIG = {
  headers: {
    'Accept': 'application/json',
  },
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Session expired. Please login again.',
  NOT_FOUND: 'Resource not found.',
  DEFAULT: 'Something went wrong. Please try again.',
};

export const LOADING_STATES = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};