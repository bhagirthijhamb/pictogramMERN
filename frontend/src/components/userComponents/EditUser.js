import Grid from '@material-ui/core/Grid';
import { useState, useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Link, useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { AppContext } from './../../context/appContext';
import { SET_USER, SET_USER_POSTS } from '../../context/types';

const useStyles = makeStyles(theme => ({
  editProfile: {
    width: "100%",
    padding: "1rem",
    marginTop: 50
  },
  userDetail: {
    display: "flex",
    alignItems: "Center"
  },
  label: {
    width: "40%",
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: 40
  },
  formField: {
    width: "60%"
  },
  submit: {
    marginTop: 10,
    display: "block",
    margin: "0 auto"
  },
  name: {
    fontWeight: 'bold'
  },
  subtitle: {
    fontWeight: 'bold'
  },
  input: {
      display: 'none',
  },
  button: {
    border: "1px solid #84A1A8"
  }
}))

const EditUser = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext); 
  const [ websitee, setWebsitee ] = useState('');
  const [ bioo, setBioo ] = useState('');
  const [ image, setImage ] = useState('');
  const [ imgUrl, setImgUrl ] = useState('');

  const history = useHistory();
  
  const { credentials: {name, imageUrl, bio, website, email, followers, following}, myPosts } = state.user;
  // console.log(followers, following)
  
  useEffect(() => {
    setImgUrl(imageUrl ? imageUrl : '')
    setWebsitee(website ? website : '');
    setBioo(bio ? bio : '')
  },[])

  async function updatePhoto (file) {
    setImage(file);
  }

  useEffect(async() => {
    if(image){
      try {
        const data = new FormData()
        data.append('file', image);
        data.append('upload_preset', "pictogram");
        data.append('cloud_name', 'dbagdzszp');
        const response = await fetch('https://api.cloudinary.com/v1_1/dbagdzszp/image/upload', {
            method: 'post',
            body: data
        })
        const dataBack = await response.json();
        if(dataBack){
            console.log(dataBack);
            setImgUrl(dataBack.url);
            console.log(dataBack);
        }
      } catch(err){
          console.log(err);
      }
    }
  }, [image])

  async function handleSubmit(e){
      e.preventDefault();
      if(imgUrl){
      try {
          const url = `/api/users/user/editProfile`;
          const method = 'PUT';
          const response = await fetch(url, {
              method,
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ 
                imageUrl: imgUrl,
                website: websitee,
                bio: bioo 
              })
          })
          const data = await response.json();
          console.log(data)
          
          if(!response.ok) {
              throw new Error()
          }
          if(response.ok){
              dispatch({
                type: SET_USER,
                payload: data
            })
            history.push('/user');
          }
      } catch(err){
          console.log(err)
      }
    }
  }       

  return (
    // <div className="classes root container">
    <Grid container spacing={4}>
      <Grid item sm={2} xs={12}>
      </Grid>
      <Grid item sm={8} xs={12} container>
        <div className={classes.editProfile}>
          <h3>Edit User Profile</h3>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            {/* Image */}
            <div className={classes.userDetail}>
              <div className={classes.label}>
                <img style={{width: '100px', height: '100px', borderRadius: '80px'}} src={imageUrl}/>
              </div>
              <div className={classes.formField}>
                <Typography variant="h5" className={classes.name}>{name}</Typography>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="raised-button-file"
                    multiple
                    type="file"
                    // onChange={(e) => setImage(e.target.files[0])}
                    onChange={(e) => updatePhoto(e.target.files[0])}
                />
                <label htmlFor="raised-button-file">
                    <Button raised component="span" 
                    className={classes.button}
                    >
                    Change Photo
                    </Button>
                </label>
              </div>
            </div>
            {/* Website */}
            <div className={classes.userDetail}>
              <div className={classes.label}>
                <Typography variant="subtitle1" className={classes.subtitle}>Website</Typography>
              </div>
              <div className={classes.formField}>
                <TextField
                  variant="outlined" margin="normal" fullWidth id="email" 
                  label="Website" name="email" autoComplete="email" autoFocus
                  value={websitee} 
                  // helperText={errors.email} error={errors.email ? true : false}
                  onChange={(e) => { setWebsitee(e.target.value); }}
                />
              </div>
            </div>
            {/* Bio */}
            <div className={classes.userDetail}>
              <div className={classes.label}>
                <Typography variant="subtitle1" className={classes.subtitle}>Bio</Typography>
              </div>
              <div className={classes.formField}>
                <TextField variant="outlined" name="body" type="text" label="Bio" multiline rows="2" placeholder="Bio"  
                value={bioo} 
                className="textField" 
                onChange={(e) => { setBioo(e.target.value)}} 
                fullWidth />
              </div>
            </div>
            
            <Button
              type="submit"
              // fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
      <Grid item sm={2} xs={12}>
          {/* <h2>Follows..</h2> */}
      </Grid>
    </Grid>
  // </div>
  )
}

export default EditUser;