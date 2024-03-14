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
import {Link, useLocation} from "react-router-dom";
import '../../App.css';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {logout} from "../../features/usersSlice";

const AppToolbar = () => {
  const dispatch = useAppDispatch();
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
              location.pathname === '/new-application' ? 'Создание заявки' :
                location.pathname === '/sign-in' ? 'Логин' :
                  location.pathname === '/sign-up' ? 'Регистрация' :
                    location.pathname === '/my-applications' ? 'Мои заявки' : ''
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
                  <>
                    <Link to="/new-application">
                      <MenuItem onClick={handleClose}>Создать заявку</MenuItem>
                    </Link>
                    <Link to="/my-applications">
                      <MenuItem onClick={handleClose}>Мои заявки</MenuItem>
                    </Link>
                    <MenuItem onClick={() => dispatch(logout())}>Выйти из аккантуа</MenuItem>
                  </>
                  :
                  <>
                    <Link to="/sign-in">
                      <MenuItem onClick={handleClose}>Логин</MenuItem>
                    </Link>
                    <Link to="/sign-up">
                      <MenuItem onClick={handleClose}>Регистрация</MenuItem>
                    </Link>
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