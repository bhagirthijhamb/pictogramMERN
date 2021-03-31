import React from 'react';

import { Link, useHistory } from 'react-router-dom';

// MUI
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Button } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/Home';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import LockIcon from '@material-ui/icons/Lock';

const useStyles = makeStyles((theme) => ({
    navContainer: {
        width: "1000px",
        display: 'flex',
        alignItems: "center",
        margin: "0 auto"
    },
    grow: {
        flexGrow: 1,
    },
    title: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(2),
        fontFamily: 'Pacifico',
        fontSize: '2rem',
        },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(5),
        width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
        width: '20ch',
        },
    },
     sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
        display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
        display: 'none',
        },
    }
}))

const Navbar = (props) => {
  const classes = useStyles();
  const history = useHistory();
  // const [ state, dispatch ] = useContext(AppContext);

  return(
    <AppBar>
      <Toolbar>
        <div>
          {/* <Link> */}
            <Typography>Pictogram</Typography>
          {/* </Link> */}
          <div>
            <div>
              <SearchIcon />
            </div>
            <InputBase />
          </div>
          <div className={classes.grow} />
          <div>
            <Button>
              <HomeIcon />
              Home
            </Button>
            <Button>
              <SubscriptionsIcon />
              Subscribed
            </Button>
            {/* <CreatePost /> */}
            <Button>
              <AccountCircleIcon />
              {/* {name} */}
            </Button>
            <Button>
              <LockIcon />
              Logout 
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar;