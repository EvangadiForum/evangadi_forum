import React from 'react'
import module from './footer.module.css'
import evangadiwhite from '../../../public/evangadiwhite.png'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined'
import YouTubeIcon from '@mui/icons-material/YouTube'
import InstagramIcon from '@mui/icons-material/Instagram'
import { Link } from 'react-router-dom'


function Footer() {
  return (
      <>
          <div className={module.footer}>
              <div className={module.left}>
                  <div className={module.logo}>
                      <img src={evangadiwhite} alt="" />
                  </div>
                  <div className={module.socials}>
                      <Link to="#" style={{textDecoration: "none"}}>
                          <FacebookOutlinedIcon sx={{ color: '#fff', fontSize: 30 }} />
                          </Link>
                      <Link to="#" style={{textDecoration: "none"}}>
                          <InstagramIcon sx={{ color: '#fff', fontSize: 30 }} />
                          </Link>
                      <Link to="#" style={{textDecoration: "none"}}>
                          <YouTubeIcon sx={{ color: '#fff', fontSize: 30 }} />
                          </Link>
                  </div>
              </div>

              <div className={module.center}>
                  <div className={module.header}>Useful Links</div>
                  <div className={module.link} style={{ marginTop: "30px" }}>
                      <Link to="#" style={{textDecoration: "none", color: "#5A6171"}}>
                          <p>How it works</p>
                      </Link>
                  </div>
                  <div className={module.link}>
                      <Link to="#" style={{textDecoration: "none", color: "#5A6171"}}>
                          <p>Terms of service</p>
                          </Link>
                  </div>
                  <div className={module.link}>
                      <Link to="#" style={{textDecoration: "none", color: "#5A6171"}}>
                          <p>Privacy Policy</p>
                      </Link>
                  </div>
              </div>

              <div className={module.right}>
                  <div className={module.header}>Contact Info</div>
                  <div className={module.link} style={{ marginTop: "30px" }}>
                      <Link to="#" style={{textDecoration: "none", color: "#5A6171"}}>
                          <p>Evangadi Networks</p>
                      </Link>
                  </div>
                  <div className={module.link}>
                      <Link to="#" style={{textDecoration: "none", color: "#5A6171"}}>
                          <p>support@evangadi.com</p>
                      </Link>
                  </div>
                  <div className={module.link}>
                      <Link to="#" style={{textDecoration: "none", color: "#5A6171"}}>
                          <p>+1-202-386-2704</p>
                      </Link>
                  </div>
              </div>
          </div>
      </>
  )
}

export default Footer