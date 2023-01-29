import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import "./AuthForm.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = (event: React.FormEvent) => {
    //Prevent page reload
    event.preventDefault();
    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA202RIlw0U5sfWqJIl1vf6iSisUa-WRwg';
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA202RIlw0U5sfWqJIl1vf6iSisUa-WRwg'
    }
    fetch(url,
    {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      setIsLoading(false);
      if (res.ok) {
        return res.json();
      } else {
        return res.json().then(data => {
          let errorMessage = 'Authentication failed';
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
        })
      }
    }).then(data =>{
      if (isLogin) {
        dispatch({type: 'LOGIN', tokenId: data.idToken, expire: data.expiresIn, setTimer: logoutAfterExpirationTime});
        history.replace('/');
      } else {
        changeAuthModeHandler();
      }
    }).catch(err => alert(err.message));
  };

  const logoutAfterExpirationTime = ()=> {
    dispatch({type: 'LOGOUT'});
  }

  const changeAuthModeHandler = () => {
    setIsLogin(previousState => !previousState);
  };

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="email">Your Email </label>
          <input type="email" id="email" required ref={emailInputRef}/>
        </div>
        <div className="input-container">
          <label htmlFor="password">Password </label>
          <input type="password" id="password" required ref={passwordInputRef}/>
        </div>
        <div className="button-container">
         {!isLoading &&  <button className="button-submit">
            {isLogin ? "Login" : "Create Account"}
          </button>}
          {isLoading && <p className="loading-text">Sending Requset....</p>}
          <button
            className="button-toggle"
            type="button"
            onClick={changeAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="auth">
      <div className="auth-form">
        <div className="title">{isLogin ? "Login" : "Sign Up"}</div>
        {renderForm}
      </div>
    </div>
  );
}

export default AuthForm;
