import React, { useState } from "react";
import Login from "../login/Login";
import Signup from "../../pages/singnup/Signup";
import "./Landing.css";

function Landing() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="landing-wrapper">
      {/* LEFT SIDE: Your existing Login or Signup component */}
      <div className="landing-left">
        <div className="auth-container">
          {/* Your ORIGINAL components render here unchanged */}
          {showLogin ? <Login /> : <Signup />}

          {/* Toggle between Login and Signup */}
          <div className="toggle-section">
            {showLogin ? (
              <p className="toggle-text">
                Don't have an account?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setShowLogin(false)}
                >
                  Create one
                </span>
              </p>
            ) : (
              <p className="toggle-text">
                Already have an account?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </span>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: About section (stays visible) */}
      <div className="landing-right">
        <div className="about-content">
          <p className="about-label">About</p>
          <h2 className="about-title">EvaFor Q&A</h2>
          <p className="about-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
            numquam quas recusandae facere adipisci amet consectetur iste ab
            asperiores, harum, ipsum, reiciendis atque facilis qui labore enim
            totam magni esse!
          </p>
          <p className="about-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
            nam sunt quo blanditiis voluptas maxime beatae animi molestias
            architecto alias commodi quas, consectetur cum accusamus temporibus
            aspernatur! Voluptas, modi nisi.
          </p>
          <p className="about-text">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
            ab, ad voluptatum cupiditate blanditiis exercitationem ipsam.
            Incidunt, voluptatum minima facere quas vel fuga iusto optio
            deserunt magnam ipsa fugiat iure?
          </p>

          <button className="how-it-works-btn">How It Works</button>
        </div>
      </div>
    </div>
  );
}

export default Landing;

// import React, { useState } from "react";
// import Login from "../../pages/login/Login";
// import Signup from ".././singnup/Signup";
// import "./Landing.css";

// function Landing() {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="landing-wrapper">
//       {/* LEFT SIDE: Login or Signup */}
//       <div className="landing-left">
//         <div className="auth-container">
//           {showLogin ? (
//             <Login onToggle={() => setShowLogin(false)} />
//           ) : (
//             <Signup onToggle={() => setShowLogin(true)} />
//           )}

//           <div className="toggle-section">
//             {showLogin ? (
//               <p className="toggle-text">
//                 Don't have an account?{" "}
//                 <span
//                   className="toggle-link"
//                   onClick={() => setShowLogin(false)}
//                 >
//                   Create one
//                 </span>
//               </p>
//             ) : (
//               <p className="toggle-text">
//                 Already have an account?{" "}
//                 <span
//                   className="toggle-link"
//                   onClick={() => setShowLogin(true)}
//                 >
//                   Login
//                 </span>
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: About section (always visible) */}
//       <div className="landing-right">
//         <div className="about-content">
//           <p className="about-label">About</p>
//           <h2 className="about-title">EvaFor Q&A</h2>
//           <p className="about-text">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti
//             numquam quas recusandae facere adipisci amet consectetur iste ab
//             asperiores, harum, ipsum, reiciendis atque facilis qui labore enim
//             totam magni esse!
//           </p>
//           <p className="about-text">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
//             nam sunt quo blanditiis voluptas maxime beatae animi molestias
//             architecto alias commodi quas, consectetur cum accusamus temporibus
//             aspernatur! Voluptas, modi nisi.
//           </p>
//           <p className="about-text">
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae
//             ab, ad voluptatum cupiditate blanditiis exercitationem ipsam.
//             Incidunt, voluptatum minima facere quas vel fuga iusto optio
//             deserunt magnam ipsa fugiat iure?
//           </p>

//           <button className="how-it-works-btn">How It Works</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Landing;
