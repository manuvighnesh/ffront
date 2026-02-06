import React, { useState } from 'react';
import { LogOut, GraduationCap, User, X } from 'lucide-react';
import { api } from '../../services/api';

const Navbar = ({ user, onLogout, title, onBack, showBack = false, onProfileUpdate }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [interests, setInterests] = useState(user?.interests?.join(', ') || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const interestOptions = [
    'Programming', 'Java', 'Python', 'JavaScript', 'Web Development',
    'Machine Learning', 'Data Science', 'Artificial Intelligence',
    'Mobile Development', 'Database Management', 'Cloud Computing',
    'Cybersecurity', 'UI/UX Design', 'Game Development', 'DevOps'
  ];

  const handleSaveProfile = async () => {
    setLoading(true);
    setSuccess('');

    try {
      await api.updateUserInterests(user.id, interests);

      if (onProfileUpdate) {
        onProfileUpdate({ interests });
      }

      setSuccess('Profile updated successfully!');
      setTimeout(() => setShowProfileModal(false), 1500);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInterestSelect = (interest) => {
    const current = interests.split(',').map(i => i.trim()).filter(Boolean);
    if (!current.includes(interest)) {
      setInterests([...current, interest].join(', '));
    }
  };

  return (
    <>
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Left Section */}
            <div className="flex items-center space-x-4">
              {showBack && (
                <button
                  onClick={onBack}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Back
                </button>
              )}

              <div className="flex items-center space-x-3">
                <GraduationCap className="w-8 h-8 text-indigo-600" />
                <h1 className="text-xl font-bold text-gray-900">
                  {title || 'Learning Assistant'}
                </h1>
              </div>
            </div>

            {/* Right Section – SIMPLE */}
            <div className="flex items-center space-x-4">
              {user && (
                <>
                  <span className="text-gray-700">Hello, {user.name}</span>
                  <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="hidden md:inline">Logout</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal (optional – still works if triggered elsewhere) */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-indigo-600" />
                  <h2 className="text-2xl font-bold">Update Interests</h2>
                </div>
                <button onClick={() => setShowProfileModal(false)}>
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {success && (
                <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg">
                  {success}
                </div>
              )}

              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full border rounded-lg p-3 mb-3"
                rows="3"
                placeholder="Enter interests separated by commas"
              />

              <div className="flex flex-wrap gap-2 mb-4">
                {interestOptions.map(i => (
                  <button
                    key={i}
                    onClick={() => handleInterestSelect(i)}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {i}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowProfileModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  disabled={loading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;