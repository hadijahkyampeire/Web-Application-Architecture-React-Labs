import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { userLogin } from '../api/auth';
import { useAuth } from '../context/AuthContext';
import './login.css';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await userLogin(email,password);
      login(response.accessToken, response.refreshToken)
    } catch(e) {
      setError(e.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input 
            name="email" 
            type="text" 
            value={email} 
            required
            onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>password:</label>
          <input 
            name="password" 
            type="password" 
            required
            value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button  
            className='login-btn' 
            type="submit" 
            disabled={loading}> 
            {loading ? "Logging in..." : "Login"}
          </button>
      </form>
    </div>
  )
}

export default Login