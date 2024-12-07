import React, { useState , useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './auth.css';
function SignUp() {
    const navigate = useNavigate(); // Initialize navigation
    const [IsSign, setIsSign] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies(['access_token']);
    const [isOffline, setIsOffline] = useState(!navigator.onLine);
    const apiBaseUrl = "https://note-backend-tgdq.onrender.com";

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

    try {
      setLoading(true);

      if (isOffline) {
        setError('Please check your internet connection and try again.');
        return;
      }
      
      // Make API call
      const response = await axios.post(apiBaseUrl, {
       username, email, password
      });
      
      setCookie('access_token', response.data.token, { expires: new Date(Date.now() + 3600000) });
      localStorage.setItem('user', JSON.stringify(response.data));
      localStorage.setItem('IsSign', 'true');
      setIsSign(true);
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


  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  useEffect(() => {
    if (cookies.access_token) {
        navigate('/dashboard');
    }
  }, [cookies, navigate, IsSign]);


  return (
   <div className="auth_page">
      <div className="auth_left">
          <img src="/images/img-login-mern-project.png" className='auth_left_img' alt='auth_img'/>
      </div>
      <div className="auth_right">
          <div className="auth_text_container">
          <h2>Hello, Friend!</h2>
          <p>Enter your personal details and start your journey with us today.</p>
        </div>
        <div className="auth_card">
          <form className="auth_form" onSubmit={handleSubmit}>

          <TextField 
            id="username" 
            label="username" 
            variant="outlined" 
            type="text" 
            fullWidth 
            margin="normal" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
                      <IconButton
                        onClick={handleShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            <button type="submit" className="auth_button" disabled={loading}>
              {loading ? 'Loading...' : 'Sign up'}
            </button>
            {error && <p className="signIn_erorr_message">{error}</p>}
          </form>
            <p className="auth_redirect">
            Already have an account? <Link to="/signin">Login</Link>
            </p>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default SignUp;
