import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdSettings } from 'react-icons/io'
import { IoNotificationsCircleSharp } from 'react-icons/io5'
import { FaPhoneAlt } from "react-icons/fa";
const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
        <div className="container-fluid">
          <a className="navbar-brand ms-3" href="#">Admin Panel</a>
          <button className="btn mx-2" onClick={() => setShow(!show)}>
          <GiHamburgerMenu />
          </button>
          <div className="d-flex align-items-center">
            <button className="btn mx-2"><IoNotificationsCircleSharp /></button>
            <button className="btn mx-2"><CgProfile /></button>
            <button className="btn mx-2"><IoMdSettings /></button>
          </div>
        </div>
      </nav>
  )
}

export default Nav