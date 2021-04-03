import Grid from '@material-ui/core/Grid';
import { useState, useContext, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';

import { AppContext } from './../../context/appContext';
import { SET_OTHER_USER, FOLLOW_USER, UNFOLLOW_USER } from '../../context/types';


const useStyles = makeStyles(theme => ({
  profilePageTop: {
    display: "flex",
    borderBottom: "1px solid grey",
    width: "100%",
    padding: "30px 0px"
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
  websiteBio_Follow: {
    display: "flex",
    justifyContent: "space-between"
  },
  website_bio: {
    width: '50%',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10
  },
  website: {
    fontWeight: 'bold',
    color: '#CC616E'
  },
  follow_unfollow_Btn: {
    margin: 'auto'
  }
}))

const OtherUser = () => {
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext); 
  const [otherUser, setOtherUser] = useState(null)
  const [showFollow, setshowFollow] = useState(true);
  const { userId } = useParams();
  // console.log(userId);

  const getUser = useCallback(async function() {
    try {
      const response = await fetch(`/api/users/user/${userId}`, {
        headers: {
          credentials: 'include',
        },
      })
      const otherUserDetails = await response.json();
      // console.log(otherUserDetails)
      if(!response.ok){
        throw new Error(otherUserDetails.message);
      }
      setOtherUser(otherUserDetails);
      dispatch({
        type: SET_OTHER_USER,
        payload: otherUserDetails
      })
      // console.log(state.otherUser);
      // console.log(state.otherUser.credentials.followers);
    } catch (err) {
        console.log({ err });
    }
  }, [])

  const followUser = async() => {
    try {
      const response = await fetch('/api/users/user/follow', {
        method: "put",
        headers: {
          credentials: 'include',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ followId: userId })
      })
      const json = await response.json()
      // console.log(json);
      if(!response.ok){
        throw new Error(json.error) 
      }
      dispatch({
        type: FOLLOW_USER,
        payload: json
      })
        // setshowFollow(false)
    } catch(err){
        console.log(err)
    }
  }

  const unfollowUser = async() => {
    try {
      const response = await fetch('/api/users/user/unfollow', {
        method: "put",
        headers: {
          credentials: 'include',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ unfollowId: userId })
      })
      const json = await response.json()
      console.log(json);
      if(!response.ok){
        throw new Error(json.error) 
      }
      dispatch({
        type: UNFOLLOW_USER,
        payload: json
      })
      // setshowFollow(true)
    } catch(err){
        console.log(err)
    }
  }

  useEffect(() => {
      getUser();
  }, [getUser])

  console.log('otherUser', otherUser)
  console.log('state.otherUser', state.otherUser)

  return (
    <div className="classes root container">
      <Grid container spacing={4}>
        <Grid item sm={1} xs={12}>
        </Grid>
        <Grid item sm={10} xs={12} container>
          {!otherUser ? <h3>Loading...</h3> 
          :
          <>
          {/* Portforlio Page top */}
          <div className={classes.profilePageTop}>
            <div className={classes.profileImage}>
              <img style={{width: '150px', hieght: '150px', borderRadius: '80px'}} src="https://images.unsplash.com/photo-1597223557154-721c1cecc4b0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
            </div>  
            <div className={classes.profileDetails}>
              <Typography variant="h4">{state.otherUser.credentials.name}</Typography>
            {/* Posts Followers Following */}
              <div className={classes.profileDetailsNumbers}>
                <Typography variant="h6">{state.otherUser && state.otherUser.posts.length} posts</Typography>
                <Typography variant="h6">{state.otherUser.credentials.followers && state.otherUser.credentials.followers.length} followers</Typography>
                <Typography variant="h6">{state.otherUser.credentials.following && state.otherUser.credentials.following.length} following</Typography>
              </div>
            {/* Bio & Website */}
              <div className={classes.websiteBio_Follow}>
                <div className={classes.website_bio}>
                  {state.otherUser.credentials.bio ? <Typography variant="h6" className={classes.bio}>{state.otherUser.credentials.bio}</Typography> : null}
                  {state.otherUser.credentials.website ? <Typography variant="h6" className={classes.website}><a href={`http://${state.otherUser.credentials.website}`} target="_black">{state.otherUser.credentials.website}</a></Typography> : null}
                </div>
                <div className={classes.follow_unfollow_Btn}>
                  {state.user.credentials.following.includes(otherUser.user._id)
                //    {state.otherUser.credentials.followers.includes(state.user.credentials._id)
                    ? 
                    <Button
                        type="submit"
                        variant="outlined"
                        color="black"
                        className={classes.follow}
                        onClick={() => unfollowUser()}
                        >
                        Unfollow
                    </Button>
                    : 
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.follow}
                        onClick={() => followUser()}
                        >
                        Follow
                    </Button>
                  }
                </div>
              </div>                         
          </div>
        </div>
        {/* Portforlio Page bottom */}
        <div className={classes.profilePageBottom}>
          <div className={classes.profilePageGallery}>
            {otherUser.userPosts.map(post => (
              <div key={post._id} className={classes.profilePageGalleryImage}>
                <img src={post.imageUrl}/>
              </div>
            ))}
          </div>
        </div>
        </>
        }
        </Grid>
        <Grid item sm={1} xs={12}>
        </Grid>
      </Grid>
    </div>
  )
}

export default OtherUser;