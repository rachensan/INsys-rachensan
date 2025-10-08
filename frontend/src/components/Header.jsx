import React from "react";
import { LogoutSpan } from "./Logout";

export const AboutComponent = () => {
  return (
    <>
    
    </>
  )
}












function HeaderTeacher() {
    return (
        <>
        {/* <!-- header start --> */}
        <header className="teacher-home-main-header">
          <div className = "teacher-home-header-logo" >
            <img src="/images/insys-logo.webp" alt="logo" />
          </div>
  
          <div className="teacher-home-spacer"></div>
          <nav>
            <ul>
              <li className="nav-item">
                <span>About</span>
                <ul className="teacher-home-header-dropdown">
                  <li><span>About Us</span></li>
                  <li><span>Terms and Conditions</span></li>
                </ul>
              </li>
              <li className="nav-item">
                <span>Settings</span>
                <ul className="teacher-home-header-dropdown">
                  <li><span>Account</span></li>
                  <li><span>Theme</span></li>
                </ul>
              </li>
              <li className="nav-item">
                <span>Logout</span>
                <ul className="teacher-home-header-dropdown">
                  <li>
                    <LogoutSpan className="dropdown-logout-btn"/>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        {/* <!-- header end --> */}
        </>
    )
}

export const HeaderStudent = () => {
    return (
        <>
        {/* <!-- header start --> */}
        <header className="teacher-home-main-header">
          <div className = "teacher-home-header-logo" >
            <img src="/images/insys-logo.webp" alt="logo" />
          </div>
  
          <div className="teacher-home-spacer"></div>
          <nav>
            <ul>
              <li className="nav-item">
                <span>About</span>
                <ul className="teacher-home-header-dropdown">
                  <li><span>About Us</span></li>
                  <li><span>Terms and Conditions</span></li>
                </ul>
              </li>
              <li className="nav-item">
                <span>Settings</span>
                <ul className="teacher-home-header-dropdown">
                  <li><span>Account</span></li>
                  <li><span>Theme</span></li>
                </ul>
              </li>
              <li className="nav-item">
                <span>Logout</span>
                <ul className="teacher-home-header-dropdown">
                  <li>
                    <LogoutSpan className="dropdown-logout-btn"/>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </header>
        {/* <!-- header end --> */}
        </>
    )
}

export default HeaderTeacher;