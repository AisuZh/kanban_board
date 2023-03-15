import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase';

import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                navigate("/kanban")
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage)
            });
    }

    return (
        <>
            <main >
                <section className='login'>
                    <div className='container'>
                        <div className='login_wrapper'>
                            <form>
                                <div>
                                    <label htmlFor="email-address" className='label'>
                                        Email address
                                    </label>
                                    <input
                                        className='login_input'
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password"
                                        className='label'>
                                        Password
                                    </label>
                                    <input
                                        className='login_input'
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <button
                                        className='login_btn'
                                        onClick={onLogin}
                                    >
                                        Login
                                    </button>
                                </div>
                                <p className="helper-descr">
                                    No account yet? {' '}
                                    <NavLink to="/signup" className='signup_helper'>
                                        Sign up
                                    </NavLink>
                                </p>
                            </form>



                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login