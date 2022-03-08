import React, { useState } from "react";
import Navigation from '../components/Navigation';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [UserLoginMessage, setUserLoginMessage] = useState('');
  const [PassLoginMessage, setPassLoginMessage] = useState('');
  const [loginUname, setLoginUname] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginBool, setLoginBool] = useState(false);

  const navigate = useNavigate();

  const renderErrorMessage = (bool) => {
    if (bool === true)
      return (
        <div className="field">
          Wrong Password or username
        </div>
      )
  };

  const handleLoginKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin(event);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    axios({
      method: "post",
      url: "http://localhost:3000/api/user/login/",
      headers: { "Content-Type": "application/json" },
      data: {
        "username": loginUname,
        "password": loginPass,
      }
    })
      .then((response) => {
        console.log("caca");
        localStorage.setItem('token', response.data.user.token);
        setIsSubmitted(true);
      })
      .catch((error) => {
        setLoginBool(true);
        setUserLoginMessage(" is-danger");
        setPassLoginMessage(" is-danger");
      });
  };

  const renderForm = (
    <div>
      <Navigation />
      <div className="column is-half is-offset-one-quarter divider">
        <div className="field notcentered">
          <label className="label">Username</label>
          <div className="control">
            <input className={"input" + UserLoginMessage} type="text" onKeyDown={handleLoginKeyDown} onChange={event => setLoginUname(event.target.value)} placeholder="ex: Owen Bolling" required />
          </div>
        </div>
        <div className="field notcentered">
          <label className="label">Password</label>
          <p className="control">
            <input className={"input" + PassLoginMessage} type="password" onKeyDown={handleLoginKeyDown} onChange={event => setLoginPass(event.target.value)} placeholder="Password" required />
            {renderErrorMessage(loginBool)}
          </p>
        </div>
      </div>
      <div className="field">
        <p className="control divider">
          <button className="button is-success is-rounded" onClick={handleLogin}>
            Login
          </button>
        </p>
      </div>
      <p>
        Not register already? {" "}
        <Link exact="true" to="/register">
          <span className="blue">Register</span>
        </Link>
      </p>
    </div >
  );

  return (
    <div className="app">
      <div className="header">
        {isSubmitted ? navigate("../") : renderForm}
      </div>
    </div>
  );
};

export default SignIn;
