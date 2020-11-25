import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../assets/logo.png';
import Button from '@material-ui/core/Button';
import { login, logout } from '../../actions/auth';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { Grid, Grow } from '@material-ui/core';
import { Spin as Hamburger } from 'hamburger-react';
import { Link } from 'react-router-dom';
import { colPrimary } from '../../helpers/colors';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

const Navbar = ({ user, isAuthenticated, logout }) => {
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
          backgroundColor: colPrimary,
          height: '100px',
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
            <Grid item xs={3} sm={2}>
              <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>
                <img src={logo} height={50} alt='logo' />
              </Link>
            </Grid>

            <Grid item xs={2} sm={5} />

            <Grid item xs={6} sm={4}>
              {isAuthenticated & (user != null) ? (
                <Grid container justify='flex-end' xs={10} sm={12}>
                  <img
                    src={user.avatar}
                    width={60}
                    height={60}
                    alt={'avatar'}
                    style={{ borderRadius: '200px' }}
                  />
                </Grid>
              ) : (
                <Grid container justify='flex-end'>
                  <Link
                    to='/authenticate'
                    style={{ textDecoration: 'none', color: 'white' }}
                  >
                    <Button color='inherit'>Sign In</Button>
                  </Link>
                </Grid>
              )}
            </Grid>
            <Grid container xs={1} justify='center'>
              <Button
                size='small'
                onClick={handleClick}
                style={{ borderRadius: '200px' }}
              >
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
                <Link
                  to='/favourites'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem onClick={handleClose}>Favourites</MenuItem>
                </Link>

                <MenuItem
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
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
