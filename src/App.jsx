import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import * as authService from './services/authService';
import * as profileService from './services/profileService';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Landing from './pages/Landing/Landing';
import Profiles from './pages/Profiles/Profiles';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import BookSearch from './pages/BookSearch/BookSearch';
import AboutUs from './pages/AboutUs/AboutUs';
import ProfileInfo from './pages/ProfileInfo/ProfileInfo';
import Logout from './pages/Logout/Logout';
import Signup from './pages/Signup/Signup';

import Login from './pages/Login/Login';
import BookDetails from './pages/BookDetails/BookDetails';


import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser());
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();


  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleAuthEvt = () => {
    setUser(authService.getUser());
  };

  useEffect(() => {
    if (user && user.profileId) {
      profileService.getOneProfile(user.profileId).then((profileData) => {
        setProfile(profileData);
      });
    }
  }, [user]);



  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles profile={profile} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:profileId"
          element={
            <ProtectedRoute user={user}>
              <ProfileInfo />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route path="/auth/logout" element={<Logout />} />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
              <BookSearch/>
          }
        />
        <Route 
        path="/books/:volumeId" 
        element={<BookDetails  user={user}/>} 
        />
        <Route 
        path="/about" 
        element={<AboutUs />} 
        />

      </Routes>       
    </>
  );
}

export default App;
