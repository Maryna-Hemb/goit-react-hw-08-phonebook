import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getIsLoggedIn, getUserName } from '../redux/selectors';

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(getIsLoggedIn);
  const userName = useSelector(getUserName);
  const onSignUp = () => {
    navigate('/register');
  };
  const onLogIn = () => {
    navigate('/login');
  };
  const onContacts = () => {
    navigate('/contacts');
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="xl"
        sx={{ bgcolor: '#cfe8fc', height: '100vh', position: 'relative' }}
      >
        <Box
          sx={{
            backgroundColor: 'primary.dark',
            position: 'absolute',
            top: '40%',
            left: '50%',
            transform: 'translate(-50%, -40%)',
            padding: '3%',
            borderRadius: 7,
          }}
        >
          {isLoggedIn ? (
            <>
              <Typography
                textAlign="center"
                sx={{ fontSize: 18, color: '#ffff' }}
              >
                Welcome {userName}
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '3%',
                  marginTop: '10%',
                }}
              >
                <Button
                  variant="contained"
                  onClick={onContacts}
                  sx={{ borderRadius: 3 }}
                >
                  Start working
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography
                textAlign="center"
                sx={{ fontSize: 18, color: '#ffff' }}
              >
                Welcome! Register or log in to continue...
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '3%',
                  marginTop: '10%',
                }}
              >
                <Button
                  variant="contained"
                  onClick={onLogIn}
                  sx={{ borderRadius: 3 }}
                >
                  Log In
                </Button>
                <Button
                  variant="contained"
                  onClick={onSignUp}
                  sx={{ borderRadius: 3 }}
                >
                  Sign Up
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </React.Fragment>
  );
}
