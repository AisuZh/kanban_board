import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  createUserWithEmailAndPassword  } from 'firebase/auth';
import { auth } from '../../firebase';

import './SignUp.css'

const SignUp = () => {
    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log(user);
            navigate("/kanban")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
 
   
    }
 
  return (
    <main >        
        <section>
            <div className='container'>
                <div className='signup_wrapper'>                  
                    <form>                                                                                            
                        <div >
                            <label htmlFor="email-address"
                            className='label'>
                                Email address
                            </label>
                            <input
                            className='signup_input'
                                type="email"
                                label="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}  
                                required                                    
                                placeholder="Email address"                                
                            />
                        </div>

                        <div>
                            <label htmlFor="password"
                              className='label'>
                                Password
                            </label>
                            <input
                            className='signup_input'
                                type="password"
                                label="Create password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} 
                                required                                 
                                placeholder="Password"              
                            />
                        </div>                                             
                        
                        <button
                        className='signup_btn'
                            type="submit" 
                            onClick={onSubmit}                        
                        >  
                            Sign up                                
                        </button>
                        <p className='helper-descr'>
                        Already have an account?{' '}
                        <NavLink to="/login" className='signup_helper'>
                            Sign in
                        </NavLink>
                    </p>                                   
                    </form>
                   
                            
                </div>
            </div>
        </section>
    </main>
  )
}
 
export default SignUp