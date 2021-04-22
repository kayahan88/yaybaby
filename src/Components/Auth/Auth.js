import React, {useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {loginUser, registerUser} from '../../redux/reducer';
import './Auth.css';
import axios from 'axios';

const Auth = () => {

    const [loginView, setLoginView] = useState('hide');
    const [signUpView, setSignUpView] = useState('hide');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profilePic, setProfilePic] = useState(null);

    const dispatch = useDispatch();
    
    const toggleLoginView = () => {
        if(loginView === 'hide'){
            setLoginView('show')
        } else {
            setLoginView('hide')
        }
        setSignUpView('hide')
    };

    const toggleSignUpView = () => {
        if(signUpView === 'hide'){
            setSignUpView('show')
        } else {
            setSignUpView('hide')
        }
        setLoginView('hide')
    };

    function login(){
        // console.log('logging in Auth.js')
        axios.post('/api/auth/login', {email, password})
        .then(res => {
            dispatch(loginUser(res.data))
            setIsAuthenticated(true)
        })
        .catch(err => {
            console.log(err)
        })
    };

    function register(){
        console.log('registering in Auth.js');
        axios.post('/api/auth/register', {email, password, firstName, lastName})
        .then(res => {
            registerUser({email, password, firstName, lastName, profilePic})
            toggleSignUpView();
            toggleLoginView();
        })
        .catch(err => {
            console.log(err)
        })
        
    }

    return (
        <div className="auth">
            {/* <img className='background-image' src='https://media.istockphoto.com/photos/baby-girl-bathes-in-a-bath-with-foam-and-soap-bubbles-picture-id1141213432?k=6&m=1141213432&s=612x612&w=0&h=iAOLqLT0FnvH4T-fIwLp2VXlxzUOt8DMzwP3ATNqTAg=' /> */}
            <div className='stack'>
                <img className='background-image' src='https://cdn.shopify.com/s/files/1/1514/4868/products/Baby_in_bath_1_bee5017c-eadc-4a55-83cf-1e283aa3dbc2.jpg?v=1602799348' />
                <div className='layer'></div>
                <div className='layer2'></div>
                <div className='caption-tag'>
                    <div className='caption-gif'>April 16th, 2021<br></br>Baby's first bubble bath</div>
                </div>
                
            </div>
            <header className='auth-header'>
                <h1 className='header'>YayBaby</h1>
                {/* <br></br> */}
                <p className='celebrate'>Celebrate your baby's milestones</p>
            </header>
            {isAuthenticated ? (
            <Redirect to='/home' />
            ) : null}
            <section className="main">
                <div className='box'>
                    <div className='login-box'>
                        <p className='box-p'>Already have an account? Log in here:</p>
                        <button 
                            onClick={toggleLoginView} 
                            className={loginView==='show' ? 'login-button-hide' : 'login-button'}>
                                Log in
                        </button>
                        {loginView==='show' ? (
                                <form id='loginform' className='login-form'>
                                    <div className='data-entry'>
                                        <p>Email: </p>
                                        <input value={email} onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div className='data-entry'>
                                        <p>Password: </p>
                                        <input type='password' value={password} onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                    <button type='button' className='login-button-2' onClick={login}>Log In</button>
                                </form>
                        ) : null}
                    </div>
                    <br></br>
                    <div className='signup-box'>
                        <p className='box-p'>Create a new account here:</p>
                        <button 
                            onClick={toggleSignUpView}
                            className={signUpView==='show' ? 'signup-button-hide' : 'signup-button'}>
                                Sign Up
                        </button>
                        {signUpView==='show' ? (
                                    <form id='signupform' className='signup-form'>
                                    <div className='data-entry'>
                                        <p>First Name: </p>
                                        <input onChange={e => setFirstName(e.target.value)}/>
                                    </div>
                                    <div className='data-entry'>
                                        <p>Last Name: </p>
                                        <input onChange={e => setLastName(e.target.value)}/>
                                    </div>
                                    <div className='data-entry'>
                                        <p>Email: </p>
                                        <input onChange={e => setEmail(e.target.value)}/>
                                    </div>
                                    <div className='data-entry'>
                                        <p>Create a password: </p>
                                        <input type='password' onChange={e => setPassword(e.target.value)}/>
                                    </div>
                                
                                        <button type='button' className='signup-button-2' onClick={register}>Sign Up</button>
                                        
                                    
                                </form>
                        ) : null}
                    </div>
                </div>
            </section>
            <div className='text'>
                <p>Capture your baby's proudest achievements with <span className='yaybaby-p'>YayBaby</span> and be able to share these special milestones with loved ones and look back on them for years to come.</p>
            </div>
        </div>
    )
}


export default Auth; 
