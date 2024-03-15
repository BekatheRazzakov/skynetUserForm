import * as React from 'react';
import {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Button, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {logout} from "../../features/usersSlice";
import '../../App.css';

const AppToolbar = () => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState(false);
  const location = useLocation();
  const userToken = useAppSelector((state) => state.userState.user);

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
            {
              location.pathname === '/new-application' ? 'Создание заявки' :
                location.pathname === '/sign-in' ? 'Логин' :
                  location.pathname === '/sign-up' ? 'Регистрация' :
                    location.pathname === '/my-applications' ? 'Мои заявки' :
                      location.pathname === '/neactivka' ? 'Неактивка' : ''
            }
          </Typography>
          {
            userToken &&
            <>
              <div className="nav-links">
                <Link to="/new-application">
                  <Button variant="contained" className="nav-link" disableElevation>Создать заявку</Button>
                </Link>
                <Link to="/my-applications">
                  <Button variant="contained" className="nav-link" disableElevation>Мои заявки</Button>
                </Link>
                <Link to="/neactivka">
                  <Button variant="contained" className="nav-link" disableElevation>Неактивка</Button>
                </Link>
                <Link to="/neactivka">
                  <Button variant="contained" className="nav-link" disableElevation>Жалоба абонентов</Button>
                </Link>
                <Button
                  variant="contained" color="error" className="nav-link"
                  onClick={() => dispatch(logout())}
                  style={{ backgroundColor: 'rgba(255,69,69,0.48)' }}
                  disableElevation>Выйти из аккаунта</Button>
              </div>
              <div className="nav-links-mobile">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="open drawer"
                  sx={{height: '48px'}}
                  onClick={() => setAnchorEl(true)}
                >
                  <MenuIcon/>
                </IconButton>
                <Drawer
                  anchor="right"
                  open={anchorEl}
                  onClose={() => setAnchorEl(false)}
                  className="mobile-nav-bar"
                >
                  <List
                    sx={{width: '250px', height: '100%', display: 'flex', flexDirection: 'column'}}
                    onClick={() => setAnchorEl(false)}
                  >
                    <Link to="/new-application">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Создать заявку"/>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link to="/my-applications">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Мои заявки"/>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link to="/neactivka">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Неактивка"/>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Link to="/neactivka">
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemText primary="Жалоба абонентов"/>
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <ListItem disablePadding sx={{ marginTop: 'auto' }}>
                      <Button
                        sx={{ width: '100%' }}
                        color="error" onClick={() => dispatch(logout())}>
                        Выйти из аккаунта
                      </Button>
                    </ListItem>
                  </List>
                </Drawer>
              </div>
            </>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default AppToolbar;