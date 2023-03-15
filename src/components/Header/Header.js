import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './header.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav>
        <div className='container'>
            <div className='header_wrapper'>
                <NavLink to='/kanban' className='header_title'>
                <BookmarkIcon className='icon_bookmark'/>
                <h1 className='header_title'>Kanban board</h1>
                </NavLink>
                <NavLink to='/login' className='login_title'>Sign in</NavLink>
                <NavLink to='/signup' className='signup_title'>Sign Up</NavLink>
            </div>
        </div>
    </nav>
  )
}

export default Header