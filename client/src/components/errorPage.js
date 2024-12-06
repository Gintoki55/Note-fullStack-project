import React from 'react';
import { Button } from '@mui/material';
import FmdBadIcon from '@mui/icons-material/FmdBad';
import { useNavigate } from 'react-router-dom';
import './styles/errorPage.css'; // Import the CSS file for styling

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <FmdBadIcon sx={{
        fontSize: 80,
        color: '#0056b3',
        marginBottom: '10px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}/>
      <h1>Oops! Page Not Found</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <Button 
        variant="contained" 
        onClick={() => navigate('/signIn')}
        sx={{
            color: '#0056b3',
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: '#0056b3',
              color: 'white',
            },
  
        }}
      >
        Go Back Home
      </Button>
    </div>
  );
}

export default ErrorPage;
