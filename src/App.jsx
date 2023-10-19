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
import BlogList from './pages/BlogList/BlogList'
import BlogDetails from './pages/BlogDetails/BlogDetails';
import * as blogService from './services/blogService'
import NewBlog from './pages/NewBlog/NewBlog'
import EditBlog from './pages/EditBlog/EditBlog'

import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser());
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([])

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

    useEffect(() => {
      const fetchAllBlogs = async () => {
        const data = await blogService.index()
        setBlogs(data)
      }
      fetchAllBlogs()
    }, [])

    const handleAddBlog = async (blogFormData) => {
      const newBlog = await blogService.create(blogFormData)
      setBlogs([newBlog, ...blogs])
      navigate('/blogs')
    }

    const handleUpdateBlog = async (blogFormData) => {
      const updatedBlog = await blogService.update(blogFormData)
      setBlogs(blogs.map((b) => blogFormData._id === b._id ? updatedBlog : b))
      navigate('/blogs')
    }

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
        <Route
          path="/blogs"
          element={
              <BlogList blogs={blogs} user={user} handleAddBlog={handleAddBlog}/>
          }
        />
        <Route
          path="/blogs/:blogId"
          element={
              <BlogDetails/>
          }
        />
        <Route 
          path="/blogs/:blogId/edit" 
          element={
            <ProtectedRoute user={user}>
              <EditBlog handleUpdateBlog={handleUpdateBlog} />
            </ProtectedRoute>
          } 
        />
      </Routes>       
    </>
  );
}

export default App;
