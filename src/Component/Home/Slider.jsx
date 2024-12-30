import React, {useState} from 'react'
import {Navigate } from 'react-router-dom';
import { useAuth } from "../stores/Auth";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { FaBox } from "react-icons/fa6";
import { FaChartBar } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { MdAddBusiness } from "react-icons/md";
import { AiFillFileAdd } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { PiImageDuotone } from "react-icons/pi";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdOutlinePostAdd } from "react-icons/md";
import Home from './Home';
import List from '../Show/List';
import AddForm from '../Fill/AddForm';
import Register from '../Auth/Register';
import AddBlog from '../Fill/AddBlog';
import Setting from '../Fill/Setting';
import ListUser from '../Show/ListUser';
import Logout from '../Logout';
const Slider = () => {
  const {isLoggedIn, storeTokenInLs} = useAuth();
  if(!isLoggedIn){
    return <Navigate to="/Login"/>
  }
    const [show, setShow] = useState (false);
      const [state, setState] = useState('dashboard')
      const name = import.meta.env.VITE_COMPANY_NAME;
      const handleInput = async(e) =>{
        setState(e)
      }
  return (
    <>
    <div style={{ zIndex: 2000, overflowY: "auto" }} className={show ? "show sidebar" : "sidebar"} id="sidebar">
    <div className="text-center py-3">
      <h4>{name}</h4>
    </div>
    <div onClick={()=>handleInput('dashboard')} className="active clickit"><MdOutlineDashboard /> &nbsp; Dashboard</div>
    <div onClick={()=>handleInput('products')} className="clickit"><MdOutlineProductionQuantityLimits /> &nbsp; Products</div>
    <div onClick={()=>handleInput('users')} className="clickit"><FaUsers /> &nbsp; Users</div>
    <div onClick={()=>handleInput('orders')} className="clickit"><FaBox />&nbsp; Orders</div>
    <div onClick={()=>handleInput('notifications')} className="clickit"><IoNotificationsOutline />&nbsp; notifications</div>
    <div onClick={()=>handleInput('student')} className="clickit"><FaChartBar /> &nbsp; Analytics</div>
    <div onClick={()=>handleInput('settings')} className="clickit"><IoMdSettings /> &nbsp; Settings</div>
    <div onClick={()=>handleInput('add product')} className="clickit"><MdAddShoppingCart />&nbsp; Add Product</div>
    <div onClick={()=>handleInput('add shopkeeper')} className="clickit"><MdAddBusiness /> &nbsp; Add Shopkeeper</div>
    <div onClick={()=>handleInput('add pages')} className="clickit"><AiFillFileAdd /> &nbsp; Add Pages</div>
    <div onClick={()=>handleInput('add banner')} className="clickit"><PiImageDuotone /> &nbsp; Add Banner</div>
    <div onClick={()=>handleInput('add blogs')} className="clickit"><MdOutlinePostAdd /> &nbsp; Add Blogs</div>
    <div onClick={()=>handleInput('Logout')} className="clickit"><BiLogOutCircle />&nbsp; Logout</div>
    <div onClick={()=>handleInput('Employee')} className="clickit"><BiLogOutCircle />&nbsp; Employee</div>
  </div>

  
  <div className="main-content">
    
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm mb-4">
      <div className="container-fluid">
        <a className="navbar-brand ms-3" href="#">Admin Panel</a>
        <button className="btn mx-2" onClick={() => setShow(!show)}>
        <GiHamburgerMenu />
        </button>
        <div className="d-flex align-items-center">
          <button onClick={()=>handleInput('notifications')} className="btn mx-2"><IoNotificationsCircleSharp /></button>
          <button onClick={()=>handleInput('dashboard')} className="btn mx-2"><CgProfile /></button>
          <button onClick={()=>handleInput('settings')} className="btn mx-2"><IoMdSettings /></button>
        </div>
      </div>
    </nav>
    {state === 'dashboard' ? (<Home/>):null}
    {state === 'Employee' ? (<Register/>):null}
    {state === 'add product' ? (<AddForm value={state}/>):null}
    {state === 'settings' ? (<Setting value={state}/>):null}
    {state === 'users' ? (<ListUser value={state}/>):null}
    {state === 'Logout' ? (<Logout value={state}/>):null}
    {(state === 'products') || (state === 'orders') || (state === 'notifications') ? (<List value={state}/>):null}
    {(state === 'add pages') || (state === 'add blogs')|| (state === 'add banner') ? (<AddBlog value={state}/>):null}
  {/* <Outlet/> */}
  </div>
  </>
  )
}

export default Slider