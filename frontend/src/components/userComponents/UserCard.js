import { Link } from 'react-router-dom';

// MUI Stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TextField from '@material-ui/core/TextField';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

import Input from '@material-ui/core/Input';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
// Context
import { AppContext } from '../../context/appContext';
import { useState, useContext, useEffect, useCallback } from 'react';
import { LIKE_POST, SUBMIT_COMMENT, UNLIKE_POST, DELETE_POST, DELETE_COMMENT } from '../../context/types';

// Icons
import ChatIcon from '@material-ui/icons/Chat';

const useStyles = makeStyles((theme) => ({
  root: {
      maxWidth: 550,
      marginBottom: 20,
      border: '1px solid #B7D4DB',
      boxShadow: '5px 5px #B7D4DB',
      position: 'relative'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: '#FF7A89',
    fontSize: 14
  },
  authorName: {
    marginLeft: '10px !important',
    fontWeight: "bold",
    fontSize: '.9rem',
    // color: '#CC616E'
  }
}))

const UserCard = (props) => {
  const [state, dispatch] = useContext(AppContext); 
  const { _id, name, imageUrl } = props.user
  // console.log(props.post)
  const classes = useStyles();
  const [comment, setComment] = useState('');

  return (
    <Card className={classes.root} key={_id}>
      <CardActions className="userCard">
        <Avatar aria-label="recipe" className={classes.avatar}>
          <div className={classes.profileImage}>
            <img style={{width: '50px', height: '50px', borderRadius: '25px'}} 
            src={imageUrl}
              />
          </div>
        </Avatar>
        <Typography className={classes.authorName} component={Link} 
        to={_id !== state.user.credentials._id ? `/user/${_id}` : `/user` }
        >
                {name}
        </Typography>
        <Link 
          to={`/user/${_id}`}
          style={{ 
            color: 'rgb(255, 122, 137)',
            fontWeight: 'bold',
            float: 'right', 
            padding: '3px 5px', 
            // marginLeft: '50px',
            border: '1px solid rgb(255, 122, 137)',
            borderRadius: '3px',
          }}
        >
          Go
        </Link>
          {/* </Button> */}
      </CardActions>
    </Card>
  )
}

export default UserCard;