import React, { useState } from "react";
import Navigation from '../components/Navigation';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [registerCity, setRegisterCity] = useState('Montpellier');
  const [UserRegisterMessage, setUserRegisterMessage] = useState('');
  const [PassRegisterMessage, setPassRegisterMessage] = useState('');
  const [PassUnmatchedMessage, setPassUnmatchedMessage] = useState('');
  const [registerUname, setRegisterUname] = useState('');
  const [registerPass, setRegisterPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [registerBool, setRegisterBool] = useState(false);
  const [unbool, setUnbool] = useState(false);

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();
    if (registerPass !== confirmPass) {
      setUnbool(true)
      return setPassUnmatchedMessage(" is-danger");
    }
    console.log(registerCity)
    axios({
      method: "post",
      url: "http://localhost:3000/api/user/register/",
      headers: { "Content-Type": "application/json" },
      data: {
        "username": registerUname,
        "password": registerPass,
        "ville": registerCity,
      }
    })
      .then(function (response) {
        localStorage.setItem('token', response.data.user.token);
        setIsSubmitted(true);
      })
      .catch(function (error) {
        console.log(error);
        setRegisterBool(true);
        setPassRegisterMessage(" is-danger");
        setUserRegisterMessage(" is-danger");
      });
  };

  const handleRegisterKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleRegister(event);
    }
  };

  const renderUnmatchedPass = (bool) => {
    if (bool === true)
      return (
        <div className="field">
          Passwords don't match!
        </div>
      )
  };

  const renderErrorMessage = (bool) => {
    if (bool === true)
      return (
        <div className="field">
          Wrong Password or username
        </div>
      )
  };

  const renderForm = (
    <div>
      <Navigation />
      <div className="column is-half is-offset-one-quarter divider">
        <div className="field notcentered">
          <label className="label">Username</label>
          <div className="control">
            <input className={"input" + UserRegisterMessage} type="text" onKeyDown={handleRegisterKeyDown} onChange={event => setRegisterUname(event.target.value)} placeholder="ex: Owen Bolling" required />
          </div>
        </div>
        <div className="field notcentered">
          <label className="label">Password</label>
          <p className="control">
            <input className={"input" + PassRegisterMessage} type="password" onKeyDown={handleRegisterKeyDown} onChange={event => setRegisterPass(event.target.value)} placeholder="Password" required />
            {renderErrorMessage(registerBool)}
          </p>
        </div>
        <div className="field notcentered">
          <label className="label">Confirm Password</label>
          <p className="control">
            <input className={"input" + PassUnmatchedMessage} type="password" onKeyDown={handleRegisterKeyDown} onChange={event => setConfirmPass(event.target.value)} placeholder="Password" required />
            {renderUnmatchedPass(unbool)}
          </p>
        </div>
        <div className="field notcentered">
          <label className="label">Epitech Campus</label>
          <div class="select">
            <select onChange={(e) => setRegisterCity(e.target.value)}>
              <option>Montpellier</option>
              <option>Bordeaux</option>
              <option>Bruxelles</option>
              <option>La Réunion</option>
              <option>Lille</option>
              <option>Cotonou</option>
              <option>Berlin</option>
              <option>Barcelone</option>
              <option>Toulouse</option>
              <option>Strasbourg</option>
              <option>Rennes</option>
              <option>Paris</option>
              <option>Nice</option>
              <option>Nantes</option>
              <option>Nancy</option>
              <option>Mulhouse</option>
              <option>Moulins</option>
              <option>Marseille</option>
              <option>Lyon</option>
              <option>Other</option>
            </select>
          </div>
        </div>
      </div>
      <div className="field">
        <p className="control divider">
          <button className="button is-success is-rounded" onClick={handleRegister}>
            Register
          </button>
        </p>
      </div>
      <p>
        Already have a account? {" "}
        <Link exact="true" className="blue" to="/signin">
          <span className="blue">Sign In</span>
        </Link>
      </p>
    </div >
  );

  return (
    <div className="app">
      <div className="header">
        {isSubmitted ? navigate("../../") : renderForm}
      </div>
    </div>
  );
};

export default Register;
