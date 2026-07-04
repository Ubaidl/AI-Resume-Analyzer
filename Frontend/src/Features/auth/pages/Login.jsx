import React from 'react'
import { useState } from 'react'



 import { Link , useNavigate} from "react-router";
import '../auth.form.scss'
import { useAuth } from "../hooks/useAuth.js";










const Login = () => {



  const navigate = useNavigate()  // Get the navigate function from the useNavigate hook

  const {loading,handleLogin} = useAuth()  // Destructure the loading state and handleLogin function from the useAuth hook

  const [email,setEmail] =useState('')  // State to hold the email input value
  const [password,setPassword] =useState('')  // State to hold the password input value
  const [error, setError] = useState('');



 const handlesubmit = async (e) => {
  e.preventDefault();

  // Check if email or password is empty
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

try {
  await handleLogin(email, password);
  navigate("/");
} catch (error) {
  console.log(error);

  if (error?.message) {
    alert(error.message);
  } else {
    alert("Something went wrong.");
  }
}
};




  return (
    <div className="login">
      <div className="login__container">

        <div className="login__header">
          <h1>Welcome Back</h1>
          <p>Login to continue to Resume Analyzer</p>
        </div>

        <form className="login__form" onSubmit={handlesubmit}
        >

          <div className="form__group">
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)}  // Update the email state on input change

              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="form__group">
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)}  // Update the password state on input change
            
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit">
            Login
          </button>

          <div className="login__footer">
            <span>Don't have an account?</span>
            <Link to="/register">Create Account</Link>
          </div>

        </form>

      </div>
    </div>
  );
};

export default Login;
