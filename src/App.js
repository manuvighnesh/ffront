

// // UPDATED App.js with browse-courses view
// import React, { useState, useEffect } from 'react';
// import ProfessionalLanding from './components/Landing/ProfessionalLanding.jsx';
// import Login from './components/Auth/Login.jsx';
// import Signup from './components/Auth/Signup.jsx';
// import ProfessionalDashboard from './components/Dashboard/ProfessionalDashboard.jsx';
// import PDFLearning from './components/PDFLearning/PDFLearning.jsx';
// import TopicLearning from './components/TopicLearning/TopicLearning.jsx';
// import ProfessionalProfile from './components/Profile/ProfessionalProfile.jsx';
// import { BackendConnectionCheck, BackendError } from './components/Common/LoadingSpinner.jsx';
// import { api } from './services/api.js';

// function App() {
//   const [user, setUser] = useState(null);
//   const [view, setView] = useState('dashboard');
//   const [backendStatus, setBackendStatus] = useState('checking');
//   const [authMode, setAuthMode] = useState('landing');

//   useEffect(() => {
//     const initializeApp = async () => {
//       try {
//         await api.healthCheck();
//         setBackendStatus('connected');
//       } catch (error) {
//         setBackendStatus('error');
//       }
      
//       const savedUser = localStorage.getItem('user');
//       if (savedUser) {
//         try {
//           const parsedUser = JSON.parse(savedUser);
//           setUser(parsedUser);
//           setAuthMode('authenticated');
//         } catch (err) {
//           localStorage.removeItem('user');
//         }
//       }
//     };

//     initializeApp();
//   }, []);

//   const handleGetStarted = () => {
//     setAuthMode('signup');
//   };

//   const handleSignIn = () => {
//     setAuthMode('login');
//   };

//   const handleLogin = (userData) => {
//     const userWithId = { ...userData, id: userData._id || userData.id };
//     setUser(userWithId);
//     setAuthMode('authenticated');
//     setView('dashboard');
//     localStorage.setItem('user', JSON.stringify(userWithId));
//   };

//   const handleSignup = (userData) => {
//     const userWithId = { ...userData, id: userData._id || userData.id };
//     setUser(userWithId);
//     setAuthMode('authenticated');
//     setView('dashboard');
//     localStorage.setItem('user', JSON.stringify(userWithId));
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setView('dashboard');
//     setAuthMode('landing');
//     localStorage.removeItem('user');
//   };

//   const handleProfileUpdate = (updatedData) => {
//     const updatedUser = {
//       ...user,
//       ...updatedData,
//       interests: typeof updatedData.interests === 'string' 
//         ? updatedData.interests.split(',').map(i => i.trim()).filter(i => i)
//         : updatedData.interests || user.interests
//     };
//     setUser(updatedUser);
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   };

//   const handleBack = () => {
//     setView('dashboard');
//   };

//   const handleRetryConnection = () => {
//     setBackendStatus('checking');
//     window.location.reload();
//   };

//   if (backendStatus === 'checking') {
//     return <BackendConnectionCheck />;
//   }

//   if (backendStatus === 'error') {
//     return <BackendError onRetry={handleRetryConnection} />;
//   }

//   if (authMode === 'landing') {
//     return <ProfessionalLanding onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
//   }

//   if (authMode === 'login') {
//     return <Login onLogin={handleLogin} onShowSignup={() => setAuthMode('signup')} />;
//   }

//   if (authMode === 'signup') {
//     return <Signup onSignup={handleSignup} onBack={() => setAuthMode('login')} />;
//   }

//   if (view === 'profile') {
//     return <ProfessionalProfile 
//       user={user} 
//       onLogout={handleLogout}
//       onProfileUpdate={handleProfileUpdate}
//       onBack={() => setView('dashboard')}
//     />;
//   }

//   if (view === 'pdf-learning') {
//     return <PDFLearning user={user} onBack={() => setView('dashboard')} />;
//   }

//   if (view === 'topic-learning') {
//     return <TopicLearning user={user} onBack={() => setView('dashboard')} />;
//   }

//   // Use ProfessionalDashboard for all views
//   return <ProfessionalDashboard 
//     user={user} 
//     onLogout={handleLogout} 
//     onViewChange={setView}
//     initialView={view}
//     onProfileClick={() => setView('profile')}
//     onProfileUpdate={handleProfileUpdate}
//   />;
// }

