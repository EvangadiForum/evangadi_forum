import React, { useRef } from 'react'
import axios from '../axiosConfig/AxiosConfig'
function Register() {
    const userNameDom = useRef(null)
    const firstNameDom = useRef(null)
    const lastNameDom = useRef(null)
    const emailDom = useRef(null)
    const passwordDom = useRef(null)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await axios.post('/users/register', {
                username: "",
                firstname: "",
                lastname: "",
                email: "",
                password: ""
            })
        } catch (error) {
            
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
          </section>
      </>
  )
}

export default Register