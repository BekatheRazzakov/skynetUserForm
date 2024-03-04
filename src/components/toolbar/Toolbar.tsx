import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useLocation} from "react-router-dom";
import '../../App.css';
import {useAppSelector} from "../../app/hooks";

const AppToolbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const userToken = useAppSelector((state) => state.userState.user);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {
              location.pathname === '/form' ? 'Форма' :
                location.pathname === '/sign-in' ? 'Логин' :
                  location.pathname === '/sign-up' ? 'Регистрация' : ''
            }
          </Typography>
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {
                userToken ?
                  <MenuItem onClick={handleClose}>Выйти из аккантуа</MenuItem>
                  :
                  <>
                    <MenuItem onClick={handleClose}>Логин</MenuItem>
                    <MenuItem onClick={handleClose}>Регистрация</MenuItem>
                  </>
              }
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;