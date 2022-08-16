import { useState } from 'react'
import { SignInUser } from '../../services/Auth'
import { useNavigate } from 'react-router-dom'
import './signin.css'

const SignIn = ({ setUser, toggleAuthenticated }) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    setUser(payload)
    toggleAuthenticated(true)
    navigate('/dashboard')
  }

  return (
    <div className="signinPage">
      <div className="card-overlay centered">
        <form className="signInForm" onSubmit={handleSubmit}>
          <div className="input-wrapper">
          <h3 id="signInTitle">Sign In</h3>
            <label htmlFor="email">Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="example@example.com"
              value={formValues.email}
              id="signInValues"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              value={formValues.password}
              id="signInValues"
              required
            />
          </div>
          <button id="signInButton" disabled={!formValues.email || !formValues.password}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignIn
