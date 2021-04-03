import { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
// MUI stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import { fade, makeStyles } from '@material-ui/core/styles';
import AddCircleIcon from '@material-ui/icons/AddCircle';

//
import CloseIcon from '@material-ui/icons/Close';
import { SET_ERRORS, LOADING_UI, POST_POST, CLEAR_ERRORS, LOADING_DATA } from '../../context/types';
import { AppContext } from './../../context/appContext';
import { useContext, useEffect, useCallback } from 'react';

const useStyles = makeStyles((theme) => ({
  button: {
      margin: theme.spacing.unit,
  },
  input: {
      display: 'none',
  }
}))
const CreatePost = () => {
  let history = useHistory();
  const classes = useStyles();
  const [state, dispatch] = useContext(AppContext); 
  const [ open, setOpen ] = useState(false);
  const [ text, setText ] = useState('');
  const [ image, setImage ] = useState('');
  const [ imageUrl, setImageUrl ] = useState('');
  const [ errors, setErrors ] = useState({});

  function handleOpen() { 
      setOpen(true) 
  }
  function handleClose() { 
      setOpen(false) 
      setErrors({})
  }
  function handleChange(e) {
      setText(e.target.value)
  }

  async function handleSubmit(e){
    e.preventDefault();
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
          // console.log(dataBack);
          setImageUrl(dataBack.url);
      }
    } catch(err){
      console.log(err);
    }
  }

  useEffect(async() => {
    if(imageUrl){
      dispatch({ type: LOADING_UI });
      try {
        const url = `/api/posts/`;
        const method = 'POST';
        console.log(text)
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text, imageUrl })
        })
        setText('')
        const data = await response.json();
        // console.log(data)
        
        // dispatch(clearErrors())
        if(!response.ok) {
            dispatch({
                type: SET_ERRORS,
                payload: data
            })
            dispatch({ type: CLEAR_ERRORS })
        }
        if(response.ok){
            dispatch({
                type: POST_POST,
                payload: data
            })
            handleClose();
            history.push('/');
        }
      } catch(err){
        // console.log(err)
        dispatch({
            type: SET_ERRORS,
            payload: err
        })
        setErrors()
      }
    }
  }, [imageUrl])
  // console.log(state.ui.loading);
  return (
    <Fragment>
      <Button onClick={handleOpen}>
          <AddCircleIcon />
          Post
      </Button>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth='sm' className="postBabbleDialogBox" >
        <div className="closePostBabbleBtn">
            <Button onClick={handleClose} style={{ float: "right"}}>
                <CloseIcon />
            </Button>
        </div>
        <DialogTitle>Post a new thought</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField name="body" type="text" label="Post..." multiline rows="3" placeholder="Share with your friends..."  value={text} className="textField" onChange={handleChange} fullWidth  
            style={{ marginBottom:"5px"}}
            />
            <Button type="submit" variant="contained" color="primary" 
            // disabled={state.ui.loading} 
            // onClick={(e) => postDetails(e)}
            style={{ float: "right", marginLeft: 5, backgroundColor: "#A5CAD2"}}
            >Submit
              {/* {state.ui.loading && (
                  <CircularProgress size={30} className="progressSpinner" />
              )} */}
            </Button>
            <input
              accept="image/*"
              className={classes.input}
              id="raised-button-file"
              multiple
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <label htmlFor="raised-button-file">
              <Button raised component="span" 
              className={classes.button} style={{ float: "right", backgroundColor: "lightgrey"}}
              >
              Upload
              </Button>
            </label>  
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}

export default CreatePost;
