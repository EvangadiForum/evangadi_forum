import React from 'react'
import module from "./header.module.css"
import evangadi from '../../../public/evangadi.png'
import { Link } from 'react-router-dom'

function Header() {
  return (
      <>
          <div className={module.header}>
              <div className={module.logo}>
                  <img src={evangadi} alt="" />
              </div>

              <div className={module.text}>
                  <Link to="#" style={{textDecoration: "none", color: "rgba(0,0,0,.55)"}}>
                      <p>Home</p>
                  </Link>
                  <Link to="#" style={{ textDecoration: "none", color: "rgba(0,0,0,.55)", marginRight: "20px"}}>
                      <p>How it Works</p>
                  </Link>
              </div>

              <div className={module.btn}>
                  <Link to="/login">
                  <button>SIGN IN</button>
                  </Link>
              </div>
          </div>
      </>
  )
}

export default Header