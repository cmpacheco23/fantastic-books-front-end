// npm modules
import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// services
import * as authService from '../../services/authService'

// css
import styles from './Signup.module.css'
import Logo from '/assets/logo.png'

const Signup = ({ handleAuthEvt }) => {
  const navigate = useNavigate()
  const imgInputRef = useRef(null)

  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
  })
  const [photoData, setPhotoData] = useState({ photo: null })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = evt => {
    setMessage('')
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleChangePhoto = evt => {
    const file = evt.target.files[0]
    let isFileInvalid = false
    let errMsg = ""
    const validFormats = ['gif', 'jpeg', 'jpg', 'png', 'svg', 'webp']
    const photoFormat = file.name.split('.').at(-1)

    // cloudinary supports files up to 10.4MB each as of May 2023
    if (file.size >= 10485760) {
      errMsg = "Image must be smaller than 10.4MB"
      isFileInvalid = true
    }
    if (!validFormats.includes(photoFormat)) {
      errMsg = "Image must be in gif, jpeg/jpg, png, svg, or webp format"
      isFileInvalid = true
    }
    
    setMessage(errMsg)
    
    if (isFileInvalid) {
      imgInputRef.current.value = null
      return
    }

    setPhotoData({ photo: evt.target.files[0] })
  }

  const handleSubmit = async evt => {
    evt.preventDefault()
    try {
      if (!import.meta.env.VITE_BACK_END_SERVER_URL) {
        throw new Error('No VITE_BACK_END_SERVER_URL in front-end .env')
      }
      setIsSubmitted(true)
      await authService.signup(formData, photoData.photo)
      handleAuthEvt()
      navigate('/')
    } catch (err) {
      console.log(err)
      setMessage(err.message)
      setIsSubmitted(false)
    }
  }

  const { name, email, password, passwordConf } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf)
  }

  return (
    <main className={styles.container}>
      <div className={styles.spacer}></div>
      <div className={styles.leftOverlay}>
      <Link>
        <img src={Logo} className={styles.logo} alt="logo" />
      </Link>
      <h1>Sign Up For Full Access</h1>
      <h4>Already have an account?</h4>
      <Link to='/auth/login'>Login</Link>
      <p className={styles.message}>{message}</p>
      <form autoComplete="off" onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
  
          <input type="text" value={name} name="name" 
            placeholder='Enter Your Name'onChange={handleChange} />
        </label>
        <label className={styles.label}>
      
          <input
            type="text"
            value={email}
            onChange={handleChange}
            name="email"
            placeholder='Enter Your Email'
          />
        </label>
        <label className={styles.label}>

          <input
            type="password"
            value={password}
            name="password"
            placeholder='Enter A Password'
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
  
          <input
            type="password"
            value={passwordConf}
            name="passwordConf"
            placeholder='Confirm Your Password'
            onChange={handleChange}
          />
        </label>
        <label className={styles.label}>
    
          <input 
            type="file" 
            name="photo" 
            onChange={handleChangePhoto}
            ref={imgInputRef}
          />
        </label>
        <div>
          <Link to="/">Cancel</Link>
          <button
            className={`${styles.button} ${styles.b68}`}
            disabled={ isFormInvalid() || isSubmitted }
          >
            {!isSubmitted ? 'Sign Up' : '🚀 Sending...'}
          </button>
        </div>
      </form>
      </div>
      <div className={styles.rightOverlay}>
        </div>
    </main>
  )
}

export default Signup
