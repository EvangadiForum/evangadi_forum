import React, { useRef } from 'react'
import axios from '../axiosConfig/AxiosConfig'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const emailDom = useRef(null)
  const passwordDom = useRef(null)
  

  async function handleSubmit(e) {
    e.preventDefault()
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      alert('Please provide all the information required')
      return;
    }
    try {
      await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue
      })

      navigate("/")
      } catch (error) {
        alert('Something went wrong. Please try again!')
        console.log(error.response.data)
      }
    }

  return (
    <>
          <section>
              <form onSubmit={handleSubmit}>
                  <div>
                      <span>Email :---</span>
                      <input ref={emailDom} type="email" placeholder='email' />
                  </div>
                  <br />
                  <div>
                      <span>Password :---</span>
                      <input ref={passwordDom} type="password" placeholder='password' />
                  </div>
                  <button type='submit'>Login</button>
        </form>
        <Link to={'/register'}>Register</Link>
          </section>
      </>
  )
}

export default Login