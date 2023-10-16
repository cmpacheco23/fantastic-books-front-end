// npm modules
import { useState } from 'react'
import { Routes, Route, useNavigate, useParams } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import BookSearch from './pages/BookSearch/BookSearch'
import AboutUs from './pages/AboutUs/AboutUs'
import ProfileInfo from './pages/ProfileInfo/ProfileInfo'
import Logout from './pages/Logout/Logout'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as googleService from './services/googleService'

// styles
import './App.css'
import BookDetails from './pages/BookDetails/BookDetails'

function App() {
  const [allBooks, setAllBooks] = useState([]);
  const [formData, setFormData] = useState({ searchTerm: '' });

  const handleBookSearch = async (formData) => {
    const bookData = await googleService.bookSearch(formData);
    setAllBooks(bookData);
  };

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (formData.searchTerm) {
      await handleBookSearch(formData);
    }
  };

  const [user, setUser] = useState(authService.getUser());
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate('/');
  };

  const handleAuthEvt = () => {
    setUser(authService.getUser());
  };

  return (
    <>
      {/* <div className={styles.spacer}></div> */}
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
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
        <Route
          path="/auth/logout"
          element={<Logout/>}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path='/books'
          element={
            <BookSearch
              allBooks={allBooks}
              handleBookSearch={handleBookSearch}
            />
          }
        />
        <Route 
          path='/books/:bookId'
          element={<BookDetails />} 
        />
        <Route 
          path='/about'
          element={<AboutUs/>} 
        />
      </Routes>
      <div>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            name="searchTerm"
            autoComplete="off"
            value={formData.searchTerm}
            onChange={handleChange}
            placeholder='Search for a book'
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  )
}

export default App
