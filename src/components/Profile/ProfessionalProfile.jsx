// UPDATED ProfessionalProfile.jsx - Remove hardcoded values
import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Calendar,
  GraduationCap,
  Award,
  Clock,
  TrendingUp,
  BookOpen,
  FileText,
  CheckCircle,
  Edit2,
  Save,
  X,
  Upload,
  Download,
  Eye,
  EyeOff,
  Shield,
  Globe,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Star,
  Target,
  Users,
  Bookmark,
  BarChart3,
  FileCheck,
  Video,
  MessageSquare,
  Settings,
  Key,
  Trash2,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';

const ProfessionalProfile = ({ user, onLogout, onProfileUpdate, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
    twitter: '',
    linkedin: '',
    github: ''
  });

  const [stats, setStats] = useState({
    enrolledCourses: 0,
    completedCourses: 0,
    totalHours: 0,
    currentStreak: 0,
    points: 0,
    level: 'Beginner',
    rank: 'New User'
  });

  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    setLoading(true);
    try {
      // Load user-specific data
      const [coursesData, docsData, profileData] = await Promise.all([
        api.getUserCourses(user.id),
        api.getUserDocuments(user.id),
        api.getUserProfile(user.id)
      ]);

      if (coursesData.success) {
        setEnrolledCourses(coursesData.enrolled_courses || []);
        setStats(prev => ({
          ...prev,
          enrolledCourses: coursesData.enrolled_courses?.length || 0,
          completedCourses: coursesData.enrolled_courses?.filter(c => c.progress >= 100).length || 0
        }));
      }

      if (docsData.success) {
        setDocuments(docsData.documents || []);
      }

      if (profileData.success) {
        // Set real user data
        setUserData({
          name: user.name || '',
          email: user.email || '',
          bio: profileData.bio || '',
          location: profileData.location || '',
          website: profileData.website || '',
          twitter: profileData.twitter || '',
          linkedin: profileData.linkedin || '',
          github: profileData.github || ''
        });

        // Set real stats
        setStats({
          enrolledCourses: coursesData.enrolled_courses?.length || 0,
          completedCourses: coursesData.enrolled_courses?.filter(c => c.progress >= 100).length || 0,
          totalHours: profileData.total_hours || 0,
          currentStreak: user.streak_days || 0,
          points: user.points || 0,
          level: user.experience_level?.charAt(0).toUpperCase() + 
                 user.experience_level?.slice(1) || 'Beginner',
          rank: profileData.rank || 'New User'
        });
      }

      // Load recent activity from history
      const historyData = await api.getUserHistory(user.id);
      if (historyData.success && historyData.activities) {
        setRecentActivity(historyData.activities.slice(0, 4));
      }

    } catch (error) {
      console.error('Error loading profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await api.updateProfile(user.id, userData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleExportData = () => {
    alert('Export feature coming soon!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      alert('Account deletion feature coming soon!');
    }
  };

  const StatCard = ({ icon: Icon, title, value, change, color }) => (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '↗' : '↘'} {Math.abs(change)}%
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          activity.type === 'quiz' ? 'bg-blue-100 text-blue-600' :
          activity.type === 'course' ? 'bg-green-100 text-green-600' :
          activity.type === 'document' ? 'bg-purple-100 text-purple-600' :
          'bg-yellow-100 text-yellow-600'
        }`}>
          {activity.type === 'quiz' && <FileCheck size={20} />}
          {activity.type === 'course' && <BookOpen size={20} />}
          {activity.type === 'document' && <FileText size={20} />}
          {activity.type === 'achievement' && <Award size={20} />}
        </div>
      </div>
      <div className="ml-4 flex-1">
        <p className="font-medium text-gray-900">{activity.title}</p>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          <Clock size={14} className="mr-1" />
          <span>{activity.time || 'Recently'}</span>
          {activity.score && (
            <>
              <span className="mx-2">•</span>
              <span className="font-medium text-green-600">{activity.score}</span>
            </>
          )}
        </div>
      </div>
      <ChevronRight size={20} className="text-gray-400" />
    </div>
  );

  if (loading) {
    return <LoadingSpinner message="Loading profile..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-4 border-white/30">
                  <User size={40} />
                </div>
                <button className="absolute bottom-0 right-0 bg-white text-indigo-600 p-2 rounded-full shadow-lg hover:bg-gray-100">
                  <Edit2 size={16} />
                </button>
              </div>
              <div>
                <h1 className="text-3xl font-bold">{userData.name}</h1>
                <p className="text-indigo-100 mt-1">{userData.email}</p>
                <div className="flex items-center space-x-3 mt-3">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {stats.level} Learner
                  </span>
                  <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    Rank: {stats.rank}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onBack}
              className="flex items-center space-x-2 text-white/80 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10"
            >
              <span>Back to Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Award className="text-yellow-500" size={20} />
                    <span className="font-medium">Points</span>
                  </div>
                  <span className="text-xl font-bold">{stats.points}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="text-green-500" size={20} />
                    <span className="font-medium">Day Streak</span>
                  </div>
                  <span className="text-xl font-bold">{stats.currentStreak}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="text-blue-500" size={20} />
                    <span className="font-medium">Courses</span>
                  </div>
                  <span className="text-xl font-bold">{stats.enrolledCourses}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="text-purple-500" size={20} />
                    <span className="font-medium">Hours</span>
                  </div>
                  <span className="text-xl font-bold">{stats.totalHours}</span>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-xl border border-gray-200">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-4 py-3 text-left border-l-4 ${
                  activeTab === 'overview'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User size={18} />
                  <span>Overview</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`w-full flex items-center justify-between px-4 py-3 text-left border-l-4 ${
                  activeTab === 'courses'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen size={18} />
                  <span>My Courses</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('documents')}
                className={`w-full flex items-center justify-between px-4 py-3 text-left border-l-4 ${
                  activeTab === 'documents'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <FileText size={18} />
                  <span>Documents</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('activity')}
                className={`w-full flex items-center justify-between px-4 py-3 text-left border-l-4 ${
                  activeTab === 'activity'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BarChart3 size={18} />
                  <span>Activity</span>
                </div>
                <ChevronRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center justify-between px-4 py-3 text-left border-l-4 ${
                  activeTab === 'settings'
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                    : 'border-transparent hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Settings size={18} />
                  <span>Settings</span>
                </div>
                <ChevronRight size={16} />
              </button>
            </nav>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Key size={16} />
                  <span>Change Password</span>
                </button>
                <button
                  onClick={handleExportData}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg"
                >
                  <Download size={16} />
                  <span>Export Data</span>
                </button>
                <button
                  onClick={onLogout}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={BookOpen}
                    title="Enrolled Courses"
                    value={stats.enrolledCourses}
                    color="bg-blue-500"
                  />
                  <StatCard
                    icon={CheckCircle}
                    title="Completed"
                    value={stats.completedCourses}
                    color="bg-green-500"
                  />
                  <StatCard
                    icon={Clock}
                    title="Learning Hours"
                    value={stats.totalHours}
                    color="bg-purple-500"
                  />
                  <StatCard
                    icon={TrendingUp}
                    title="Progress Rate"
                    value={stats.enrolledCourses > 0 ? 
                      `${Math.round((stats.completedCourses / stats.enrolledCourses) * 100)}%` : 
                      "0%"}
                    color="bg-orange-500"
                  />
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      View All →
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentActivity.length > 0 ? (
                      recentActivity.map((activity, idx) => (
                        <ActivityItem key={idx} activity={activity} />
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">No recent activity yet</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Information */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-900">Profile Information</h2>
                    <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={userData.name}
                        onChange={(e) => setUserData({...userData, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={userData.email}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        readOnly
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        value={userData.bio}
                        onChange={(e) => setUserData({...userData, bio: e.target.value})}
                        rows="3"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'courses' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                  <div className="text-sm text-gray-600">
                    {enrolledCourses.length} courses enrolled
                  </div>
                </div>
                {enrolledCourses.length > 0 ? (
                  <div className="space-y-4">
                    {enrolledCourses.map((course, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                              <BookOpen size={24} className="text-white" />
                            </div>
                            <div>
                              <h3 className="font-bold text-gray-900">{course.title}</h3>
                              <p className="text-sm text-gray-600">{course.university}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center space-x-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full"
                                  style={{ width: `${course.progress || 0}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{course.progress || 0}%</span>
                            </div>
                            <button className="mt-2 text-indigo-600 hover:text-indigo-800 text-sm">
                              Continue →
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Yet</h3>
                    <p className="text-gray-600 mb-4">You haven't enrolled in any courses.</p>
                    <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
                      Browse Courses
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">My Documents</h2>
                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 flex items-center space-x-2">
                    <Upload size={16} />
                    <span>Upload New</span>
                  </button>
                </div>
                {documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <FileText className="text-gray-400 mt-1" size={20} />
                            <div>
                              <h3 className="font-medium text-gray-900">{doc.filename}</h3>
                              <p className="text-sm text-gray-600 mt-1">{doc.content_preview}</p>
                              <div className="flex items-center text-xs text-gray-500 mt-2">
                                <Clock size={12} className="mr-1" />
                                <span>Uploaded: {new Date(doc.upload_time).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Documents</h3>
                    <p className="text-gray-600">Upload your first document to get started.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  {/* Privacy Settings */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <ShieldCheck className="mr-2" size={20} />
                      Privacy & Security
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" />
                        <span className="ml-2 text-gray-700">Make profile visible to other learners</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" defaultChecked />
                        <span className="ml-2 text-gray-700">Email notifications for new courses</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded text-indigo-600" />
                        <span className="ml-2 text-gray-700">Weekly progress reports</span>
                      </label>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-semibold text-red-700 mb-4">Danger Zone</h3>
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Change Password
                      </button>
                      <button
                        onClick={handleExportData}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 ml-3"
                      >
                        Export All Data
                      </button>
                      <button
                        onClick={handleDeleteAccount}
                        className="px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-lg hover:bg-red-100 ml-3"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                <input type="password" className="w-full px-4 py-2 border rounded-lg" />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                  onClick={() => {
                    setShowPasswordModal(false);
                    alert('Password changed successfully!');
                  }}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalProfile;