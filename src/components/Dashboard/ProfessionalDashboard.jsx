// // UPDATED ProfessionalDashboard.jsx - Fixed version with BrowseCourses component
// import React, { useState, useEffect } from 'react';
// import ProfessionalSidebar from '../Layout/ProfessionalSidebar';
// import ProfessionalHeader from '../Layout/ProfessionalHeader';
// import CourseRecommendations from '../CourseRecommendation/CourseRecommendations';
// import BrowseCourses from '../CourseRecommendation/BrowseCourses'; // UPDATED IMPORT PATH
// import { api } from '../../services/api';
// import LoadingSpinner from '../Common/LoadingSpinner';
// import {
//   TrendingUp,
//   Clock,
//   Target,
//   BookOpen,
//   Award,
//   BarChart3,
//   Calendar,
//   ChevronRight,
//   Sparkles,
//   Brain,
//   FileText,
//   CheckCircle,
//   Star,
//   Zap,
//   Rocket,
//   Compass
// } from 'lucide-react';

// const ProfessionalDashboard = ({ 
//   user, 
//   onLogout, 
//   onViewChange,
//   onProfileClick,
//   initialView = 'dashboard',
//   onProfileUpdate 
// }) => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [activeView, setActiveView] = useState(initialView);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [userStats, setUserStats] = useState({
//     points: 0,
//     streak_days: 0,
//     level: 'Beginner'
//   });

//   useEffect(() => {
//     loadDashboardData();
//     loadUserStats();
//     loadEnrolledCourses();
//   }, [user?.id]);

//   const loadDashboardData = async () => {
//     setLoading(true);
//     try {
//       if (user?.id) {
//         const data = await api.getDashboardData(user.id);
//         setDashboardData(data);
//       }
//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const loadUserStats = async () => {
//     try {
//       if (user?.id) {
//         // Get user profile for real stats
//         const profileData = await api.getUserProfile(user.id);
//         if (profileData.success) {
//           setUserStats({
//             points: user.points || 0,
//             streak_days: user.streak_days || 0,
//             level: user.experience_level?.charAt(0).toUpperCase() + 
//                    user.experience_level?.slice(1) || 'Beginner'
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error loading user stats:', error);
//     }
//   };

//   const loadEnrolledCourses = async () => {
//     try {
//       if (user?.id) {
//         const coursesData = await api.getUserCourses(user.id);
//         if (coursesData.success && coursesData.enrolled_courses) {
//           setEnrolledCourses(coursesData.enrolled_courses);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading enrolled courses:', error);
//     }
//   };

//   const handleViewChange = (view) => {
//     setActiveView(view);
//     if (onViewChange) {
//       onViewChange(view);
//     }
//   };

//   const StatCard = ({ icon: Icon, title, value, subtitle, trend, color }) => (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
//           <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
//         </div>
//         {trend && (
//           <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {trend > 0 ? '↗' : '↘'} {Math.abs(trend)}%
//           </span>
//         )}
//       </div>
//       <div>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//         <p className="text-sm text-gray-600 mt-1">{title}</p>
//         {subtitle && (
//           <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
//         )}
//       </div>
//     </div>
//   );

//   const QuickActionCard = ({ icon: Icon, title, description, color, onClick }) => (
//     <button
//       onClick={onClick}
//       className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all hover:border-indigo-300 text-left group"
//     >
//       <div className="flex items-start justify-between mb-4">
//         <div className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform`}>
//           <Icon className="w-6 h-6 text-white" />
//         </div>
//         <ChevronRight className="text-gray-400 group-hover:text-indigo-600" size={20} />
//       </div>
//       <div>
//         <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
//         <p className="text-sm text-gray-600">{description}</p>
//       </div>
//     </button>
//   );

//   const EnrolledCourseCard = ({ course }) => (
//     <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between mb-3">
//         <div className="flex-1 min-w-0">
//           <h4 className="font-bold text-gray-900 text-lg mb-1 truncate">{course.title}</h4>
//           <div className="flex items-center text-gray-600 text-sm mb-2">
//             <span className="truncate">{course.university || "Various Universities"}</span>
//           </div>
//         </div>
//         <div className="flex items-center space-x-2">
//           {course.rating && (
//             <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
//               <span className="font-bold">{course.rating.toFixed(1)}</span>
//             </div>
//           )}
//           {course.progress >= 100 ? (
//             <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//               Completed
//             </span>
//           ) : (
//             <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
//               {course.progress || 0}%
//             </span>
//           )}
//         </div>
//       </div>
      
//       <div className="mb-3">
//         <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//           course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
//           course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
//           course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
//           'bg-gray-100 text-gray-800'
//         }`}>
//           {course.difficulty || 'All Levels'}
//         </span>
//       </div>
      
//       <p className="text-gray-700 text-sm mb-4 line-clamp-2">
//         {course.description || 'No description available.'}
//       </p>
      
//       <div className="flex justify-between items-center">
//         <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
//           <div 
//             className="bg-green-500 h-2 rounded-full"
//             style={{ width: `${course.progress || 0}%` }}
//           ></div>
//         </div>
//         <button 
//           onClick={() => window.open(course.url || '#', '_blank')}
//           className="text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap"
//         >
//           Continue →
//         </button>
//       </div>
//     </div>
//   );

//   const renderDashboardView = () => (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Learner'}! 👋</h1>
//             <p className="text-indigo-100 mb-6">Ready to continue your learning journey?</p>
//             <div className="flex items-center space-x-4">
//               <div className="bg-white/20 px-4 py-2 rounded-lg">
//                 <span className="font-bold">{userStats.streak_days}</span> day streak
//               </div>
//               <div className="bg-white/20 px-4 py-2 rounded-lg">
//                 <span className="font-bold">{userStats.points}</span> points
//               </div>
//               <div className="bg-white/20 px-4 py-2 rounded-lg">
//                 Level: <span className="font-bold">{userStats.level}</span>
//               </div>
//             </div>
//           </div>
//           <div className="hidden lg:block">
//             <Rocket size={80} className="opacity-80" />
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           icon={BookOpen}
//           title="Active Courses"
//           value={enrolledCourses.length}
//           subtitle={`${enrolledCourses.filter(c => c.progress >= 100).length} completed`}
//           color="bg-blue-500"
//         />
//         <StatCard
//           icon={Clock}
//           title="Learning Hours"
//           value={dashboardData?.stats?.learning_hours || 0}
//           subtitle="This month"
//           color="bg-green-500"
//         />
//         <StatCard
//           icon={Target}
//           title="Avg. Score"
//           value={`${dashboardData?.stats?.average_score || 0}%`}
//           subtitle="Take quizzes to improve"
//           color="bg-purple-500"
//         />
//         <StatCard
//           icon={TrendingUp}
//           title="Progress Rate"
//           value={enrolledCourses.length > 0 ? 
//             `${Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)}%` : 
//             "0%"}
//           subtitle="Course completion"
//           color="bg-orange-500"
//         />
//       </div>

//       {/* Quick Actions */}
//       <div>
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           <QuickActionCard
//             icon={FileText}
//             title="PDF Learning"
//             description="Upload and analyze documents"
//             color="bg-blue-600"
//             onClick={() => handleViewChange('pdf-learning')}
//           />
//           <QuickActionCard
//             icon={Brain}
//             title="Topic Learning"
//             description="Explore any topic with AI"
//             color="bg-purple-600"
//             onClick={() => handleViewChange('topic-learning')}
//           />
//           <QuickActionCard
//             icon={BookOpen}
//             title="My Courses"
//             description="Continue your enrolled courses"
//             color="bg-green-600"
//             onClick={() => handleViewChange('courses')}
//           />
//           <QuickActionCard
//             icon={Compass}
//             title="Browse Courses"
//             description="Discover new learning opportunities"
//             color="bg-indigo-600"
//             onClick={() => handleViewChange('browse-courses')}
//           />
//         </div>
//       </div>

//       {/* Enrolled Courses Preview */}
//       {enrolledCourses.length > 0 && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
//               <p className="text-gray-600">Your enrolled courses</p>
//             </div>
//             <button 
//               onClick={() => handleViewChange('courses')}
//               className="text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               View All →
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enrolledCourses.slice(0, 3).map((course, idx) => (
//               <EnrolledCourseCard key={idx} course={course} />
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Recommended Courses */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
//             <p className="text-gray-600">Based on your interests and learning history</p>
//           </div>
//           <button 
//             onClick={() => handleViewChange('browse-courses')}
//             className="text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             Browse all →
//           </button>
//         </div>
//         <CourseRecommendations user={user} />
//       </div>

//       {/* Recent Activity */}
//       {enrolledCourses.length > 0 && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Progress</h3>
//             <div className="space-y-4">
//               {enrolledCourses.slice(0, 3).map((course, idx) => (
//                 <div key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
//                   <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
//                     <BookOpen className="text-blue-600" size={24} />
//                   </div>
//                   <div className="ml-4 flex-1">
//                     <h4 className="font-medium text-gray-900">{course.title}</h4>
//                     <div className="flex items-center mt-1">
//                       <div className="flex-1 bg-gray-200 rounded-full h-2">
//                         <div 
//                           className="bg-green-500 h-2 rounded-full"
//                           style={{ width: `${course.progress || 0}%` }}
//                         ></div>
//                       </div>
//                       <span className="ml-3 text-sm font-medium">{course.progress || 0}%</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="bg-white rounded-xl border border-gray-200 p-6">
//             <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Stats</h3>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//                 <div className="flex items-center">
//                   <BookOpen className="text-blue-600 mr-2" size={18} />
//                   <span>Total Courses</span>
//                 </div>
//                 <span className="font-bold">{enrolledCourses.length}</span>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//                 <div className="flex items-center">
//                   <CheckCircle className="text-green-600 mr-2" size={18} />
//                   <span>Completed</span>
//                 </div>
//                 <span className="font-bold">
//                   {enrolledCourses.filter(c => c.progress >= 100).length}
//                 </span>
//               </div>
//               <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
//                 <div className="flex items-center">
//                   <Star className="text-purple-600 mr-2" size={18} />
//                   <span>Avg Progress</span>
//                 </div>
//                 <span className="font-bold">
//                   {enrolledCourses.length > 0 ? 
//                     `${Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)}%` : 
//                     "0%"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

//   const renderCoursesView = () => (
//     <div className="space-y-8">
//       <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">My Learning Path</h1>
//             <p className="text-blue-100">Track and manage all your enrolled courses</p>
//           </div>
//           <BookOpen size={60} className="opacity-80" />
//         </div>
//       </div>

//       {enrolledCourses.length > 0 ? (
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Enrolled Courses</h2>
//               <p className="text-gray-600">{enrolledCourses.length} courses enrolled</p>
//             </div>
//             <button 
//               onClick={() => handleViewChange('browse-courses')}
//               className="text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               Browse More Courses →
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enrolledCourses.map((course, idx) => (
//               <EnrolledCourseCard key={idx} course={course} />
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//           <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//           <h3 className="text-xl font-bold text-gray-900 mb-2">No Courses Enrolled</h3>
//           <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet.</p>
//           <button
//             onClick={() => handleViewChange('browse-courses')}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
//           >
//             Browse Courses
//           </button>
//         </div>
//       )}
//     </div>
//   );

//   const renderProgressView = () => (
//     <div className="space-y-8">
//       <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
//             <p className="text-green-100">Track your progress and achievements</p>
//           </div>
//           <TrendingUp size={60} className="opacity-80" />
//         </div>
//       </div>

//       {/* Progress Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
//           <div className="space-y-4">
//             {enrolledCourses.length > 0 ? (
//               enrolledCourses.slice(0, 5).map((course, idx) => (
//                 <div key={idx}>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm text-gray-700 truncate max-w-[150px]">{course.title}</span>
//                     <span className="text-sm font-medium">{course.progress || 0}%</span>
//                   </div>
//                   <div className="bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-green-500 h-2 rounded-full"
//                       style={{ width: `${course.progress || 0}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500 text-center py-4">No enrolled courses yet</p>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Insights</h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//               <div className="flex items-center">
//                 <BookOpen className="text-blue-600 mr-2" size={18} />
//                 <span>Courses Enrolled</span>
//               </div>
//               <span className="font-bold">{enrolledCourses.length}</span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//               <div className="flex items-center">
//                 <CheckCircle className="text-green-600 mr-2" size={18} />
//                 <span>Completed Courses</span>
//               </div>
//               <span className="font-bold">
//                 {enrolledCourses.filter(c => c.progress >= 100).length}
//               </span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
//               <div className="flex items-center">
//                 <Star className="text-purple-600 mr-2" size={18} />
//                 <span>Average Progress</span>
//               </div>
//               <span className="font-bold">
//                 {enrolledCourses.length > 0 ? 
//                   `${Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)}%` : 
//                   "0%"}
//               </span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
//           <div className="space-y-3">
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Points Earned</span>
//               <span className="font-bold">{userStats.points}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Day Streak</span>
//               <span className="font-bold">{userStats.streak_days}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Learning Level</span>
//               <span className="font-bold">{userStats.level}</span>
//             </div>
//             <div className="flex items-center justify-between">
//               <span className="text-gray-600">Active Quizzes</span>
//               <span className="font-bold">0</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );

//   // Updated renderBrowseCoursesView function
//   const renderBrowseCoursesView = () => (
//     <BrowseCourses 
//       user={user} 
//       onEnroll={(course) => {
//         loadEnrolledCourses(); // Refresh enrolled courses after enrollment
//         alert(`Successfully enrolled in "${course.title}"!`);
//       }}
//       onViewCourse={(course) => {
//         if (course.url && course.url !== '#') {
//           window.open(course.url, '_blank');
//         }
//       }}
//     />
//   );

//   if (loading) {
//     return <LoadingSpinner message="Loading dashboard..." />;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Professional Sidebar */}
//       <ProfessionalSidebar
//         user={user}
//         activeView={activeView}
//         onViewChange={handleViewChange}
//         onLogout={onLogout}
//         onProfileClick={onProfileClick}
//         collapsed={sidebarCollapsed}
//         onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
//       />

//       {/* Main Content */}
//       <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} overflow-x-hidden`}>
//         {/* Professional Header */}
//         <ProfessionalHeader
//           user={user}
//           title={
//             activeView === 'dashboard' ? 'Dashboard' :
//             activeView === 'courses' ? 'My Courses' :
//             activeView === 'progress' ? 'Learning Progress' :
//             activeView === 'browse-courses' ? 'Browse Courses' :
//             activeView === 'achievements' ? 'Achievements' :
//             activeView === 'pdf-learning' ? 'PDF Learning' :
//             activeView === 'topic-learning' ? 'Topic Learning' : 'Dashboard'
//           }
//           subtitle={
//             activeView === 'dashboard' ? 'Your learning overview' :
//             activeView === 'courses' ? 'Track and manage your courses' :
//             activeView === 'progress' ? 'Analytics and insights' :
//             activeView === 'browse-courses' ? 'Discover new learning opportunities' :
//             activeView === 'achievements' ? 'Badges and milestones' :
//             activeView === 'pdf-learning' ? 'Upload and analyze documents' :
//             activeView === 'topic-learning' ? 'Explore any topic with AI' : ''
//           }
//           onProfileClick={onProfileClick}
//           onLogout={onLogout}
//         />

//         {/* Main Content Area */}
//         <main className="p-4 md:p-6">
//           {activeView === 'dashboard' && renderDashboardView()}
//           {activeView === 'courses' && renderCoursesView()}
//           {activeView === 'progress' && renderProgressView()}
//           {activeView === 'browse-courses' && renderBrowseCoursesView()}
//           {activeView === 'achievements' && (
//             <div className="text-center py-12">
//               <Award size={80} className="text-yellow-500 mx-auto mb-4" />
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Achievements</h2>
//               <p className="text-gray-600 mb-6">Track your badges and milestones!</p>
//               <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto">
//                 <p className="text-gray-500">Complete courses and quizzes to earn achievements</p>
//               </div>
//             </div>
//           )}
//           {activeView === 'pdf-learning' && (
//             <div className="text-center py-12">
//               <FileText size={80} className="text-blue-500 mx-auto mb-4" />
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">PDF Learning</h2>
//               <p className="text-gray-600 mb-6">Upload and analyze documents with AI</p>
//               <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto">
//                 <p className="text-gray-500">Upload PDFs to extract insights and learn from documents</p>
//               </div>
//             </div>
//           )}
//           {activeView === 'topic-learning' && (
//             <div className="text-center py-12">
//               <Brain size={80} className="text-purple-500 mx-auto mb-4" />
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">Topic Learning</h2>
//               <p className="text-gray-600 mb-6">Explore any topic with AI-powered learning</p>
//               <div className="bg-white rounded-xl border border-gray-200 p-8 max-w-md mx-auto">
//                 <p className="text-gray-500">Ask questions and learn about any topic with AI assistance</p>
//               </div>
//             </div>
//           )}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalDashboard;


// // UPDATED ProfessionalDashboard.jsx - Added Resume Learning and fixed Progress tab
// import React, { useState, useEffect } from 'react';
// import ProfessionalSidebar from '../Layout/ProfessionalSidebar';
// import ProfessionalHeader from '../Layout/ProfessionalHeader';
// import CourseRecommendations from '../CourseRecommendation/CourseRecommendations';
// import BrowseCourses from '../CourseRecommendation/BrowseCourses';
// import { api } from '../../services/api';
// import LoadingSpinner from '../Common/LoadingSpinner';
// import {
//   TrendingUp,
//   Clock,
//   Target,
//   BookOpen,
//   Award,
//   BarChart3,
//   Calendar,
//   ChevronRight,
//   Sparkles,
//   Brain,
//   FileText,
//   CheckCircle,
//   Star,
//   Zap,
//   Rocket,
//   Compass,
//   PlayCircle,
//   LineChart,
//   Activity,
//   TargetIcon,
//   TrendingDown,
//   Download,
//   FileDown
// } from 'lucide-react';

// const ProfessionalDashboard = ({ 
//   user, 
//   onLogout, 
//   onViewChange,
//   onProfileClick,
//   initialView = 'dashboard',
//   onProfileUpdate,
//   shouldRefresh = false,
//   onRefreshComplete
// }) => {
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [activeView, setActiveView] = useState(initialView);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [quizStats, setQuizStats] = useState({
//     average_score: 0,
//     total_quizzes: 0,
//     best_score: 0
//   });
//   const [learningHistory, setLearningHistory] = useState([]);
//   const [lastUpdated, setLastUpdated] = useState(new Date());

//   useEffect(() => {
//     loadAllData();
//   }, [user?.id]);

//   useEffect(() => {
//     if (shouldRefresh) {
//       console.log('🔄 Refreshing dashboard data...');
//       loadAllData();
//       if (onRefreshComplete) {
//         onRefreshComplete();
//       }
//     }
//   }, [shouldRefresh]);

//   const loadAllData = async () => {
//     setLoading(true);
//     try {
//       await Promise.all([
//         loadDashboardData(),
//         loadQuizStats(),
//         loadEnrolledCourses(),
//         loadLearningHistory()
//       ]);
//     } catch (error) {
//       console.error('Error loading dashboard data:', error);
//     } finally {
//       setLoading(false);
//       setLastUpdated(new Date());
//     }
//   };

//   const loadDashboardData = async () => {
//     try {
//       if (user?.id) {
//         const data = await api.getDashboardData(user.id);
//         setDashboardData(data);
//       }
//     } catch (error) {
//       console.error('Error loading dashboard:', error);
//       setDashboardData({
//         stats: {
//           learning_hours: 0,
//           average_score: 0,
//           total_quizzes: 0,
//           enrolled_courses: 0,
//           completed_courses: 0
//         }
//       });
//     }
//   };

//   const loadQuizStats = async () => {
//     try {
//       if (user?.id) {
//         const scoresData = await api.getQuizScores(user.id);
//         console.log('📊 Quiz scores data:', scoresData);
        
//         if (scoresData.scores && scoresData.scores.length > 0) {
//           const totalQuizzes = scoresData.scores.length;
//           const totalScore = scoresData.scores.reduce((sum, quiz) => sum + (quiz.percentage || 0), 0);
//           const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
//           const bestScore = Math.max(...scoresData.scores.map(q => q.percentage || 0));
          
//           setQuizStats({
//             average_score: averageScore,
//             total_quizzes: totalQuizzes,
//             best_score: bestScore
//           });
//         }
//       }
//     } catch (error) {
//       console.error('Error loading quiz stats:', error);
//     }
//   };

//   const loadEnrolledCourses = async () => {
//     try {
//       if (user?.id) {
//         const coursesData = await api.getUserCourses(user.id);
//         if (coursesData.success && coursesData.enrolled_courses) {
//           setEnrolledCourses(coursesData.enrolled_courses);
//         }
//       }
//     } catch (error) {
//       console.error('Error loading enrolled courses:', error);
//     }
//   };

//   const loadLearningHistory = async () => {
//     try {
//       if (user?.id) {
//         const historyData = await api.getUserHistory(user.id);
//         if (historyData.success && historyData.activities) {
//           setLearningHistory(historyData.activities.slice(0, 10));
//         }
//       }
//     } catch (error) {
//       console.error('Error loading learning history:', error);
//       // Sample data for demonstration
//       setLearningHistory([
//         { id: 1, type: 'quiz', title: 'Machine Learning Basics', score: 85, time: '2 hours ago' },
//         { id: 2, type: 'course', title: 'Advanced Python', progress: 65, time: '1 day ago' },
//         { id: 3, type: 'document', title: 'AI Research Paper Analysis', time: '2 days ago' },
//         { id: 4, type: 'quiz', title: 'Data Structures', score: 92, time: '3 days ago' },
//         { id: 5, type: 'course', title: 'Web Development', progress: 40, time: '1 week ago' }
//       ]);
//     }
//   };

//   const handleViewChange = (view) => {
//     setActiveView(view);
//     if (onViewChange) {
//       onViewChange(view);
//     }
//   };

//   const handleRefreshData = async () => {
//     console.log('🔄 Manual refresh triggered');
//     await loadAllData();
//   };

//   const StatCard = ({ icon: Icon, title, value, subtitle, trend, color, onClick }) => (
//     <div 
//       className={`bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer ${onClick ? 'hover:border-indigo-300' : ''}`}
//       onClick={onClick}
//     >
//       <div className="flex items-center justify-between mb-4">
//         <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
//           <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
//         </div>
//         {trend && (
//           <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
//             {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
//           </span>
//         )}
//       </div>
//       <div>
//         <p className="text-2xl font-bold text-gray-900">{value}</p>
//         <p className="text-sm text-gray-600 mt-1">{title}</p>
//         {subtitle && (
//           <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
//         )}
//       </div>
//     </div>
//   );

//   const renderComingSoonView = (title, description, Icon, color) => (
//     <div className="space-y-8">
//       <div className={`bg-gradient-to-r ${color} rounded-2xl p-8 text-white`}>
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">{title}</h1>
//             <p className="text-opacity-80">{description}</p>
//           </div>
//           <Icon size={60} className="opacity-80" />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//         <div className="max-w-md mx-auto">
//           <Icon className="w-24 h-24 text-gray-400 mx-auto mb-6" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
//           <p className="text-gray-600 mb-6">
//             This feature is currently under development. We're working hard to bring you the best learning experience.
//           </p>
//           <button
//             onClick={() => handleViewChange('dashboard')}
//             className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderCoursesView = () => (
//     <div className="space-y-8">
//       <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">My Learning Path</h1>
//             <p className="text-blue-100">Track and manage all your enrolled courses</p>
//           </div>
//           <BookOpen size={60} className="opacity-80" />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Enrolled Courses</h2>
//         {enrolledCourses.length > 0 ? (
//           <div className="space-y-4">
//             {enrolledCourses.map((course, idx) => (
//               <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center justify-between mb-2">
//                     <h3 className="font-bold text-lg text-gray-900 truncate">{course.title}</h3>
//                     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
//                       course.progress >= 100 ? 'bg-green-100 text-green-800' :
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {course.progress >= 100 ? 'Completed' : `${course.progress || 0}%`}
//                     </span>
//                   </div>
//                   <p className="text-gray-600 text-sm mb-2 line-clamp-2">
//                     {course.description || 'No description available.'}
//                   </p>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <span className="mr-4">
//                       <BookOpen size={14} className="inline mr-1" />
//                       {course.university || 'Various Universities'}
//                     </span>
//                     <span>
//                       <Target size={14} className="inline mr-1" />
//                       {course.difficulty || 'All Levels'}
//                     </span>
//                   </div>
//                 </div>
//                 <div className="ml-4 flex-shrink-0">
//                   <button 
//                     onClick={() => course.url && window.open(course.url, '_blank')}
//                     className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium"
//                   >
//                     {course.progress >= 100 ? 'Review' : 'Continue'}
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-12">
//             <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//             <h3 className="text-xl font-bold text-gray-700 mb-2">No Enrolled Courses</h3>
//             <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
//             <button
//               onClick={() => handleViewChange('browse-courses')}
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
//             >
//               Browse Courses
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   const renderDashboardView = () => (
//     <div className="space-y-8">
//       {/* Welcome Section */}
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Learner'}! 👋</h1>
//             <p className="text-indigo-100 mb-6">Ready to continue your learning journey?</p>
//             <div className="flex items-center space-x-4">
//               <div className="bg-white/20 px-4 py-2 rounded-lg">
//                 <span className="font-bold">{user?.streak_days || 0}</span> day streak
//               </div>
//               <div className="bg-white/20 px-4 py-2 rounded-lg">
//                 <span className="font-bold">{user?.points || 0}</span> points
//               </div>
//               <div className="bg-white/20 px-4 py-2 rounded-lg">
//                 Level: <span className="font-bold">{user?.experience_level?.charAt(0).toUpperCase() + user?.experience_level?.slice(1) || 'Beginner'}</span>
//               </div>
//             </div>
//           </div>
//           <div className="hidden lg:block">
//             <Rocket size={80} className="opacity-80" />
//           </div>
//         </div>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           icon={BookOpen}
//           title="Active Courses"
//           value={enrolledCourses.length}
//           subtitle={`${enrolledCourses.filter(c => c.progress >= 100).length} completed`}
//           color="bg-blue-500"
//           onClick={() => handleViewChange('courses')}
//         />
//         <StatCard
//           icon={Clock}
//           title="Learning Hours"
//           value={dashboardData?.stats?.learning_hours || 0}
//           subtitle="This month"
//           color="bg-green-500"
//         />
//         <StatCard
//           icon={Target}
//           title="Avg. Quiz Score"
//           value={`${quizStats.average_score || 0}%`}
//           subtitle={`${quizStats.total_quizzes || 0} quizzes taken`}
//           color="bg-purple-500"
//           onClick={handleRefreshData}
//         />
//         <StatCard
//           icon={TrendingUp}
//           title="Progress Rate"
//           value={enrolledCourses.length > 0 ? 
//             `${Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)}%` : 
//             "0%"}
//           subtitle="Course completion"
//           color="bg-orange-500"
//         />
//       </div>

//       {/* Quick Actions */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <button
//             onClick={() => handleViewChange('pdf-learning')}
//             className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6 hover:shadow-lg transition-all text-left group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <FileText size={24} className="text-white" />
//               <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//             <h3 className="font-bold text-lg mb-2">PDF Learning</h3>
//             <p className="text-blue-100 text-sm">Upload and analyze documents with AI</p>
//           </button>

//           <button
//             onClick={() => handleViewChange('topic-learning')}
//             className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 hover:shadow-lg transition-all text-left group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <Brain size={24} className="text-white" />
//               <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//             <h3 className="font-bold text-lg mb-2">Topic Learning</h3>
//             <p className="text-purple-100 text-sm">Explore any topic with AI assistance</p>
//           </button>

//           <button
//             onClick={() => handleViewChange('resume-learning')}
//             className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 hover:shadow-lg transition-all text-left group"
//           >
//             <div className="flex items-center justify-between mb-4">
//               <PlayCircle size={24} className="text-white" />
//               <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-opacity" />
//             </div>
//             <h3 className="font-bold text-lg mb-2">Resume Learning</h3>
//             <p className="text-green-100 text-sm">Continue from where you left off</p>
//           </button>
//         </div>
//       </div>

//       {/* Continue Learning */}
//       {enrolledCourses.length > 0 && (
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <div className="flex items-center justify-between mb-6">
//             <div>
//               <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
//               <p className="text-gray-600">Your enrolled courses</p>
//             </div>
//             <button 
//               onClick={() => handleViewChange('courses')}
//               className="text-indigo-600 hover:text-indigo-800 font-medium"
//             >
//               View All →
//             </button>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {enrolledCourses.slice(0, 3).map((course, idx) => (
//               <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
//                 <div className="flex items-start justify-between mb-3">
//                   <div className="flex-1 min-w-0">
//                     <h4 className="font-bold text-gray-900 text-lg mb-1 truncate">{course.title}</h4>
//                     <div className="flex items-center text-gray-600 text-sm mb-2">
//                       <span className="truncate">{course.university || "Various Universities"}</span>
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {course.rating && (
//                       <div className="flex items-center bg-blue-50 text-blue-700 px-2 py-1 rounded text-sm">
//                         <span className="font-bold">{course.rating.toFixed(1)}</span>
//                       </div>
//                     )}
//                     {course.progress >= 100 ? (
//                       <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
//                         Completed
//                       </span>
//                     ) : (
//                       <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">
//                         {course.progress || 0}%
//                       </span>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="mb-3">
//                   <span className={`px-2 py-1 rounded-full text-xs font-medium ${
//                     course.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
//                     course.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
//                     course.difficulty === 'Advanced' ? 'bg-red-100 text-red-800' :
//                     'bg-gray-100 text-gray-800'
//                   }`}>
//                     {course.difficulty || 'All Levels'}
//                   </span>
//                 </div>
                
//                 <p className="text-gray-700 text-sm mb-4 line-clamp-2">
//                   {course.description || 'No description available.'}
//                 </p>
                
//                 <div className="flex justify-between items-center">
//                   <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
//                     <div 
//                       className="bg-green-500 h-2 rounded-full"
//                       style={{ width: `${course.progress || 0}%` }}
//                     ></div>
//                   </div>
//                   <button 
//                     onClick={() => window.open(course.url || '#', '_blank')}
//                     className="text-indigo-600 hover:text-indigo-800 text-sm font-medium whitespace-nowrap"
//                   >
//                     Continue →
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Recommended Courses */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="flex items-center justify-between mb-6">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Recommended for You</h2>
//             <p className="text-gray-600">Based on your interests and learning history</p>
//           </div>
//           <button 
//             onClick={() => handleViewChange('browse-courses')}
//             className="text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             Browse all →
//           </button>
//         </div>
//         <CourseRecommendations user={user} />
//       </div>
//     </div>
//   );

//   const renderResumeLearningView = () => (
//     <div className="space-y-8">
//       <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Resume Learning</h1>
//             <p className="text-green-100">Continue from where you left off</p>
//           </div>
//           <PlayCircle size={60} className="opacity-80" />
//         </div>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
//         <div className="max-w-md mx-auto">
//           <PlayCircle className="w-24 h-24 text-green-400 mx-auto mb-6" />
//           <h2 className="text-2xl font-bold text-gray-900 mb-4">Coming Soon!</h2>
//           <p className="text-gray-600 mb-6">
//             We're working on a smart feature that will track your progress across all learning activities 
//             and suggest where to continue. This will help you pick up right where you left off.
//           </p>
//           <div className="space-y-4">
//             <div className="flex items-center text-left p-3 bg-gray-50 rounded-lg">
//               <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
//               <span className="text-gray-700">Track progress across PDFs, quizzes, and courses</span>
//             </div>
//             <div className="flex items-center text-left p-3 bg-gray-50 rounded-lg">
//               <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
//               <span className="text-gray-700">Smart suggestions based on learning patterns</span>
//             </div>
//             <div className="flex items-center text-left p-3 bg-gray-50 rounded-lg">
//               <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
//               <span className="text-gray-700">Personalized learning paths</span>
//             </div>
//           </div>
//           <button
//             onClick={() => handleViewChange('dashboard')}
//             className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderProgressView = () => (
//     <div className="space-y-8">
//       <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
//         <div className="flex items-center justify-between">
//           <div>
//             <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
//             <p className="text-indigo-100">Analytics and insights</p>
//           </div>
//           <LineChart size={60} className="opacity-80" />
//         </div>
//       </div>

//       {/* Progress Stats */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Progress</h3>
//           <div className="space-y-4">
//             {enrolledCourses.length > 0 ? (
//               enrolledCourses.slice(0, 5).map((course, idx) => (
//                 <div key={idx}>
//                   <div className="flex justify-between mb-1">
//                     <span className="text-sm text-gray-700 truncate max-w-[150px]">{course.title}</span>
//                     <span className="text-sm font-medium">{course.progress || 0}%</span>
//                   </div>
//                   <div className="bg-gray-200 rounded-full h-2">
//                     <div 
//                       className="bg-green-500 h-2 rounded-full transition-all duration-500"
//                       style={{ width: `${course.progress || 0}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500">No enrolled courses yet</p>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Insights</h3>
//           <div className="space-y-4">
//             <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
//               <div className="flex items-center">
//                 <BookOpen className="text-blue-600 mr-2" size={18} />
//                 <span>Courses Enrolled</span>
//               </div>
//               <span className="font-bold">{enrolledCourses.length}</span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
//               <div className="flex items-center">
//                 <CheckCircle className="text-green-600 mr-2" size={18} />
//                 <span>Completed Courses</span>
//               </div>
//               <span className="font-bold">
//                 {enrolledCourses.filter(c => c.progress >= 100).length}
//               </span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
//               <div className="flex items-center">
//                 <TargetIcon className="text-purple-600 mr-2" size={18} />
//                 <span>Average Quiz Score</span>
//               </div>
//               <span className="font-bold">{quizStats.average_score || 0}%</span>
//             </div>
//             <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
//               <div className="flex items-center">
//                 <Clock className="text-yellow-600 mr-2" size={18} />
//                 <span>Learning Hours</span>
//               </div>
//               <span className="font-bold">{dashboardData?.stats?.learning_hours || 0}</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl border border-gray-200 p-6">
//           <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning History</h3>
//           <div className="space-y-3">
//             {learningHistory.length > 0 ? (
//               learningHistory.map((activity, idx) => (
//                 <div key={idx} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
//                   <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
//                     activity.type === 'quiz' ? 'bg-blue-100' :
//                     activity.type === 'course' ? 'bg-green-100' :
//                     activity.type === 'document' ? 'bg-purple-100' :
//                     'bg-gray-100'
//                   }`}>
//                     {activity.type === 'quiz' && <TargetIcon className="text-blue-600" size={18} />}
//                     {activity.type === 'course' && <BookOpen className="text-green-600" size={18} />}
//                     {activity.type === 'document' && <FileText className="text-purple-600" size={18} />}
//                   </div>
//                   <div className="flex-1 min-w-0">
//                     <p className="font-medium text-gray-900 truncate">{activity.title}</p>
//                     <div className="flex items-center text-sm text-gray-500">
//                       <Clock size={12} className="mr-1" />
//                       <span>{activity.time || 'Recently'}</span>
//                       {activity.score && (
//                         <>
//                           <span className="mx-2">•</span>
//                           <span className="font-medium text-green-600">{activity.score}%</span>
//                         </>
//                       )}
//                       {activity.progress && (
//                         <>
//                           <span className="mx-2">•</span>
//                           <span className="font-medium text-blue-600">{activity.progress}%</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center py-8">
//                 <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                 <p className="text-gray-500">No recent learning activity</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Export Progress Button */}
//       <div className="bg-white rounded-xl border border-gray-200 p-6">
//         <div className="flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Progress Report</h3>
//             <p className="text-gray-600">Download your learning progress as a PDF report</p>
//           </div>
//           <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
//             <Download size={18} className="mr-2" />
//             Export PDF
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   const renderBrowseCoursesView = () => (
//     <BrowseCourses 
//       user={user} 
//       onEnroll={(course) => {
//         loadEnrolledCourses();
//         alert(`Successfully enrolled in "${course.title}"!`);
//       }}
//       onViewCourse={(course) => {
//         if (course.url && course.url !== '#') {
//           window.open(course.url, '_blank');
//         }
//       }}
//     />
//   );

//   if (loading) {
//     return <LoadingSpinner message="Loading dashboard..." />;
//   }

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Professional Sidebar */}
//       <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} flex-shrink-0 transition-all duration-300 h-screen sticky top-0`}>
//         <ProfessionalSidebar
//           user={user}
//           activeView={activeView}
//           onViewChange={handleViewChange}
//           onLogout={onLogout}
//           onProfileClick={onProfileClick}
//           collapsed={sidebarCollapsed}
//           onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 min-w-0 overflow-x-hidden">
//         <ProfessionalHeader
//           user={user}
//           title={
//             activeView === 'dashboard' ? 'Dashboard' :
//             activeView === 'resume-learning' ? 'Resume Learning' :
//             activeView === 'courses' ? 'My Courses' :
//             activeView === 'progress' ? 'Learning Progress' :
//             activeView === 'browse-courses' ? 'Browse Courses' :
//             activeView === 'achievements' ? 'Achievements' :
//             activeView === 'pdf-learning' ? 'PDF Learning' :
//             activeView === 'topic-learning' ? 'Topic Learning' : 'Dashboard'
//           }
//           subtitle={
//             activeView === 'dashboard' ? 'Your learning overview' :
//             activeView === 'resume-learning' ? 'Continue from where you left off' :
//             activeView === 'courses' ? 'Track and manage your courses' :
//             activeView === 'progress' ? 'Analytics and insights' :
//             activeView === 'browse-courses' ? 'Discover new learning opportunities' :
//             activeView === 'achievements' ? 'Badges and milestones' :
//             activeView === 'pdf-learning' ? 'Upload and analyze documents' :
//             activeView === 'topic-learning' ? 'Explore any topic with AI' : ''
//           }
//           onProfileClick={onProfileClick}
//           onLogout={onLogout}
//         />

//         <main className="p-4 md:p-6 min-h-[calc(100vh-80px)]">
//           {activeView === 'dashboard' && renderDashboardView()}
//           {activeView === 'resume-learning' && renderResumeLearningView()}
//           {activeView === 'courses' && renderCoursesView()}
//           {activeView === 'progress' && renderProgressView()}
//           {activeView === 'browse-courses' && renderBrowseCoursesView()}
//           {activeView === 'achievements' && renderComingSoonView('Achievements', 'Badges and milestones', Award, 'from-yellow-500 to-amber-500')}
//           {activeView === 'pdf-learning' && renderComingSoonView('PDF Learning', 'Upload and analyze documents', FileText, 'from-blue-500 to-cyan-500')}
//           {activeView === 'topic-learning' && renderComingSoonView('Topic Learning', 'Explore any topic with AI', Brain, 'from-purple-500 to-pink-500')}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default ProfessionalDashboard;



// UPDATED ProfessionalDashboard.jsx - Complete with all functions
import React, { useState, useEffect } from 'react';
import ProfessionalSidebar from '../Layout/ProfessionalSidebar';
import ProfessionalHeader from '../Layout/ProfessionalHeader';
import CourseRecommendations from '../CourseRecommendation/CourseRecommendations';
import BrowseCourses from '../CourseRecommendation/BrowseCourses';
import { api } from '../../services/api';
import LoadingSpinner from '../Common/LoadingSpinner';
import {
  TrendingUp,
  Clock,
  Target,
  BookOpen,
  Award,
  ChevronRight,
  Brain,
  FileText,
  CheckCircle,
  Star,
  Rocket,
  PlayCircle,
  LineChart,
  Activity,
  TargetIcon,
  Download,
  Moon,
  Sun
} from 'lucide-react';

const ProfessionalDashboard = ({ 
  user, 
  onLogout, 
  onViewChange,
  onProfileClick,
  initialView = 'dashboard',
  onProfileUpdate,
  shouldRefresh = false,
  onRefreshComplete
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [activeView, setActiveView] = useState(initialView);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [quizStats, setQuizStats] = useState({
    average_score: 0,
    total_quizzes: 0,
    best_score: 0
  });
  const [learningHistory, setLearningHistory] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage for saved preference
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    loadAllData();
    
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [user?.id, darkMode]);

  useEffect(() => {
    if (shouldRefresh) {
      console.log('🔄 Refreshing dashboard data...');
      loadAllData();
      if (onRefreshComplete) {
        onRefreshComplete();
      }
    }
  }, [shouldRefresh]);

  const loadAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        loadDashboardData(),
        loadQuizStats(),
        loadEnrolledCourses(),
        loadLearningHistory()
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
      setLastUpdated(new Date());
    }
  };

  const loadDashboardData = async () => {
    try {
      if (user?.id) {
        const data = await api.getDashboardData(user.id);
        setDashboardData(data);
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setDashboardData({
        stats: {
          learning_hours: 0,
          average_score: 0,
          total_quizzes: 0,
          enrolled_courses: 0,
          completed_courses: 0
        }
      });
    }
  };

  const loadQuizStats = async () => {
    try {
      if (user?.id) {
        const scoresData = await api.getQuizScores(user.id);
        console.log('📊 Quiz scores data:', scoresData);
        
        if (scoresData.scores && scoresData.scores.length > 0) {
          const totalQuizzes = scoresData.scores.length;
          const totalScore = scoresData.scores.reduce((sum, quiz) => sum + (quiz.percentage || 0), 0);
          const averageScore = totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0;
          const bestScore = Math.max(...scoresData.scores.map(q => q.percentage || 0));
          
          setQuizStats({
            average_score: averageScore,
            total_quizzes: totalQuizzes,
            best_score: bestScore
          });
        }
      }
    } catch (error) {
      console.error('Error loading quiz stats:', error);
    }
  };

  const loadEnrolledCourses = async () => {
    try {
      if (user?.id) {
        const coursesData = await api.getUserCourses(user.id);
        if (coursesData.success && coursesData.enrolled_courses) {
          setEnrolledCourses(coursesData.enrolled_courses);
        }
      }
    } catch (error) {
      console.error('Error loading enrolled courses:', error);
    }
  };

  const loadLearningHistory = async () => {
    try {
      if (user?.id) {
        const historyData = await api.getUserHistory(user.id);
        if (historyData.success && historyData.activities) {
          setLearningHistory(historyData.activities.slice(0, 10));
        }
      }
    } catch (error) {
      console.error('Error loading learning history:', error);
      // Sample data for demonstration
      setLearningHistory([
        { id: 1, type: 'quiz', title: 'Machine Learning Basics', score: 85, time: '2 hours ago' },
        { id: 2, type: 'course', title: 'Advanced Python', progress: 65, time: '1 day ago' },
        { id: 3, type: 'document', title: 'AI Research Paper Analysis', time: '2 days ago' },
        { id: 4, type: 'quiz', title: 'Data Structures', score: 92, time: '3 days ago' },
        { id: 5, type: 'course', title: 'Web Development', progress: 40, time: '1 week ago' }
      ]);
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    if (onViewChange) {
      onViewChange(view);
    }
  };

  const handleRefreshData = async () => {
    console.log('🔄 Manual refresh triggered');
    await loadAllData();
  };

  const toggleDarkMode = () => {
    setIsTransitioning(true);
    
    // Start the fade-out transition
    document.documentElement.style.transition = 'background-color 300ms ease, color 300ms ease';
    
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    
    // Apply the dark mode class with a delay for smooth transition
    setTimeout(() => {
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Reset transition and end transitioning state
      setTimeout(() => {
        document.documentElement.style.transition = '';
        setIsTransitioning(false);
      }, 300);
    }, 10);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, color, onClick }) => (
    <div 
      className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 hover:shadow-md transition-all duration-300 cursor-pointer ${onClick ? 'hover:border-indigo-300' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color} ${darkMode ? 'bg-opacity-20' : 'bg-opacity-10'} transition-colors duration-300`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')} ${darkMode ? 'text-gray-200' : ''} transition-colors duration-300`} />
        </div>
        {trend && (
          <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'} ${darkMode ? (trend > 0 ? 'text-green-400' : 'text-red-400') : ''} transition-colors duration-300`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
        )}
      </div>
      <div>
        <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>{value}</p>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} mt-1 transition-colors duration-300`}>{title}</p>
        {subtitle && (
          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2 transition-colors duration-300`}>{subtitle}</p>
        )}
      </div>
    </div>
  );

  const renderComingSoonView = (title, description, Icon, color) => (
    <div className="space-y-8 transition-opacity duration-300">
      <div className={`bg-gradient-to-r ${color} rounded-2xl p-8 text-white transition-all duration-300`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-opacity-80">{description}</p>
          </div>
          <Icon size={60} className="opacity-80 transition-transform duration-300" />
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-8 text-center transition-all duration-300`}>
        <div className="max-w-md mx-auto">
          <Icon className={`w-24 h-24 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-6 transition-colors duration-300`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 transition-colors duration-300`}>Coming Soon!</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6 transition-colors duration-300`}>
            This feature is currently under development. We're working hard to bring you the best learning experience.
          </p>
          <button
            onClick={() => handleViewChange('dashboard')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-all duration-300 hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const renderCoursesView = () => (
    <div className="space-y-8 transition-opacity duration-300">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 text-white transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Learning Path</h1>
            <p className="text-blue-100">Track and manage all your enrolled courses</p>
          </div>
          <BookOpen size={60} className="opacity-80 transition-transform duration-300" />
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 transition-all duration-300`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>Your Enrolled Courses</h2>
        {enrolledCourses.length > 0 ? (
          <div className="space-y-4">
            {enrolledCourses.map((course, idx) => (
              <div key={idx} className={`flex items-center justify-between p-4 border ${darkMode ? 'border-gray-700 hover:bg-gray-750' : 'border-gray-200 hover:bg-gray-50'} rounded-lg transition-all duration-300`}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} truncate transition-colors duration-300`}>{course.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-300 ${
                      course.progress >= 100 ? 
                      (darkMode ? 'bg-green-900 text-green-200' : 'bg-green-100 text-green-800') :
                      (darkMode ? 'bg-yellow-900 text-yellow-200' : 'bg-yellow-100 text-yellow-800')
                    }`}>
                      {course.progress >= 100 ? 'Completed' : `${course.progress || 0}%`}
                    </span>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2 line-clamp-2 transition-colors duration-300`}>
                    {course.description || 'No description available.'}
                  </p>
                  <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} transition-colors duration-300`}>
                    <span className="mr-4">
                      <BookOpen size={14} className="inline mr-1" />
                      {course.university || 'Various Universities'}
                    </span>
                    <span>
                      <Target size={14} className="inline mr-1" />
                      {course.difficulty || 'All Levels'}
                    </span>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button 
                    onClick={() => course.url && window.open(course.url, '_blank')}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 font-medium transition-all duration-300 hover:scale-105"
                  >
                    {course.progress >= 100 ? 'Review' : 'Continue'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className={`w-16 h-16 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4 transition-colors duration-300`} />
            <h3 className={`text-xl font-bold ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2 transition-colors duration-300`}>No Enrolled Courses</h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-6 transition-colors duration-300`}>You haven't enrolled in any courses yet.</p>
            <button
              onClick={() => handleViewChange('browse-courses')}
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-all duration-300 hover:scale-105"
            >
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderDashboardView = () => (
    <div className="space-y-8 transition-opacity duration-300">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white relative transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name || 'Learner'}! 👋</h1>
            <p className="text-indigo-100 mb-6">Ready to continue your learning journey?</p>
            <div className="flex items-center space-x-4">
              <div className="bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30">
                <span className="font-bold">{user?.streak_days || 0}</span> day streak
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30">
                <span className="font-bold">{user?.points || 0}</span> points
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-white/30">
                Level: <span className="font-bold">{user?.experience_level?.charAt(0).toUpperCase() + user?.experience_level?.slice(1) || 'Beginner'}</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Rocket size={80} className="opacity-80 transition-transform duration-300 hover:scale-110" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={BookOpen}
          title="Active Courses"
          value={enrolledCourses.length}
          subtitle={`${enrolledCourses.filter(c => c.progress >= 100).length} completed`}
          color="bg-blue-500"
          onClick={() => handleViewChange('courses')}
        />
        <StatCard
          icon={Clock}
          title="Learning Hours"
          value={dashboardData?.stats?.learning_hours || 0}
          subtitle="This month"
          color="bg-green-500"
        />
        <StatCard
          icon={Target}
          title="Avg. Quiz Score"
          value={`${quizStats.average_score || 0}%`}
          subtitle={`${quizStats.total_quizzes || 0} quizzes taken`}
          color="bg-purple-500"
          onClick={handleRefreshData}
        />
        <StatCard
          icon={TrendingUp}
          title="Progress Rate"
          value={enrolledCourses.length > 0 ? 
            `${Math.round(enrolledCourses.reduce((acc, c) => acc + (c.progress || 0), 0) / enrolledCourses.length)}%` : 
            "0%"}
          subtitle="Course completion"
          color="bg-orange-500"
        />
      </div>

      {/* Quick Actions */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 transition-all duration-300`}>
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 transition-colors duration-300`}>Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => handleViewChange('pdf-learning')}
            className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText size={24} className="text-white transition-transform duration-300 group-hover:rotate-12" />
              <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
            </div>
            <h3 className="font-bold text-lg mb-2">PDF Learning</h3>
            <p className="text-blue-100 text-sm">Upload and analyze documents with AI</p>
          </button>

          <button
            onClick={() => handleViewChange('topic-learning')}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <Brain size={24} className="text-white transition-transform duration-300 group-hover:rotate-12" />
              <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
            </div>
            <h3 className="font-bold text-lg mb-2">Topic Learning</h3>
            <p className="text-purple-100 text-sm">Explore any topic with AI assistance</p>
          </button>

          <button
            onClick={() => handleViewChange('resume-learning')}
            className="bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-4">
              <PlayCircle size={24} className="text-white transition-transform duration-300 group-hover:rotate-12" />
              <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
            </div>
            <h3 className="font-bold text-lg mb-2">Resume Learning</h3>
            <p className="text-green-100 text-sm">Continue from where you left off</p>
          </button>
        </div>
      </div>

      {/* Continue Learning */}
      {enrolledCourses.length > 0 && (
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 transition-all duration-300`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Continue Learning</h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Your enrolled courses</p>
            </div>
            <button 
              onClick={() => handleViewChange('courses')}
              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-all duration-300 hover:scale-105"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.slice(0, 3).map((course, idx) => (
              <div key={idx} className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg border p-4 hover:shadow-md transition-all duration-300 hover:scale-[1.02]`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h4 className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'} text-lg mb-1 truncate transition-colors duration-300`}>{course.title}</h4>
                    <div className={`flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm mb-2 transition-colors duration-300`}>
                      <span className="truncate">{course.university || "Various Universities"}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {course.rating && (
                      <div className={`flex items-center ${darkMode ? 'bg-blue-900 text-blue-300' : 'bg-blue-50 text-blue-700'} px-2 py-1 rounded text-sm transition-colors duration-300`}>
                        <span className="font-bold">{course.rating.toFixed(1)}</span>
                      </div>
                    )}
                    {course.progress >= 100 ? (
                      <span className={`px-2 py-1 ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'} rounded-full text-xs transition-colors duration-300`}>
                        Completed
                      </span>
                    ) : (
                      <span className={`px-2 py-1 ${darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800'} rounded-full text-xs transition-colors duration-300`}>
                        {course.progress || 0}%
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium transition-colors duration-300 ${
                    course.difficulty === 'Beginner' ? 
                      (darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800') :
                    course.difficulty === 'Intermediate' ? 
                      (darkMode ? 'bg-yellow-900 text-yellow-300' : 'bg-yellow-100 text-yellow-800') :
                    course.difficulty === 'Advanced' ? 
                      (darkMode ? 'bg-red-900 text-red-300' : 'bg-red-100 text-red-800') :
                      (darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800')
                  }`}>
                    {course.difficulty || 'All Levels'}
                  </span>
                </div>
                
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} text-sm mb-4 line-clamp-2 transition-colors duration-300`}>
                  {course.description || 'No description available.'}
                </p>
                
                <div className="flex justify-between items-center">
                  <div className={`flex-1 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2 mr-3 transition-colors duration-300`}>
                    <div 
                      className="bg-green-500 dark:bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                  <button 
                    onClick={() => window.open(course.url || '#', '_blank')}
                    className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium whitespace-nowrap transition-all duration-300 hover:scale-105"
                  >
                    Continue →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Courses */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6 transition-all duration-300`}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} transition-colors duration-300`}>Recommended for You</h2>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} transition-colors duration-300`}>Based on your interests and learning history</p>
          </div>
          <button 
            onClick={() => handleViewChange('browse-courses')}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 font-medium transition-all duration-300 hover:scale-105"
          >
            Browse all →
          </button>
        </div>
        <CourseRecommendations user={user} darkMode={darkMode} />
      </div>
    </div>
  );

  const renderResumeLearningView = () => (
    <div className="space-y-8 transition-opacity duration-300">
      <div className="bg-gradient-to-r from-green-600 to-emerald-500 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Resume Learning</h1>
            <p className="text-green-100">Continue from where you left off</p>
          </div>
          <PlayCircle size={60} className="opacity-80" />
        </div>
      </div>

      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-8 text-center`}>
        <div className="max-w-md mx-auto">
          <PlayCircle className={`w-24 h-24 ${darkMode ? 'text-green-600' : 'text-green-400'} mx-auto mb-6`} />
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Coming Soon!</h2>
          <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
            We're working on a smart feature that will track your progress across all learning activities 
            and suggest where to continue. This will help you pick up right where you left off.
          </p>
          <div className="space-y-4">
            <div className={`flex items-center text-left p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Track progress across PDFs, quizzes, and courses</span>
            </div>
            <div className={`flex items-center text-left p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Smart suggestions based on learning patterns</span>
            </div>
            <div className={`flex items-center text-left p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
              <CheckCircle className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 flex-shrink-0" />
              <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Personalized learning paths</span>
            </div>
          </div>
          <button
            onClick={() => handleViewChange('dashboard')}
            className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 font-medium transition-all duration-300 hover:scale-105"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );

  const renderProgressView = () => (
    <div className="space-y-8 transition-opacity duration-300">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Learning Progress</h1>
            <p className="text-indigo-100">Analytics and insights</p>
          </div>
          <LineChart size={60} className="opacity-80" />
        </div>
      </div>

      {/* Progress Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Course Progress</h3>
          <div className="space-y-4">
            {enrolledCourses.length > 0 ? (
              enrolledCourses.slice(0, 5).map((course, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-1">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'} truncate max-w-[150px]`}>{course.title}</span>
                    <span className="text-sm font-medium">{course.progress || 0}%</span>
                  </div>
                  <div className={`${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                    <div 
                      className="bg-green-500 dark:bg-green-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${course.progress || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No enrolled courses yet</p>
              </div>
            )}
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Learning Insights</h3>
          <div className="space-y-4">
            <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-blue-900' : 'bg-blue-50'} rounded-lg`}>
              <div className="flex items-center">
                <BookOpen className={`${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} size={18} />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Courses Enrolled</span>
              </div>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{enrolledCourses.length}</span>
            </div>
            <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-green-900' : 'bg-green-50'} rounded-lg`}>
              <div className="flex items-center">
                <CheckCircle className={`${darkMode ? 'text-green-400' : 'text-green-600'} mr-2`} size={18} />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Completed Courses</span>
              </div>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {enrolledCourses.filter(c => c.progress >= 100).length}
              </span>
            </div>
            <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-purple-900' : 'bg-purple-50'} rounded-lg`}>
              <div className="flex items-center">
                <TargetIcon className={`${darkMode ? 'text-purple-400' : 'text-purple-600'} mr-2`} size={18} />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Average Quiz Score</span>
              </div>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{quizStats.average_score || 0}%</span>
            </div>
            <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-yellow-900' : 'bg-yellow-50'} rounded-lg`}>
              <div className="flex items-center">
                <Clock className={`${darkMode ? 'text-yellow-400' : 'text-yellow-600'} mr-2`} size={18} />
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Learning Hours</span>
              </div>
              <span className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{dashboardData?.stats?.learning_hours || 0}</span>
            </div>
          </div>
        </div>

        <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
          <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Learning History</h3>
          <div className="space-y-3">
            {learningHistory.length > 0 ? (
              learningHistory.map((activity, idx) => (
                <div key={idx} className={`flex items-center p-3 ${darkMode ? 'hover:bg-gray-750' : 'hover:bg-gray-50'} rounded-lg`}>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${
                    activity.type === 'quiz' ? (darkMode ? 'bg-blue-900' : 'bg-blue-100') :
                    activity.type === 'course' ? (darkMode ? 'bg-green-900' : 'bg-green-100') :
                    activity.type === 'document' ? (darkMode ? 'bg-purple-900' : 'bg-purple-100') :
                    (darkMode ? 'bg-gray-700' : 'bg-gray-100')
                  }`}>
                    {activity.type === 'quiz' && <TargetIcon className={darkMode ? "text-blue-400" : "text-blue-600"} size={18} />}
                    {activity.type === 'course' && <BookOpen className={darkMode ? "text-green-400" : "text-green-600"} size={18} />}
                    {activity.type === 'document' && <FileText className={darkMode ? "text-purple-400" : "text-purple-600"} size={18} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>{activity.title}</p>
                    <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      <Clock size={12} className="mr-1" />
                      <span>{activity.time || 'Recently'}</span>
                      {activity.score && (
                        <>
                          <span className="mx-2">•</span>
                          <span className={`font-medium ${darkMode ? 'text-green-400' : 'text-green-600'}`}>{activity.score}%</span>
                        </>
                      )}
                      {activity.progress && (
                        <>
                          <span className="mx-2">•</span>
                          <span className={`font-medium ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>{activity.progress}%</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Activity className={`w-12 h-12 ${darkMode ? 'text-gray-600' : 'text-gray-400'} mx-auto mb-4`} />
                <p className={darkMode ? 'text-gray-400' : 'text-gray-500'}>No recent learning activity</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Export Progress Button */}
      <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl border p-6`}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Export Progress Report</h3>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Download your learning progress as a PDF report</p>
          </div>
          <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 hover:scale-105">
            <Download size={18} className="mr-2" />
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );

  const renderBrowseCoursesView = () => (
    <BrowseCourses 
      user={user} 
      onEnroll={(course) => {
        loadEnrolledCourses();
        alert(`Successfully enrolled in "${course.title}"!`);
      }}
      onViewCourse={(course) => {
        if (course.url && course.url !== '#') {
          window.open(course.url, '_blank');
        }
      }}
      darkMode={darkMode}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Loading dashboard..." darkMode={darkMode} />;
  }

  return (
    <div className={`flex min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'} transition-all duration-300`}>
      {/* Professional Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} flex-shrink-0 transition-all duration-300 h-screen sticky top-0`}>
        <ProfessionalSidebar
          user={user}
          activeView={activeView}
          onViewChange={handleViewChange}
          onLogout={onLogout}
          onProfileClick={onProfileClick}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
          darkMode={darkMode}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-x-hidden">
        <ProfessionalHeader
          user={user}
          title={
            activeView === 'dashboard' ? 'Dashboard' :
            activeView === 'resume-learning' ? 'Resume Learning' :
            activeView === 'courses' ? 'My Courses' :
            activeView === 'progress' ? 'Learning Progress' :
            activeView === 'browse-courses' ? 'Browse Courses' :
            activeView === 'achievements' ? 'Achievements' :
            activeView === 'pdf-learning' ? 'PDF Learning' :
            activeView === 'topic-learning' ? 'Topic Learning' : 'Dashboard'
          }
          subtitle={
            activeView === 'dashboard' ? 'Your learning overview' :
            activeView === 'resume-learning' ? 'Continue from where you left off' :
            activeView === 'courses' ? 'Track and manage your courses' :
            activeView === 'progress' ? 'Analytics and insights' :
            activeView === 'browse-courses' ? 'Discover new learning opportunities' :
            activeView === 'achievements' ? 'Badges and milestones' :
            activeView === 'pdf-learning' ? 'Upload and analyze documents' :
            activeView === 'topic-learning' ? 'Explore any topic with AI' : ''
          }
          onProfileClick={onProfileClick}
          onLogout={onLogout}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        <main className={`p-4 md:p-6 min-h-[calc(100vh-80px)] transition-all duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          {activeView === 'dashboard' && renderDashboardView()}
          {activeView === 'resume-learning' && renderResumeLearningView()}
          {activeView === 'courses' && renderCoursesView()}
          {activeView === 'progress' && renderProgressView()}
          {activeView === 'browse-courses' && renderBrowseCoursesView()}
          {activeView === 'achievements' && renderComingSoonView('Achievements', 'Badges and milestones', Award, 'from-yellow-500 to-amber-500')}
          {activeView === 'pdf-learning' && renderComingSoonView('PDF Learning', 'Upload and analyze documents', FileText, 'from-blue-500 to-cyan-500')}
          {activeView === 'topic-learning' && renderComingSoonView('Topic Learning', 'Explore any topic with AI', Brain, 'from-purple-500 to-pink-500')}
        </main>
      </div>
    </div>
  );
};

export default ProfessionalDashboard;