import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import '../App.css';
import logoimg from "./images/mobile_store.avif"
function Navbar() {
  const auth = localStorage.getItem('user');
  const navigate= new useNavigate();
  const logout=(()=>
  {
    //localStorage.clear()
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/singup');
  })
 
  return (
    <nav>
      <img className='logo' src={logoimg} alt="" />
        {auth ? <ul className='nev_ul'>
            <li><Link to='/'>Product</Link></li>
            <li><Link to='/add'>Add Product</Link></li>
            {/* <li><Link to='/update/:id'>Update product</Link></li> */}
            <li><Link to='/profile'>Profile</Link></li>
            <li><Link onClick={logout} to='/signup'>Log Out -({JSON.parse(auth).name}) </Link></li>

        </ul>:
        <ul className='nev_ul nav-right'>
              <li><Link to='/login'>Login</Link></li>
              <li><Link to='/signup'>Sign Up</Link></li>
        </ul>}
    </nav>
  )
}

export default Navbar
