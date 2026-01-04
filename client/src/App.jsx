import React, { useEffect, useState, createContext } from 'react'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from './pages/axiosConfig/AxiosConfig'

export const AppState = createContext()
  

function App() {
  const [user, setUser] = useState({})
  const navigate = useNavigate()


  const token = localStorage.getItem("token")
  async function checkUser(params) {
    try {
      const { data } = await axios.get("/user/check", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUser(data)
    } catch (error) {
      console.log(error)
      navigate("/login")
    }
  }
  useEffect(() => {
    checkUser()
  }, [])
  return (
    <>
      <AppState.Provider value={{user, setUser}}>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </AppState.Provider>
    </>
  )
}

export default App