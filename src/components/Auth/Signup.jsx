
// frontend/src/components/Auth/Signup.jsx
import React, { useState } from 'react';
import { GraduationCap, ArrowLeft, Check } from 'lucide-react';
import { api } from '../../services/api';

const INTERESTS_OPTIONS = [
  "Computer Science", "Mathematics", "Physics", "Chemistry", 
  "Biology", "History", "Business", "Economics", 
  "Java Programming", "Designing", "Psychology"
];

const GOALS_OPTIONS = [
  "Career Development", "Skill Enhancement", "Exam Preparation", 
  "Hobby", "Academic Research", "Certification"
];

const Signup = ({ onSignup, onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    education_level: 'high_school',
    learning_goals: [], 
    interests: [],    
    experience_level: 'beginner'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (name === 'confirmPassword' || name === 'password') {
      setPasswordError('');
    }
  };

  const toggleSelection = (field, value) => {
    setFormData(prev => {
      const currentList = prev[field];
      const isSelected = currentList.includes(value);
      const newList = isSelected 
        ? currentList.filter(item => item !== value)
        : [...currentList, value];
      return { ...prev, [field]: newList };
    });
  };

  const validatePasswords = () => {
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    if (formData.password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError('');
    setPasswordError('');
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.interests.length === 0) {
        setError('Please select at least one interest');
        return;
    }

    if (!validatePasswords()) return;

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      
      const dataToSend = {
          ...userData,
          interests: userData.interests.join(', '),
          learning_goals: userData.learning_goals.join(', ')
      };
      
      console.log("Sending signup data:", dataToSend);
      
      const data = await api.signup(dataToSend);
      
      if (data.user) {
        onSignup(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
      } else {
        throw new Error('Signup failed: No user data returned');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(`Failed to sign up: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-2xl">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Join our personalized learning platform</p>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="25"
                min="10"
                max="100"
                disabled={loading}
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="At least 6 characters"
                  required
                  disabled={loading}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    passwordError ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                  required
                  disabled={loading}
                />
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interests (Select multiple) *</label>
            <div className="flex flex-wrap gap-2">
                {INTERESTS_OPTIONS.map((interest) => (
                    <button
                        key={interest}
                        type="button"
                        onClick={() => toggleSelection('interests', interest)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                            formData.interests.includes(interest)
                                ? 'bg-indigo-600 text-white border-indigo-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                        disabled={loading}
                    >
                        {interest}
                    </button>
                ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Learning Goals (Select multiple)</label>
            <div className="flex flex-wrap gap-2">
                {GOALS_OPTIONS.map((goal) => (
                    <button
                        key={goal}
                        type="button"
                        onClick={() => toggleSelection('learning_goals', goal)}
                        className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                            formData.learning_goals.includes(goal)
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                        disabled={loading}
                    >
                        {goal}
                    </button>
                ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Education Level</label>
              <select
                name="education_level"
                value={formData.education_level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              >
                {educationOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                name="experience_level"
                value={formData.experience_level}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                disabled={loading}
              >
                {experienceOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading || formData.interests.length === 0}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
          
          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onBack}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Sign In
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;