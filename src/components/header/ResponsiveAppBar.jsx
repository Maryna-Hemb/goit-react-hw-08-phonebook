import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getIsLoggedIn, getUserEmail } from '../../redux/selectors';
import { logOut, refreshUser } from '../../redux/auth/authOperations';
import CircularProgress from '@mui/material/CircularProgress';

const isLoggedOutPages = [
  { name: 'Home', link: '/' },
  { name: 'Register', link: '/register' },
  { name: 'Login', link: '/login' },
];

const isLoggedInPages = [
  {
    name: 'Home',
    link: '/',
  },
  { name: 'Contacts', link: '/contacts' },
];
const settings = ['Logout'];

function ResponsiveAppBar() {
  const isloggedIn = useSelector(getIsLoggedIn);
  const userEmail = useSelector(getUserEmail);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const pages = isloggedIn ? isLoggedInPages : isLoggedOutPages;

  const handleOpenNavMenu = event => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = e => {
    setAnchorElNav(null);
    if (e.currentTarget.dataset.name === undefined) {
      return;
    }
    isloggedIn && dispatch(refreshUser(e.currentTarget.dataset.link));
    navigate(e.currentTarget.dataset.link);
  };

  const handleCloseUserMenu = e => {
    isloggedIn && dispatch(logOut());
    navigate('/');
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map(page => (
                  <MenuItem
                    key={page.name}
                    data-link={page.link}
                    data-name={page.name}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map(page => (
                <Button
                  key={page.name}
                  data-link={page.link}
                  data-name={page.name}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
            {isloggedIn && (
              <>
                <Box
                  sx={{
                    flexGrow: 0,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <Typography>{userEmail}</Typography>
                  <Button
                    key={settings}
                    onClick={handleCloseUserMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {settings}
                  </Button>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Suspense
        fallback={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <CircularProgress />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </>
  );
}
export default ResponsiveAppBar;
