// // UPDATED ProfessionalSidebar.jsx - Fixed gap and added Browse Courses
// import React, { useState } from 'react';
// import {
//   LayoutDashboard,
//   FileText,
//   Brain,
//   BookOpen,
//   User,
//   Settings,
//   HelpCircle,
//   LogOut,
//   ChevronLeft,
//   ChevronRight,
//   Award,
//   Clock,
//   TrendingUp,
//   Compass,
//   Sparkles
// } from 'lucide-react';

// const ProfessionalSidebar = ({ 
//   user, 
//   activeView, 
//   onViewChange, 
//   onLogout,
//   onProfileClick,
//   collapsed = false,
//   onToggleCollapse 
// }) => {
//   const [hoveredItem, setHoveredItem] = useState(null);

//   const menuItems = [
//     {
//       id: 'dashboard',
//       label: 'Dashboard',
//       icon: LayoutDashboard,
//       description: 'Overview & Analytics'
//     },
//     {
//       id: 'pdf-learning',
//       label: 'PDF Learning',
//       icon: FileText,
//       description: 'Upload & Analyze Documents'
//     },
//     {
//       id: 'topic-learning',
//       label: 'Topic Learning',
//       icon: Brain,
//       description: 'Explore Any Topic'
//     },
//     {
//       id: 'courses',
//       label: 'My Courses',
//       icon: BookOpen,
//       description: 'Enrolled & Recommended'
//     },
//     {
//       id: 'progress',
//       label: 'Progress',
//       icon: TrendingUp,
//       description: 'Track Your Learning'
//     },
//     {
//       id: 'achievements',
//       label: 'Achievements',
//       icon: Award,
//       description: 'Badges & Milestones'
//     },
//     {
//       id: 'browse-courses',
//       label: 'Browse Courses',
//       icon: Compass,
//       description: 'Discover New Courses',
//       highlight: true
//     }
//   ];

//   const bottomItems = [
//     {
//       id: 'profile',
//       label: 'Profile',
//       icon: User,
//       action: onProfileClick
//     },
//     {
//       id: 'help',
//       label: 'Help & Support',
//       icon: HelpCircle,
//       action: () => window.open('/help', '_blank')
//     },
//     {
//       id: 'settings',
//       label: 'Settings',
//       icon: Settings,
//       action: () => onViewChange('settings')
//     }
//   ];

//   return (
//     <div 
//       className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-2xl sticky top-0 ${
//         collapsed ? 'w-20' : 'w-64'
//       }`}
//     >
//       {/* Collapse Toggle Button */}
//       <button
//         onClick={onToggleCollapse}
//         className="absolute -right-3 top-6 bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-full border-2 border-gray-900 z-10 shadow-lg"
//         aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
//       >
//         {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//       </button>

//       {/* Logo & Platform Name */}
//       <div className="p-4 border-b border-gray-700">
//         <div className="flex items-center space-x-3">
//           <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
//             <BookOpen size={24} />
//           </div>
//           {!collapsed && (
//             <div>
//               <h1 className="text-xl font-bold">LearnAssist</h1>
//               <p className="text-xs text-gray-400">AI Learning Platform</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* User Profile Summary */}
//       {!collapsed && user && (
//         <div className="p-4 border-b border-gray-700">
//           <div className="flex items-center space-x-3">
//             <div className="relative">
//               <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
//                 <span className="font-bold text-white">
//                   {user.name?.charAt(0).toUpperCase()}
//                 </span>
//               </div>
//               <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
//             </div>
//             <div className="flex-1 min-w-0">
//               <p className="font-medium truncate">{user.name}</p>
//               <p className="text-xs text-gray-400 truncate">{user.email}</p>
//             </div>
//           </div>
//           <div className="mt-3 grid grid-cols-2 gap-2">
//             <div className="text-center">
//               <div className="flex items-center justify-center space-x-1">
//                 <Award size={12} className="text-yellow-400" />
//                 <span className="text-sm font-bold">{user.points || 0}</span>
//               </div>
//               <span className="text-xs text-gray-400">Points</span>
//             </div>
//             <div className="text-center">
//               <div className="flex items-center justify-center space-x-1">
//                 <Clock size={12} className="text-green-400" />
//                 <span className="text-sm font-bold">{user.streak_days || 0}</span>
//               </div>
//               <span className="text-xs text-gray-400">Day Streak</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Main Navigation */}
//       <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
//         {menuItems.map((item) => {
//           const Icon = item.icon;
//           const isActive = activeView === item.id;
          
