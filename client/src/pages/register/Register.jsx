import React, { useRef } from 'react'
import axios from '../axiosConfig/AxiosConfig'
import { Link, useNavigate } from 'react-router-dom'
function Register() {
    const navigate = useNavigate()
    const userNameDom = useRef(null)
    const firstNameDom = useRef(null)
    const lastNameDom = useRef(null)
    const emailDom = useRef(null)
    const passwordDom = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault()
        const usernameValue = userNameDom.current.value;
        const firstnameValue = firstNameDom.current.value;
        const lastnameValue = lastNameDom.current.value;
        const emailValue = emailDom.current.value;
        const passwordValue = passwordDom.current.value;

        if (!usernameValue || !firstnameValue || !lastnameValue || !emailValue || !passwordValue) {
            alert('Please provide all the information required')
            return;
        }
        try {
            const { data } = await axios.post('/users/register', {
                username: usernameValue,
                firstname: firstnameValue,
                lastname: lastnameValue,
                email: emailValue,
                password: passwordValue
            })
            localStorage.setItem("token", data.token)
            // navigate("/login")
        } catch (error) {
            alert('Something went wrong. Please try again!')
            onsole.log(error.response.data)
        }
    }
  return (
      <>
          <section>
              <form onSubmit={handleSubmit}>
                  <div>
                      <span>username :---</span>
                      <input ref={userNameDom} type="text" placeholder='username' />
                  </div>
                  <br />
                  <div>
                      <span>First name :---</span>
                      <input ref={firstNameDom} type="text" placeholder='first name' />
                  </div>
                  <br />
                  <div>
                      <span>Last name :---</span>
                      <input ref={lastNameDom} type="text" placeholder='last name' />
                  </div>
                  <br />
                  <div>
                      <span>Email :---</span>
                      <input ref={emailDom} type="email" placeholder='email' />
                  </div>
                  <br />
                  <div>
                      <span>Password :---</span>
                      <input ref={passwordDom} type="password" placeholder='password' />
                  </div>
                  <button type='submit'>Register</button>
              </form>
              <Link to={'/login'}>Login</Link>
          </section>
      </>
  )
}

export default Register