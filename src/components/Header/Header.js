import React from 'react'
import { useNavigate, NavLink } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";

import './header.css';
import { auth } from '../../firebase';

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth); 
  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
      console.log("Signed out successfully")
    }).catch((error) => {
    });
  }

  return (
    <nav>

      <div className='header_wrapper'>
        <div className='header_title'>
          <h1 className='header_title'>Kanban board</h1>
        </div>
        {user ? (
          <>
            <p className='user_email'>User's email:</p>
            <span className='email'>{user.email}</span>

            <button className='logout_btn' onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <NavLink to='/login' className='login_title'>Sign in</NavLink>
            <NavLink to='/signup' className='signup_title'>Sign Up</NavLink>
          </>
        )}
      </div>

    </nav>
  )
}

export default Header
