import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import {
  Button,
  Collapse,
  FormGroup,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  TextField,
} from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import {
  LockOpen,
  PersonAdd,
  Visibility,
  VisibilityOff,
  Home,
} from '@material-ui/icons';
import { colPrimary, colSecondary } from '../../helpers/colors';
import { login, register } from '../../actions/auth';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    backgroundRepeat: 'repeat',
  },
  paper: {
    marginBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& p, h3, h4, h5, h6': {
      fontFamily: 'Raleway',
    },
  },
  authActionMobile: {
    display: 'flex',
    flexDirection: 'column',
    width: 250,
    alignItems: 'center',
    margin: '0 auto',
  },
  input: {
    width: '100%',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: colSecondary,
    '&:hover': {
      background: colPrimary,
    },
  },
}));

const Authenticate = ({ setAlert, register, isAuthenticated, login }) => {
  const classes = useStyles();
  const [authAction, setAuthAction] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    showPassword: false,
  });

  const [loginData, setLoginData] = useState({
    login_email: '',
    login_password: '',
  });

  const handleChange = (event, newValue) => {
    setAuthAction(newValue);
  };

  const { login_email, login_password } = loginData;
  const { name, email, password, confirm_password } = formData;

  if (isAuthenticated) {
    console.log('AUTH');
    return <Redirect to='/' />;
  }

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const submitRegister = () => {
    if (email === '' || name === '' || password === '') {
      setAlert('Please Fill Out All Fields', 'error');
    } else if (password !== confirm_password) {
      setAlert('Passwords Do Not Match', 'error');
    } else {
      register({ name, email, password });
    }
  };

  const submitLogin = async () => {
    if (login_email === '' || login_password === '') {
      setAlert('Please Enter Your Email & Password', 'error');
    } else {
      login(login_email, login_password);
    }
  };

  return (
    <Grid container alignItems='center' justify='center' alignContent='center'>
      <Grid item style={{ width: '70%' }} xs={10} sm={6}>
        <Paper elevation={2} className={classes.paper}>
          <Link
            to='/'
            style={{
              textAlign: 'center',
              width: '100%',
              textDecoration: 'none',
            }}
          >
            <IconButton>
              <Home />
            </IconButton>
          </Link>

          <Tabs
            value={authAction}
            onChange={handleChange}
            variant='fullWidth'
            TabIndicatorProps={{
              style: { backgroundColor: colSecondary },
            }}
          >
            <Tab icon={<LockOpen />} label='LOGIN' />
            <Tab icon={<PersonAdd />} label='REGISTER' />
          </Tabs>

          {/* LOGIN */}
          <Collapse in={authAction === 0} style={{ width: '50%' }}>
            <FormGroup fullWidth onSubmit={(e) => e.preventDefault()}>
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                onInput={(e) =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  })
                }
                id='login_email'
                label='Email Address'
                name='login_email'
                autoComplete='email'
                autoFocus
              />
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                name='login_password'
                label='Password'
                type='password'
                id='login_password'
                onInput={(e) =>
                  setLoginData({
                    ...loginData,
                    [e.target.name]: e.target.value,
                  })
                }
                autoComplete='current-password'
              />

              <Button
                type='submit'
                size='large'
                onClick={submitLogin}
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Login
              </Button>
            </FormGroup>
          </Collapse>

          {/* REGISTER */}
          <Collapse in={authAction === 1} style={{ width: '50%' }}>
            <FormGroup onSubmit={(e) => e.preventDefault()}>
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                onInput={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                id='name'
                label='Name'
                name='name'
                autoFocus
              />
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                onInput={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                id='email'
                label='Email Address'
                name='email'
                autoFocus
              />
              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type={formData.showPassword ? 'text' : 'password'}
                id='password'
                onInput={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                      >
                        {formData.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                className={classes.input}
                margin='normal'
                required
                fullWidth
                name='confirm_password'
                label='Confirm Password'
                type={formData.showPassword ? 'text' : 'password'}
                id='confirm_password'
                onInput={(e) =>
                  setFormData({ ...formData, [e.target.name]: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='toggle password visibility'
                        onClick={handleClickShowPassword}
                      >
                        {formData.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type='submit'
                onClick={submitRegister}
                fullWidth
                variant='contained'
                color='primary'
                className={classes.submit}
              >
                Register
              </Button>
            </FormGroup>
          </Collapse>
        </Paper>
      </Grid>
    </Grid>
  );
};

Authenticate.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, login, register })(
  Authenticate
);
