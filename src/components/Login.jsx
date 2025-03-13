import React, { useState } from 'react';
import { userLogin } from '../api/auth';
import './login.css';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await userLogin(email,password);
      const { accessToken, refreshToken, user } = res;
      login(accessToken,refreshToken,user);
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