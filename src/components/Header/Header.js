import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import './header.css';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     signOut(auth).then(() => {
//       // Sign-out successful.
//       navigate("/login");
//       console.log("Signed out successfully")
//     }).catch((error) => {
//       // An error happened.
//     });


//   }
//   return (
//     <nav>
//         <div className='container'>
//             <div className='header_wrapper'>
//                 <NavLink to='/kanban' className='header_title'>
//                 <BookmarkIcon className='icon_bookmark'/>
//                 <h1 className='header_title'>Kanban board</h1>
//                 </NavLink>
//                 <NavLink to='/login' className='login_title'>Sign in</NavLink>
//                 <NavLink to='/signup' className='signup_title'>Sign Up</NavLink>
//                 <button className='logout_btn' onClick={handleLogout}>Log out</button>
//             </div>
//         </div>
//     </nav>
//   )
// }

// export default Header


import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
  const navigate = useNavigate();
  const [user, loading] = useAuthState(auth); // Add this line to retrieve the currently authenticated user

  const handleLogout = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/login");
      console.log("Signed out successfully")
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <nav>

            <div className='header_wrapper'>
                <NavLink to='/kanban' className='header_title'>
                <h1 className='header_title'>Kanban board</h1>
                </NavLink>
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
