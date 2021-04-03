import Grid from '@material-ui/core/Grid';
import { useContext, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { AppContext } from './../../context/appContext';
import { SET_USER, SET_USER_POSTS } from '../../context/types';

const useStyles = makeStyles(theme => ({
  profilePageTop: {
    display: "flex",
    borderBottom: "1px solid grey",
    width: "100%",
    padding: "30px 0px"
  },
  name_editProfile: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  profileImage: {
    marginRight: '70px',
    marginLeft: '50px'
  },
  profileDetails: {
    width: '40%'
  },
  profileDetailsNumbers: {
    marginTop: 15,
    display: "flex",
    justifyContent: 'space-between',
  },
  profilePageGallery: {
    display: 'flex',
    flexWrap: "wrap",
    justifyContent: 'space-around',
    padding: "20px 0px"
  },
  profilePageGalleryImage: {
    width: "30%"
  },
  website_bio: {
    marginTop: 15,
    paddingLeft: 10
  },
  website: {
    fontWeight: 'bold',
    color: '#CC616E'
  }
}))

const User = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext); 

  const getMyProfile = useCallback(async function() {
    try {
    const response = await fetch('/api/users/myProfile', {
      headers: {
        credentials: 'include',
      },
    })
    const json = await response.json();
    if(!response.ok){
      throw new Error(json.message);
    }
    dispatch({
      type: SET_USER,
      payload: json.user
    })
    dispatch({
      type: SET_USER_POSTS,
      payload: json.userPosts
    })
    } catch (err) {
      console.log({ err });
    }
  }, [])

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile])

  const { credentials: {name, imageUrl, bio, website, email, followers, following}, myPosts } = state.user;
  console.log(followers, following)

  return (
    <div className="classes root container">
      <Grid container spacing={4}>
        <Grid item sm={1} xs={12}>
        </Grid>
        <Grid item sm={10} xs={12} container>
          <div className={classes.profilePageTop}>
            <div className={classes.profileImage}>
                <img style={{width: '150px', height: '150px', borderRadius: '80px'}} src={imageUrl}/>
            </div>  
            <div className={classes.profileDetails}>
              <div className={classes.name_editProfile}>
                <Typography variant="h4">{name}</Typography>
                  <Button variant="outlined"color="black"
                    component={Link} to="/editProfile"
                    >
                    Edit profile
                  </Button>
              </div>
            {/* Posts, Followers, Following */}
              <div className={classes.profileDetailsNumbers}>
                <Typography variant="h6">{myPosts && myPosts.length} posts</Typography>
                <Typography variant="h6">{followers && followers.length} followers</Typography>
                <Typography variant="h6">{following && following.length} following</Typography>
              </div>
            {/* Bio & Website */}
              <div className={classes.website_bio}>
                {bio ? <Typography variant="h6" className={classes.bio}>{bio}</Typography> : null}
                {website ? <Typography variant="h6" className={classes.website}><a href={`http://${website}`} target="_black">{website}</a></Typography> : null}
              </div>
            </div>
          </div>
          <div className={classes.profilePageBottom}>
              <div className={classes.profilePageGallery}>
                  {myPosts.map(post => (
                      <div key={post._id} className={classes.profilePageGalleryImage}>
                          <img src={post.imageUrl} alt={post.text} />
                          <p>{post.text}</p>
                      </div>
                  ))}
              </div>
          </div>
        </Grid>
        <Grid item sm={1} xs={12}>
            {/* <h2>Follows..</h2> */}
        </Grid>
      </Grid>
    </div>
  )
}

export default User;