//           return (
//             <button
//               key={item.id}
//               onClick={() => onViewChange(item.id)}
//               onMouseEnter={() => setHoveredItem(item.id)}
//               onMouseLeave={() => setHoveredItem(null)}
//               className={`w-full flex items-center rounded-lg transition-all duration-200 ${
//                 item.highlight ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' :
//                 isActive
//                   ? 'bg-indigo-600 text-white shadow-lg'
//                   : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
//               } ${
//                 collapsed ? 'justify-center p-3' : 'px-3 py-3 space-x-3'
//               }`}
//             >
//               <div className="relative">
//                 <Icon size={20} />
//                 {isActive && !item.highlight && (
//                   <div className="absolute -right-1 -top-1 w-2 h-2 bg-white rounded-full"></div>
//                 )}
//                 {item.highlight && (
//                   <Sparkles className="absolute -right-1 -top-1 w-3 h-3 text-yellow-300" />
//                 )}
//               </div>
              
//               {!collapsed && (
//                 <div className="flex-1 text-left">
//                   <span className="font-medium">{item.label}</span>
//                   <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
//                 </div>
//               )}

//               {/* Hover Tooltip for collapsed state */}
//               {collapsed && hoveredItem === item.id && (
//                 <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 whitespace-nowrap">
//                   <div className="font-medium">{item.label}</div>
//                   <div className="text-xs text-gray-300">{item.description}</div>
//                 </div>
//               )}
//             </button>
//           );
//         })}
//       </nav>

//       {/* Bottom Navigation */}
//       <div className="p-3 border-t border-gray-700 space-y-1">
//         {bottomItems.map((item) => {
//           const Icon = item.icon;
          
//           return (
//             <button
//               key={item.id}
//               onClick={item.action}
//               onMouseEnter={() => setHoveredItem(item.id)}
//               onMouseLeave={() => setHoveredItem(null)}
//               className={`w-full flex items-center rounded-lg transition-all duration-200 hover:bg-gray-700/50 text-gray-300 hover:text-white ${
//                 collapsed ? 'justify-center p-3' : 'px-3 py-3 space-x-3'
//               }`}
//             >
//               <Icon size={20} />
              
//               {!collapsed && (
//                 <span className="font-medium">{item.label}</span>
//               )}

//               {/* Hover Tooltip for collapsed state */}
//               {collapsed && hoveredItem === item.id && (
//                 <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50">
//                   {item.label}
//                 </div>
//               )}
//             </button>
//           );
//         })}

//         {/* Logout Button */}
//         <button
//           onClick={onLogout}
//           onMouseEnter={() => setHoveredItem('logout')}
//           onMouseLeave={() => setHoveredItem(null)}
//           className={`w-full flex items-center rounded-lg transition-all duration-200 hover:bg-red-900/30 text-red-400 hover:text-red-300 ${
//             collapsed ? 'justify-center p-3' : 'px-3 py-3 space-x-3'
//           }`}
//         >
//           <LogOut size={20} />
          
//           {!collapsed && (
//             <span className="font-medium">Logout</span>
//           )}

//           {/* Hover Tooltip for collapsed state */}
//           {collapsed && hoveredItem === 'logout' && (
//             <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50">
//               Logout
//             </div>
//           )}
//         </button>
//       </div>

//       {/* Version Info */}
//       {!collapsed && (
//         <div className="p-3 text-center border-t border-gray-700">
//           <p className="text-xs text-gray-500">v2.0.0 • LearnAssist Pro</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfessionalSidebar;

// UPDATED ProfessionalSidebar.jsx - Added Resume Learning button
import React, { useState } from 'react';
import {
  LayoutDashboard,
  FileText,
  Brain,
  BookOpen,
  User,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Award,
  Clock,
  TrendingUp,
  Compass,
  Sparkles,
  PlayCircle
} from 'lucide-react';