// export default App;
import React, { useState, useEffect } from 'react';
import ProfessionalLanding from './components/Landing/ProfessionalLanding.jsx';
import Login from './components/Auth/Login.jsx';
import Signup from './components/Auth/Signup.jsx';
import ProfessionalDashboard from './components/Dashboard/ProfessionalDashboard.jsx';
import PDFLearning from './components/PDFLearning/PDFLearning.jsx';
import TopicLearning from './components/TopicLearning/TopicLearning.jsx';
import ProfessionalProfile from './components/Profile/ProfessionalProfile.jsx';
import { BackendConnectionCheck, BackendError } from './components/Common/LoadingSpinner.jsx';
import { api } from './services/api.js';

function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('dashboard');
  const [backendStatus, setBackendStatus] = useState('checking');
  const [authMode, setAuthMode] = useState('landing');
  const [shouldRefreshDashboard, setShouldRefreshDashboard] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await api.healthCheck();
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('error');
      }
      
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          setUser(parsedUser);
          setAuthMode('authenticated');
        } catch (err) {
          localStorage.removeItem('user');
        }
      }
    };

    initializeApp();
  }, []);

  const handleGetStarted = () => {
    setAuthMode('signup');
  };

  const handleSignIn = () => {
    setAuthMode('login');
  };

  const handleLogin = async (userData) => {
    const userWithId = { ...userData, id: userData._id || userData.id };
    setUser(userWithId);
    setAuthMode('authenticated');
    setView('dashboard');
    localStorage.setItem('user', JSON.stringify(userWithId));
  };

  const handleSignup = (userData) => {
    const userWithId = { ...userData, id: userData._id || userData.id };
    setUser(userWithId);
    setAuthMode('authenticated');
    setView('dashboard');
    localStorage.setItem('user', JSON.stringify(userWithId));
  };

  const handleLogout = () => {
    setUser(null);
    setView('dashboard');
    setAuthMode('landing');
    localStorage.removeItem('user');
  };

  const handleProfileUpdate = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
      interests: typeof updatedData.interests === 'string' 
        ? updatedData.interests.split(',').map(i => i.trim()).filter(i => i)
        : updatedData.interests || user.interests
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const handleQuizComplete = async (quizResult) => {
    console.log('📊 Quiz completed with result:', quizResult);
    
    if (user?.id && quizResult.points_earned) {
      try {
        const freshUserData = await api.getUser(user.id);
        if (freshUserData.user) {
          const updatedUser = { 
            ...freshUserData.user, 
            id: freshUserData.user._id || freshUserData.user.id 
          };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setShouldRefreshDashboard(true);
          console.log('✅ User points updated:', updatedUser.points);
        }
      } catch (error) {
        console.error('Error refreshing user data:', error);
        const updatedUser = {
          ...user,
          points: (user.points || 0) + quizResult.points_earned
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setShouldRefreshDashboard(true);
      }
    }
  };

  const handleRetryConnection = () => {
    setBackendStatus('checking');
    window.location.reload();
  };

  if (backendStatus === 'checking') {
    return <BackendConnectionCheck />;
  }

  if (backendStatus === 'error') {
    return <BackendError onRetry={handleRetryConnection} />;
  }

  if (authMode === 'landing') {
    return <ProfessionalLanding onGetStarted={handleGetStarted} onSignIn={handleSignIn} />;
  }

  if (authMode === 'login') {
    return <Login onLogin={handleLogin} onShowSignup={() => setAuthMode('signup')} />;
  }

  if (authMode === 'signup') {
    return <Signup onSignup={handleSignup} onBack={() => setAuthMode('login')} />;
  }

  // Handle standalone views separately
  switch (view) {
    case 'profile':
      return (
        <ProfessionalProfile 
          user={user} 
          onLogout={handleLogout}
          onProfileUpdate={handleProfileUpdate}
          onBack={() => setView('dashboard')}
        />
      );
    
    case 'pdf-learning':
      return (
        <PDFLearning 
          user={user} 
          onBack={() => setView('dashboard')}
          onQuizComplete={handleQuizComplete}
        />
      );
    
    case 'topic-learning':
      return (
        <TopicLearning 
          user={user} 
          onBack={() => setView('dashboard')}
          onQuizComplete={handleQuizComplete}
        />
      );
    
    default:
      // All other views are handled by ProfessionalDashboard
      return (
        <ProfessionalDashboard 
          user={user} 
          onLogout={handleLogout} 
          onViewChange={setView}
          initialView={view}
          onProfileClick={() => setView('profile')}
          onProfileUpdate={handleProfileUpdate}
          shouldRefresh={shouldRefreshDashboard}
          onRefreshComplete={() => setShouldRefreshDashboard(false)}
        />
      );
  }
}

export default App;