import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Toaster, toast } from 'react-hot-toast';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './auth.css';

function SignIn() {

  const navigate = useNavigate(); 
  const [cookies, setCookie] = useCookies(['access_token']);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast('You are back online!', {
        icon: '🌐',
        style: { background: 'green', color: '#fff' },
      });
    };

    const handleOffline = () => {
      setIsOffline(true);
      toast('You are offline!', {
        icon: '🌐',
        style: { background: 'red', color: '#fff' },
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (isOffline) {
      setError('Please check your internet connection and try again.');
      return;
    }
    

    try {
      setLoading(true);
      
      // Make API call
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password,
      });

      // Successful response handling
      setCookie('access_token', response.data.token, { expires: new Date(Date.now() + 3600000) });
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('isLoggedIn', 'true');
      setError(''); // Clear error message on success
    } catch (error) {
      // Error handling
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'An error occurred. Please try again.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } finally {
      // Ensure loading state is reset
      setLoading(false);
    }
};


  useEffect(() => {
    if (cookies.access_token) {
        navigate('/dashboard');
    }
  }, [cookies, navigate, isLoggedIn]);


  return (
    <div className="auth_page">
      <div className="auth_left">
        <img src="/images/img-login-mern-project.png" className="auth_left_img" alt="auth_img" />
      </div>
      <div className="auth_right">
        <div className="auth_right_icon">
          <LogoutOutlinedIcon sx={{ width: '50px', height: '50px' }} />
        </div>
        <div className="auth_text_container">
          <h2>Welcome Back!</h2>
          <p>Please enter your details.</p>
        </div>
        <div className="auth_card">
          <form className="auth_form" onSubmit={handleSubmit}>
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <button type="submit" className="auth_button" disabled={loading}>
              {loading ? 'Loading...' : 'Login'}
            </button>
            {error && <p className="signIn_erorr_message">{error}</p>}
          </form>
          <p className="auth_redirect">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default SignIn;