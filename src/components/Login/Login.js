// import React, { useState } from 'react';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { NavLink, useNavigate } from 'react-router-dom'
// import { auth } from '../../firebase';

// import './Login.css'

// const Login = () => {
//     const navigate = useNavigate();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const onLogin = (e) => {
//         e.preventDefault();
//         signInWithEmailAndPassword(auth, email, password)
//             .then((userCredential) => {
//                 // Signed in
//                 const user = userCredential.user;
//                 navigate("/kanban")
//                 console.log(user);
//             })
//             .catch((error) => {
//                 const errorCode = error.code;
//                 const errorMessage = error.message;
//                 console.log(errorCode, errorMessage)
//             });
//     }

//     return (
//         <>
//             <main >
//                 <section className='login'>
//                     <div className='container'>
//                         <div className='login_wrapper'>
//                             <form>
//                                 <div>
//                                     <label htmlFor="email-address" className='label'>
//                                         Email address
//                                     </label>
//                                     <input
//                                         className='login_input'
//                                         id="email-address"
//                                         name="email"
//                                         type="email"
//                                         required
//                                         placeholder="Email address"
//                                         onChange={(e) => setEmail(e.target.value)}
//                                     />
//                                 </div>

//                                 <div>
//                                     <label htmlFor="password"
//                                         className='label'>
//                                         Password
//                                     </label>
//                                     <input
//                                         className='login_input'
//                                         id="password"
//                                         name="password"
//                                         type="password"
//                                         required
//                                         placeholder="Password"
//                                         onChange={(e) => setPassword(e.target.value)}
//                                     />
//                                 </div>

//                                 <div>
//                                     <button
//                                         className='login_btn'
//                                         onClick={onLogin}
//                                     >
//                                         Login
//                                     </button>
//                                 </div>
//                                 <p className="helper-descr">
//                                     No account yet? {' '}
//                                     <NavLink to="/signup" className='signup_helper'>
//                                         Sign up
//                                     </NavLink>
//                                 </p>
//                             </form>



//                         </div>
//                     </div>
//                 </section>
//             </main>
//         </>
//     )
// }

// export default Login



import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import './Login.css'

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { signIn } = UserAuth();


    const onLogin = async (e) => {
        e.preventDefault();
        setError('')
        try {
            await signIn(email, password)
            navigate('/kanban')
        } catch (e) {
            setError(e.message)
        }
    };



    return (
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
                                    autoComplete="off"
                                    required
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            {
                                error && <p className='login_error'>{error}</p>

                            }
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
    );
};

export default Signin;


// // import React from 'react';
// // import { useCallback } from 'react'
// // import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// // const Login = () => {
// //   const handleSubmit = useCallback(async e => {
// //     e.preventDefault()

// //     const { email, password } = e.target.elements
// //     const auth = getAuth()
// //     try {
// //       await signInWithEmailAndPassword(auth, email.value, password.value)
// //     } catch (e) {
// //       alert(e.message)
// //     }
// //   }, [])

// //   return (
// //     <>
// //       <h1>Login</h1>
// //       <form onSubmit={handleSubmit}>
// //         <input name="email" placeholder="email" type="email" />
// //         <input name="password" placeholder="password" type="password" />
// //         <button type="submit">Login</button>
// //       </form>
// //     </>
// //   )
// // }
// // export default Login