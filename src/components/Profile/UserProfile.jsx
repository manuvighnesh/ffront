import React, { useState, useEffect } from 'react';
import { 
  User, Mail, Calendar, GraduationCap, Lock, Edit2, 
  Save, X, Eye, EyeOff, BookOpen, FileText, History,
  Award, Clock, TrendingUp, Upload, ChevronRight, CheckCircle,
  ArrowLeft, ExternalLink
} from 'lucide-react';
import { api } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';

const UserProfile = ({ user: initialUser, onLogout, onProfileUpdate, onBack }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    age: user?.age || '',
    education_level: user?.education_level || 'high_school',
    experience_level: user?.experience_level || 'beginner',
    interests: user?.interests?.join(', ') || '',
    learning_goals: user?.learning_goals?.join(', ') || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState(null);
  
  const interestOptions = [
    'Programming', 'Java', 'Python', 'JavaScript', 'Web Development',
    'Machine Learning', 'Data Science', 'Artificial Intelligence',
    'Mobile Development', 'Database Management', 'Cloud Computing',
    'Cybersecurity', 'UI/UX Design', 'Game Development', 'DevOps',
    'Software Engineering', 'Computer Science', 'Mathematics',
    'Physics', 'Chemistry', 'Biology', 'Business', 'Finance',
    'Marketing', 'Psychology', 'History', 'Literature', 'Languages'
  ];
  
  const educationOptions = [
    { value: 'high_school', label: 'High School' },
    { value: 'undergraduate', label: 'Undergraduate' },
    { value: 'graduate', label: 'Graduate' },
    { value: 'phd', label: 'PhD' },
    { value: 'professional', label: 'Professional' },
    { value: 'other', label: 'Other' }
  ];
  
  const experienceOptions = [
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];
  
  useEffect(() => {
    if (user?.id) {
      loadProfileData();
    }
  }, [user?.id]);
  
  const loadProfileData = async () => {
    setLoading(true);
    try {
      const profileData = await api.getUserProfile(user.id);
      
      if (profileData.success) {
        setEnrolledCourses(profileData.enrolled_courses || []);
        setDocuments(profileData.documents || []);
        setHistory(profileData.history || []);
        setStats(profileData.stats || {});
      }
      
      const coursesData = await api.getUserCourses(user.id);
      if (coursesData.success) {
        setEnrolledCourses(coursesData.enrolled_courses || []);
      }
      
    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleEditToggle = () => {
    if (editMode) {
      setFormData({
        name: user?.name || '',
        email: user?.email || '',
        age: user?.age || '',
        education_level: user?.education_level || 'high_school',
        experience_level: user?.experience_level || 'beginner',
        interests: user?.interests?.join(', ') || '',
        learning_goals: user?.learning_goals?.join(', ') || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    setEditMode(!editMode);
  };
  
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleInterestSelect = (interest) => {
    const currentInterests = formData.interests.split(',').map(i => i.trim()).filter(i => i);
    if (!currentInterests.includes(interest)) {
      const newInterests = [...currentInterests, interest].join(', ');
      handleInputChange('interests', newInterests);
    }
  };
  
  const handleSaveProfile = async () => {
    if (!validateForm()) return;
    
    setSaving(true);
    try {
      const profileData = {
        name: formData.name,
        age: formData.age,
        education_level: formData.education_level,
        learning_goals: formData.learning_goals,
        interests: formData.interests,
        experience_level: formData.experience_level
      };
      
      const updatedUser = await api.updateProfile(user.id, profileData);
      
      if (formData.newPassword && formData.confirmPassword) {
        await api.changePassword(user.id, formData.currentPassword, formData.newPassword);
      }
      
      const newUserData = {
        ...user,
        ...updatedUser.user,
        interests: updatedUser.user.interests || formData.interests.split(',').map(i => i.trim()).filter(i => i)
      };
      
      setUser(newUserData);
      if (onProfileUpdate) {
        onProfileUpdate(newUserData);
      }
      
      setEditMode(false);
      alert('Profile updated successfully!');
      
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };
  
  const validateForm = () => {
    if (!formData.name.trim()) {
      alert('Name is required');
      return false;
    }
    
    if (!formData.email.trim()) {
      alert('Email is required');
      return false;
    }
    
    if (formData.newPassword || formData.confirmPassword) {
      if (!formData.currentPassword) {
        alert('Current password is required to change password');
        return false;
      }
      
      if (formData.newPassword.length < 6) {
        alert('New password must be at least 6 characters long');
        return false;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        alert('New passwords do not match');
        return false;
      }
    }
    
    return true;
  };
  
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch {
      return 'Unknown date';
    }
  };
  
  const handleCourseClick = (course) => {
    if (course.url && course.url !== '#') {
      window.open(course.url, '_blank');
    }
  };
  
  if (loading) {
    return <LoadingSpinner message="Loading profile data..." />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              {/* Updated Back Button */}
              <button
                onClick={onBack}
                className="flex items-center text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </button>
              <div className="flex items-center space-x-3">
                <User className="w-8 h-8 text-indigo-600" />
                <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {editMode ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveProfile}
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 flex items-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-indigo-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">{user?.name}</h2>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <div className="mt-2">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {user?.experience_level || 'Beginner'}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Enrolled Courses</span>
                  </div>
                  <span className="font-bold text-gray-900">{enrolledCourses.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Points</span>
                  </div>
                  <span className="font-bold text-gray-900">{user?.points || 0}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-500 mr-3" />
                    <span className="text-gray-700">Streak</span>
                  </div>
                  <span className="font-bold text-gray-900">{user?.streak_days || 0} days</span>
                </div>
              </div>
            </div>
            
            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <User className="w-5 h-5 mr-3" />
                    <span>Profile Info</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setActiveTab('courses')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'courses' 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <BookOpen className="w-5 h-5 mr-3" />
                    <span>My Courses</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setActiveTab('documents')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'documents' 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 mr-3" />
                    <span>My Documents</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => setActiveTab('history')}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'history' 
                      ? 'bg-indigo-50 text-indigo-700 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <History className="w-5 h-5 mr-3" />
                    <span>Learning History</span>
                  </div>
                  <ChevronRight className="w-4 h-4" />
                </button>
                
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                >
                  <div className="flex items-center">
                    <span>Logout</span>
                  </div>
                </button>
              </nav>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Info Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        />
                      ) : (
                        <div className="p-2 border border-transparent rounded">{user?.name}</div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <div className="flex items-center p-2">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-gray-900">{user?.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age
                      </label>
                      {editMode ? (
                        <input
                          type="number"
                          value={formData.age}
                          onChange={(e) => handleInputChange('age', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          min="10"
                          max="100"
                        />
                      ) : (
                        <div className="p-2 border border-transparent rounded">
                          {user?.age || 'Not specified'}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education Level
                      </label>
                      {editMode ? (
                        <select
                          value={formData.education_level}
                          onChange={(e) => handleInputChange('education_level', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          {educationOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="p-2 border border-transparent rounded">
                          {educationOptions.find(opt => opt.value === user?.education_level)?.label || 'Not specified'}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Experience Level
                      </label>
                      {editMode ? (
                        <select
                          value={formData.experience_level}
                          onChange={(e) => handleInputChange('experience_level', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        >
                          {experienceOptions.map(option => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <div className="p-2 border border-transparent rounded">
                          {user?.experience_level?.charAt(0).toUpperCase() + user?.experience_level?.slice(1) || 'Beginner'}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Interests Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Learning Interests & Goals
                  </h3>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interests
                      </label>
                      {editMode ? (
                        <>
                          <textarea
                            value={formData.interests}
                            onChange={(e) => handleInputChange('interests', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 mb-3"
                            rows="2"
                            placeholder="Enter your interests separated by commas..."
                          />
                          <div className="mb-4">
                            <p className="text-sm font-medium text-gray-700 mb-2">Quick Select:</p>
                            <div className="flex flex-wrap gap-2">
                              {interestOptions.map(interest => (
                                <button
                                  key={interest}
                                  type="button"
                                  onClick={() => handleInterestSelect(interest)}
                                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors"
                                >
                                  {interest}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                          {user?.interests?.length > 0 ? (
                            user.interests.map((interest, index) => (
                              <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {interest}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">No interests specified</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Learning Goals
                      </label>
                      {editMode ? (
                        <textarea
                          value={formData.learning_goals}
                          onChange={(e) => handleInputChange('learning_goals', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                          rows="2"
                          placeholder="Enter your learning goals separated by commas..."
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg">
                          {user?.learning_goals?.length > 0 ? (
                            user.learning_goals.map((goal, index) => (
                              <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                {goal}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-500">No learning goals specified</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Password Change Card (Only in edit mode) */}
                {editMode && (
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                      <Lock className="w-5 h-5 mr-2" />
                      Change Password
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <div className="relative">
                          <input
                            type={showPassword ? "text" : "password"}
                            value={formData.currentPassword}
                            onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter current password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                          </label>
                          <input
                            type="password"
                            value={formData.newPassword}
                            onChange={(e) => handleInputChange('newPassword', e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter new password"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                              formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                                ? 'border-red-300'
                                : 'border-gray-300'
                            }`}
                            placeholder="Confirm new password"
                          />
                          {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-gray-500 mt-2">
                        Leave password fields empty if you don't want to change your password.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'courses' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2" />
                  My Enrolled Courses
                </h3>
                
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-6">
                    {enrolledCourses.map((course, index) => (
                      <div 
                        key={index} 
                        className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                        onClick={() => handleCourseClick(course)}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 text-lg mb-2 hover:text-indigo-600">
                              {course.title}
                              <ExternalLink className="w-4 h-4 inline ml-2" />
                            </h4>
                            <div className="flex items-center text-gray-600 text-sm mb-3">
                              <GraduationCap className="w-4 h-4 mr-2" />
                              <span>{course.university || 'Various Universities'}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded text-sm">
                              <span className="font-bold">{course.rating?.toFixed(1) || 'N/A'}</span>
                            </div>
                            {course.completed ? (
                              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm flex items-center">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </span>
                            ) : (
                              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                                {course.progress || 0}% Complete
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {course.difficulty || 'All Levels'}
                          </span>
                          {course.match_score && (
                            <span className="ml-2 px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs">
                              {Math.round((course.match_score || 0) * 100)}% match
                            </span>
                          )}
                        </div>
                        
                        <p className="text-gray-700 text-sm mb-4">
                          {course.description || 'No description available.'}
                        </p>
                        
                        {course.skills && (
                          <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Skills you'll learn:</p>
                            <div className="flex flex-wrap gap-1">
                              {course.skills.split(',').slice(0, 3).map((skill, idx) => (
                                <span key={idx} className="px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded">
                                  {skill.trim()}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>Enrolled: {formatDate(course.enrolled_at)}</span>
                          <span>Click to open course</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Courses Enrolled</h4>
                    <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
                    <button
                      onClick={() => window.location.href = '/'}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'documents' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  My Uploaded Documents
                </h3>
                
                {documents.length > 0 ? (
                  <div className="space-y-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{doc.filename}</h4>
                            <p className="text-sm text-gray-600 mb-2">{doc.content_preview}</p>
                            <div className="flex items-center text-xs text-gray-500">
                              <Upload className="w-3 h-3 mr-1" />
                              <span>Uploaded: {formatDate(doc.upload_time)}</span>
                              <span className="mx-2">•</span>
                              <span>{doc.size ? `${Math.round(doc.size / 1024)} KB` : 'Size unknown'}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              window.location.href = `/pdf-learning?document=${doc.id}`;
                            }}
                            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                          >
                            Open →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Documents Uploaded</h4>
                    <p className="text-gray-600 mb-4">You haven't uploaded any PDF documents yet.</p>
                    <button
                      onClick={() => window.location.href = '/pdf-learning'}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
                    >
                      Upload PDF
                    </button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'history' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
                  <History className="w-5 h-5 mr-2" />
                  Learning History
                </h3>
                
                {history.length > 0 ? (
                  <div className="space-y-4">
                    {history.slice(0, 20).map((activity, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-bold text-gray-900 capitalize">
                              {activity.feature?.replace('_', ' ') || 'Activity'}
                            </h4>
                            {activity.topic && (
                              <span className="text-sm text-gray-600">Topic: {activity.topic}</span>
                            )}
                          </div>
                          <span className="text-xs text-gray-500">
                            {formatDate(activity.created_at)}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-700 mb-2">
                          {activity.output}
                        </div>
                        
                        <div className="flex items-center text-xs text-gray-500">
                          <span className="capitalize">{activity.feature}</span>
                          {activity.difficulty && (
                            <>
                              <span className="mx-2">•</span>
                              <span>{activity.difficulty}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">No Learning History</h4>
                    <p className="text-gray-600">Your learning activities will appear here.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;