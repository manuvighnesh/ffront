// // src/components/Layout/ProfessionalHeader.jsx - NEW FILE
// import React, { useState } from 'react';
// import {
//   Search,
//   Bell,
//   Moon,
//   Sun,
//   HelpCircle,
//   Settings,
//   User,
//   ChevronDown,
//   LogOut
// } from 'lucide-react';

// const ProfessionalHeader = ({ 
//   user, 
//   title, 
//   subtitle,
//   onSearch,
//   onNotificationClick,
//   onProfileClick,
//   onLogout
// }) => {
//   const [darkMode, setDarkMode] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (onSearch && searchQuery.trim()) {
//       onSearch(searchQuery);
//     }
//   };

//   return (
//     <header className="bg-white border-b border-gray-200 shadow-sm">
//       <div className="px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Left Section - Title & Breadcrumb */}
//           <div className="flex-1">
//             <div className="flex items-center space-x-3">
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
//                 {subtitle && (
//                   <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Right Section - Actions */}
//           <div className="flex items-center space-x-4">
//             {/* Search Bar */}
//             <form onSubmit={handleSearch} className="relative">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder="Search courses, topics..."
//                   className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-gray-50"
//                 />
//               </div>
//             </form>

//             {/* Dark Mode Toggle */}
//             <button
//               onClick={() => setDarkMode(!darkMode)}
//               className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//               aria-label="Toggle dark mode"
//             >
//               {darkMode ? <Sun size={20} /> : <Moon size={20} />}
//             </button>

//             {/* Help */}
//             <button
//               onClick={() => window.open('/help', '_blank')}
//               className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//               aria-label="Help"
//             >
//               <HelpCircle size={20} />
//             </button>

//             {/* Settings */}
//             <button
//               onClick={() => window.location.href = '/settings'}
//               className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//               aria-label="Settings"
//             >
//               <Settings size={20} />
//             </button>

//             {/* Notifications */}
//             <button
//               onClick={onNotificationClick}
//               className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 relative"
//               aria-label="Notifications"
//             >
//               <Bell size={20} />
//               <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
//             </button>

//             {/* User Profile Dropdown */}
//             <div className="relative">
//               <button
//                 onClick={() => setShowUserMenu(!showUserMenu)}
//                 className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100"
//               >
//                 <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
//                   {user?.name?.charAt(0).toUpperCase()}
//                 </div>
//                 <div className="hidden md:block text-left">
//                   <p className="text-sm font-medium text-gray-900">{user?.name}</p>
//                   <p className="text-xs text-gray-500">{user?.email}</p>
//                 </div>
//                 <ChevronDown size={16} className="text-gray-500" />
//               </button>

//               {/* Dropdown Menu */}
//               {showUserMenu && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
//                   <button
//                     onClick={onProfileClick}
//                     className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
//                   >
//                     <User size={16} />
//                     <span>My Profile</span>
//                   </button>
//                   <div className="border-t border-gray-200 my-1"></div>
//                   <button
//                     onClick={onLogout}
//                     className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
//                   >
//                     <LogOut size={16} />
//                     <span>Logout</span>
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default ProfessionalHeader;


// src/components/Layout/ProfessionalHeader.jsx - UPDATED
import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  User,
  ChevronDown,
  LogOut
} from 'lucide-react';

const ProfessionalHeader = ({ 
  user, 
  title, 
  subtitle,
  onProfileClick,
  onLogout,
  darkMode = false,
  onToggleDarkMode
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showUserMenu && !event.target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserMenu]);

  const handleUserMenuToggle = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleProfileClick = () => {
    setShowUserMenu(false);
    if (onProfileClick) {
      onProfileClick();
    }
  };

  const handleLogout = () => {
    setShowUserMenu(false);
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b shadow-sm`}>
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Title & Subtitle */}
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <div>
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h1>
                {subtitle && (
                  <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{subtitle}</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun size={20} className="text-yellow-400" />
              ) : (
                <Moon size={20} />
              )}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative user-menu-container">
              <button
                onClick={handleUserMenuToggle}
                className={`flex items-center space-x-2 p-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
                aria-label="User menu"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {user?.name || 'User'}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${showUserMenu ? 'rotate-180' : ''} ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl border z-50 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700' 
                    : 'bg-white border-gray-200'
                }`}>
                  <button
                    onClick={handleProfileClick}
                    className={`w-full px-4 py-3 text-left flex items-center space-x-2 transition-colors ${
                      darkMode 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <User size={16} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                    <span>My Profile</span>
                  </button>
                  <div className={`border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}></div>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-3 text-left flex items-center space-x-2 transition-colors ${
                      darkMode 
                        ? 'text-red-400 hover:bg-gray-700' 
                        : 'text-red-600 hover:bg-red-50'
                    }`}
                  >
                    <LogOut size={16} className={darkMode ? 'text-red-400' : 'text-red-500'} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ProfessionalHeader;