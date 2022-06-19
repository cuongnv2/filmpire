import React, { useState, useEffect } from 'react';
import { AppBar, IconButton, Toolbar, Drawer, Button, Avatar, useMediaQuery } from '@mui/material';
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';

import { Sidebar, Search } from '../index';
import useStyles from './styles';
import { fetchToken, createSessionId, movieApi } from '../utils';
import { setUser, userSelector } from '../../features/auth';

const Navbar = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const theme = useTheme();
  const { isAuthenticated, user } = useSelector(userSelector);
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem('request_token');
  let sessionId = localStorage.getItem('session_id');
  const dispatch = useDispatch();

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (!sessionId) { console.log('createSession'); sessionId = await createSessionId(); }
        const { data: userData } = await movieApi.get(`/account?session_id=${sessionId}`);
        dispatch(setUser(userData));
      }
    };
    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            style={{ outline: 'none' }}
            onClick={() => {}}
            className={classes.menuButton}
          >
            <Menu />
          </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            { theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 /> }
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button
                color="inherit"
                onClick={fetchToken}
              >Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={() => {}}
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
              >
                { !isMobile && <>My Movies &nbsp; </>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="avatar"
                  src="https://static.vecteezy.com/system/resources/previews/000/425/632/large_2x/avatar-icon-vector-illustration.jpg"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <div className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              classes={{ paper: classes.drawerPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>

              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
