import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/auth/authOperations';
import { useState } from 'react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';

export const LogInForm = () => {
  const [emailField, setEmail] = useState('');
  const [passwordField, setPassword] = useState('');
  // const [emailError, setEmailError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'email' && setEmail(value);
    name === 'password' && setPassword(value);
  };

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const { email, password } = event.currentTarget.elements;

    console.log(email.value, password.value);

    dispatch(
      logIn({
        email: email.value,
        password: password.value,
      })
    );
    event.currentTarget.reset();
    setEmail('');
    setPassword('');
  };

  return (
    <Container
      component="main"
      maxWidth="xl"
      sx={{
        bgcolor: '#cfe8fc',
        height: '100vh',
        position: 'relative',
        paddingTop: 7,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pl: '12%',
          pr: '12%',
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            mt: 1,
            display: 'grid',
            flexDirection: 'column',
            gap: 2,
            width: '100%',
          }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
            value={emailField}
          />
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="new-password"
              onChange={handleChange}
              value={passwordField}
            />

            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
              sx={{
                position: 'absolute',
                top: 10,
                right: 20,
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            // disabled={Boolean(emailError)}
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>

          <Link href="/goit-react-hw-08-phonebook/register" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
