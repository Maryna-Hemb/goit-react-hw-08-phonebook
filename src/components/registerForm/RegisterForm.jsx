import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/authOperations';
import { useState } from 'react';

export const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const nameRegexp = /^[A-Za-z ][A-Za-z0-9_]{2,20}$/; //name must contain 1-19 symbols (A-Z,a-z,0-9)

export const passwordRegexp = /^[A-Za-z][A-Za-z0-9_]{6,19}$/; //password must contain 1-19 symbols (A-Z,a-z,0-9)

export const RegisterForm = () => {
  const [nameField, setName] = useState('');
  const [emailField, setEmail] = useState('');
  const [passwordField, setPassword] = useState('');
  const [nameError, setNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const handleChange = e => {
    const { name, value } = e.currentTarget;
    name === 'name' && setName(value);
    name === 'email' && setEmail(value);
    name === 'password' && setPassword(value);
    if (name === 'name') {
      let regName = new RegExp(nameRegexp).test(value);
      !regName && setNameError('name must contain 3-22 symbols (A-Z,a-z,0-9)');
      regName && setNameError(null);
    }
    if (name === 'email') {
      let regEmail = new RegExp(emailRegexp).test(value);
      !regEmail && setEmailError('Invalid email format');
      regEmail && setEmailError(null);
    }
    if (name === 'password') {
      let regPassword = new RegExp(passwordRegexp).test(value);
      !regPassword &&
        setPasswordError('password must contain 3-22 symbols (A-Z,a-z,0-9)');
      regPassword && setPasswordError(null);
    }
  };

  const dispatch = useDispatch();

  const handleSubmit = event => {
    event.preventDefault();
    const { name, email, password } = event.currentTarget.elements;
    console.log(name.value, email.value, password.value);

    dispatch(
      register({
        name: name.value,
        email: email.value,
        password: password.value,
      })
    );
    event.currentTarget.reset();
    setName('');
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
          paddingTop: 7,
          pl: '12%',
          pr: '12%',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
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
            error={Boolean(nameError)}
            helperText={nameError}
            autoComplete="given-name"
            name="name"
            type="text"
            required
            fullWidth
            id="name"
            label="Name"
            autoFocus
            value={nameField}
            onChange={handleChange}
          />
          <TextField
            error={Boolean(emailError)}
            helperText={emailError}
            required
            fullWidth
            label="Email Address"
            id="email"
            type="email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            value={emailField}
          />
          <Box
            sx={{
              position: 'relative',
            }}
          >
            <TextField
              error={Boolean(passwordError)}
              helperText={passwordError}
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
            disabled={Boolean(emailError)}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </Button>

          <Link href="/goit-react-hw-08-phonebook/login" variant="body2">
            {'Do you have an account? Log in'}
          </Link>
        </Box>
      </Box>
    </Container>
  );
};
