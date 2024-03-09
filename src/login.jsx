import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function LogIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setOpacity(1);
    }, 400);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const form = Object.fromEntries(formData.entries());
    const sendForm = { ...form, 'login': 1 };

    try {
      const res = await fetch("https://house-prediction-backend.onrender.com", {
        method: e.target.method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendForm)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Failed to login");
      }
      else {
        if ('error' in data) {
          setErrorMessage(data.error);
        }
        else {
          if(data.login) {
            setOpacity(0);
            setTimeout(() => {
              navigate("/redirect");
            }, 2400);
          }
        }
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function handleSignUp() {
    setTimeout(() => {
      setOpacity(0);
    }, 400);
    setTimeout(() => {
      navigate("/sign-up");
    }, 2500);
  }

  return (
    <div className="login-super-container" style={{height: '94.7vh'}}>
      <center><h1 style={{opacity: opacity}}>House Pricing Prediction Model</h1></center>
      <div className="login-container" style={{opacity: opacity}}>
        <form method="post" onSubmit={handleSubmit} className="login-form">
          <label className="login-label">Username: </label><input type="text" name="username" className="login-input"/>
          <br />
          <label className="login-label">Password:</label> <input type="password" name="password" className="login-input"/>
          <button type="submit" className="login-button">Submit</button>
          <button type="button" onClick={handleSignUp} className="login-button">Sign Up</button>
        {errorMessage && (
          <div className="errormsg" style={{color: 'red'}}>
            {errorMessage}
          </div>
        )}
        </form>
      </div>
    </div>
  )
}

export default LogIn;