const ProfessionalSidebar = ({ 
  user, 
  activeView, 
  onViewChange, 
  onLogout,
  onProfileClick,
  collapsed = false,
  onToggleCollapse 
}) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      id: 'resume-learning',
      label: 'Resume Learning',
      icon: PlayCircle,
      description: 'Continue from last session',
      highlight: true
    },
    {
      id: 'pdf-learning',
      label: 'PDF Learning',
      icon: FileText,
      description: 'Upload & Analyze Documents'
    },
    {
      id: 'topic-learning',
      label: 'Topic Learning',
      icon: Brain,
      description: 'Explore Any Topic'
    },
    {
      id: 'courses',
      label: 'My Courses',
      icon: BookOpen,
      description: 'Enrolled & Recommended'
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: TrendingUp,
      description: 'Track Your Learning'
    },
    {
      id: 'achievements',
      label: 'Achievements',
      icon: Award,
      description: 'Badges & Milestones'
    },
    {
      id: 'browse-courses',
      label: 'Browse Courses',
      icon: Compass,
      description: 'Discover New Courses'
    }
  ];

  const bottomItems = [
    {
      id: 'profile',
      label: 'Profile',
      icon: User,
      action: onProfileClick
    },
    {
      id: 'help',
      label: 'Help & Support',
      icon: HelpCircle,
      action: () => window.open('/help', '_blank')
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      action: () => onViewChange('settings')
    }
  ];

  return (
    <div 
      className={`h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-300 flex flex-col shadow-2xl sticky top-0 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggleCollapse}
        className="absolute -right-3 top-6 bg-gray-800 hover:bg-gray-700 text-white p-1.5 rounded-full border-2 border-gray-900 z-10 shadow-lg"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* Logo & Platform Name */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
            <BookOpen size={24} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold">LearnAssist</h1>
              <p className="text-xs text-gray-400">AI Learning Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* User Profile Summary */}
      {!collapsed && user && (
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="font-bold text-white">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name || 'User'}</p>
              <p className="text-xs text-gray-400 truncate">{user.email || 'user@example.com'}</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Award size={12} className="text-yellow-400" />
                <span className="text-sm font-bold">{user.points || 0}</span>
              </div>
              <span className="text-xs text-gray-400">Points</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1">
                <Clock size={12} className="text-green-400" />
                <span className="text-sm font-bold">{user.streak_days || 0}</span>
              </div>
              <span className="text-xs text-gray-400">Day Streak</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 ${
                item.highlight ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg' :
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'hover:bg-gray-700/50 text-gray-300 hover:text-white'
              } ${
                collapsed ? 'justify-center p-3' : 'px-3 py-3 space-x-3'
              }`}
            >
              <div className="relative">
                <Icon size={20} />
                {isActive && !item.highlight && (
                  <div className="absolute -right-1 -top-1 w-2 h-2 bg-white rounded-full"></div>
                )}
                {item.highlight && (
                  <Sparkles className="absolute -right-1 -top-1 w-3 h-3 text-yellow-300" />
                )}
              </div>
              
              {!collapsed && (
                <div className="flex-1 text-left">
                  <span className="font-medium">{item.label}</span>
                  <p className="text-xs text-gray-400 mt-0.5">{item.description}</p>
                </div>
              )}

              {/* Hover Tooltip for collapsed state */}
              {collapsed && hoveredItem === item.id && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50 whitespace-nowrap">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-gray-300">{item.description}</div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-gray-700 space-y-1">
        {bottomItems.map((item) => {
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={item.action}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`w-full flex items-center rounded-lg transition-all duration-200 hover:bg-gray-700/50 text-gray-300 hover:text-white ${
                collapsed ? 'justify-center p-3' : 'px-3 py-3 space-x-3'
              }`}
            >
              <Icon size={20} />
              
              {!collapsed && (
                <span className="font-medium">{item.label}</span>
              )}

              {/* Hover Tooltip for collapsed state */}
              {collapsed && hoveredItem === item.id && (
                <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}

        {/* Logout Button */}
        <button
          onClick={onLogout}
          onMouseEnter={() => setHoveredItem('logout')}
          onMouseLeave={() => setHoveredItem(null)}
          className={`w-full flex items-center rounded-lg transition-all duration-200 hover:bg-red-900/30 text-red-400 hover:text-red-300 ${
            collapsed ? 'justify-center p-3' : 'px-3 py-3 space-x-3'
          }`}
        >
          <LogOut size={20} />
          
          {!collapsed && (
            <span className="font-medium">Logout</span>
          )}

          {/* Hover Tooltip for collapsed state */}
          {collapsed && hoveredItem === 'logout' && (
            <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-xl z-50">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Version Info */}
      {!collapsed && (
        <div className="p-3 text-center border-t border-gray-700">
          <p className="text-xs text-gray-500">v2.0.0 • LearnAssist Pro</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalSidebar;