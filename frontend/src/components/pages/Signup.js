import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { AppContext } from './../../context/appContext';
import { SET_ERRORS, LOADING_UI, CLEAR_ERRORS } from '../../context/types';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = ({ getUser, updateUser}) => {
  const classes = useStyles();
  const [ state, dispatch ] = useContext(AppContext);
  const [ name, setName ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ errors, setErrors ] = useState({});

  useEffect(() => {
    if(state.ui.errors){
      dispatch({ type: CLEAR_ERRORS });
      setErrors(state.ui.errors)
    }
  }, [state.ui.errors])

  async function signupUser(){
    try {
      dispatch({ type: LOADING_UI });
      const url = '/api/users/';
      const method = 'POST';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password })
      })

      const data = await response.json();

      if(!response.ok){
        dispatch({
          type: SET_ERRORS,
          payload: data
        })
      }

      async function loginUser(){
        try {
          const loginResponse = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          })
        } catch (err){
          console.log(err);
          dispatch({
            type: SET_ERRORS,
            payload: err
          })
        }
      }
      // call loginUser
      loginUser()
      // call getUser() from App.js
      getUser()
    } catch(err){
      console.log(err);
      dispatch({
        type: SET_ERRORS,
        payload: err
      })
    }
  } 

  async function handleSubmit(e){
    e.preventDefault();
    signupUser();
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="lname"
                helperText={errors.name} 
                error={errors.name ? true : false}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                helperText={errors.email} 
                error={errors.email ? true : false}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={errors.password} 
                error={errors.password ? true : false}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <p>By signing up, you agree to our Terms , Data Policy and Cookies Policy .</p>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  )
}

export default SignUp;
