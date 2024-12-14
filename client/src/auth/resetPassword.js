import React, { useState } from 'react';
import axios from 'axios';
import './pass.css';
import PasswordIcon from '@mui/icons-material/Password';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useSearchParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // Import NProgress styles
const ResetPassword = () => {
    const [error,  setError] = useState(false);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    NProgress.configure({ showSpinner: false });
     const navigate = useNavigate(); 

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('')

        if (isOffline) {
        setMessage('Please check your internet connection and try again.');
        setError(true)
        return;
        }

        if (newPassword !== confirmPassword) {
          setError(true);
        return setMessage('Passwords do not match.');
        }

        try {
           setLoading(true);
          setLoading(true);
        const res = await axios.post('https://note-app-backend-wzcl.onrender.com/reset-password', { token, newPassword });
        setMessage(res.data.message);
        setError(false)
         navigate('/signin');
        } catch (error) {
        setMessage(error.response?.data?.message || 'Something went wrong.');
        setError(true)
        }
        finally{
           setLoading(true);
            setLoading(false);
        }
    
    };


  return (
    <div className="auth_page">
      <div className="auth_left">
        <img src="/images/img-login-mern-project.png" className="auth_left_img" alt="auth_img" />
      </div>
      <div className="auth_right">
        <div className="auth_right_icon">
          <PasswordIcon sx={{ width: '50px', height: '50px' }} />
        </div>
        <div className="auth_text_container">
            <h2>Reset Password</h2>
        </div>
        <div className="auth_card">
          <form className="auth_form" onSubmit={handleSubmit}>
           <TextField
              id="New Password"
              label="New Password"
              variant="outlined"
              type={showNewPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowNewPassword} edge="end">
                      {showNewPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
                id="ConfirmPassword"
                label="Confirm Password"
                variant="outlined"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                margin="normal"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowConfirmPassword} edge="end">
                      {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button type="submit" className="auth_button" disabled={loading}>
              {loading ? 'Loading...' : 'Send'}
            </button>
            {message && <p style={{
              color: error ? 'red' : 'green',
              marginTop: '10px',
              textAlign:"center",
              fontSize:"0.8rem",
            }}>{message}</p>}
          </form>
        </div>
      </div>
    </div>
  );

}

export default ResetPassword;


