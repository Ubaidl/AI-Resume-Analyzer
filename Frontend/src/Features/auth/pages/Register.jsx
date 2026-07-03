import React from 'react'
import { useState } from 'react'
 import { Link,useNavigate } from "react-router";
import '../auth.form.scss'
import { useAuth } from "../hooks/useAuth.js";





   

const Register = () => {
    const navigate = useNavigate()
  const {loading,handleRegister} = useAuth()  // Destructure the loading state and handleRegister function from the useAuth hook
  const [name,setName] =useState('')  // State to hold the name input value
  const [email,setEmail] =useState('')  // State to hold the email input value
  const [password,setPassword] =useState('')  // State to hold the password input value

  const handlesubmit = async (e) => {
  e.preventDefault()
  try {
    await handleRegister(name, email, password)
    navigate('/login')  // redirect only if registration succeeded
  } catch (error) {
    console.error(error)  // registration failed — stay on page, maybe show error to user
  }
}




  return (

    <div className="login">
      <div className="login__container">

        <div className="login__header">
          <h1>Create Account</h1>
          <p>Create your Resume Analyzer account</p>
        </div>

        <form className="login__form" onSubmit={handlesubmit}>
            <div className="form__group">
            <label>Name</label>
            <input onChange={(e)=>setName(e.target.value)}
              type="text"
              placeholder="Enter your name"
            />
          </div>

          <div className="form__group">
            <label>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)}
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form__group">
            <label>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">
            Create Account
          </button>

          <div className="login__footer">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Register;
