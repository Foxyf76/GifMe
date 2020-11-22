import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { login, logout } from '../../actions/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Grid, Grow } from '@material-ui/core';
import { Spin as Hamburger } from 'hamburger-react';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Navbar = ({ setAlert, user, isAuthenticated, logout }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div className={classes.root} style={{ paddingBottom: '40px' }}>
      <AppBar
        position='static'
        style={{
          backgroundColor: 'rgb(40, 40, 180)',
        }}
      >
        <Toolbar
          style={{
            width: '65%',
            margin: 'auto',
          }}
        >
          <Grid
            container
            spacing={0}
            alignItems='center'
            justify='center'
            direction='row'
          >
            <Grid item xs={2}>
              <h2>GifMe</h2>
            </Grid>

            <Grid item xs={5} />

            <Grid item xs={4}>
              {isAuthenticated & (user != null) ? (
                <Grid container justify='flex-end'>
                  <Typography style={{ padding: '10px' }}>
                    <h1>authenticated name</h1>
                  </Typography>
                  <Button color='inherit' onClick={() => logout()}>
                    Log Out
                  </Button>
                </Grid>
              ) : (
                <Grid container justify='flex-end'>
                  <Button color='inherit'>Login</Button>
                </Grid>
              )}
            </Grid>
            <Grid container xs={1} justify='center'>
              <Button size='small' onClick={handleClick}>
                <Hamburger
                  size={25}
                  toggled={open}
                  toggle={() => setOpen(!open)}
                  color='white'
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={open}
                onClose={handleClose}
                transitionDuration={500}
                TransitionComponent={Grow}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { setAlert, login, logout })(Navbar);
