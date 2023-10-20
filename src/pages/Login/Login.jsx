// npm modules
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '/assets/logo.png'
import library from '/assets/library.jpg'

// services
import * as authService from '../../services/authService'

// css
import styles from './Login.module.css'

const LoginPage = ({ handleAuthEvt }) => {
  const navigate = useNavigate()

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      await authService.login(formData)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
    }
  }

  const { email, password } = formData

  const isFormInvalid = () => {
    return !(email && password)
  }

  return (
    <main className={styles.container}>
      <div className={styles.spacer}></div>
      <div className={styles.rightOverlay}>
      <Link to='/'>
      <img src={Logo} className={styles.logo} /></Link>
      <h1>Log In To Unlock <br /> Full Site Access</h1>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
      
          <input
            type="text"
            value={email}
            name="email"
            placeholder='Enter Your Email'
            onChange={handleChange}
          />

          <input
            type="password"
            value={password}
            name="password"
            placeholder='Enter Your Password'
            onChange={handleChange}
          />

        <div className={styles.buttonContainer}>
          <button className={styles.b68}  disabled={isFormInvalid()}>
            Log In
          </button>
        </div>
        <div>
          <Link to="/auth/signup" style={{ color: 'white' }} className={styles.b68}>Sign Up</Link>
        </div>
      </form>
      </div>
      <div className={styles.leftOverlay}>
      <img src={library} alt="Picture of a library" className={styles.leftImage}  />
      </div>
    </main>
  )
}

export default LoginPage
