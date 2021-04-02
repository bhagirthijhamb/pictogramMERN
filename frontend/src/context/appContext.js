import React, { useReducer, createContext } from 'react';
import { SET_USER, SET_USERS, SET_USER_POSTS, SET_POSTS, LOADING_DATA , LOADING_UI, POST_POST, SET_ERRORS, CLEAR_ERRORS, LOADING_USER, LIKE_POST, UNLIKE_POST, SUBMIT_COMMENT, DELETE_POST, DELETE_COMMENT, SET_OTHER_USER, FOLLOW_USER, UNFOLLOW_USER } from './types';

export const AppContext = createContext();

const initialState = {
  users: [],
  post: {
    loading: false,
    posts: [],
    post: {},
  },
  user: {
    authenticated: false,
    credentials: {},
    myPosts: [],
    likes: [],
    notifications: []
  },
  otherUser: {
    credentials: {},
    posts: []
  },
  ui: {
    loading: false,
    errors: null
  }
}

const appReducer = (state, action) => {
  switch(action.type) {
    case SET_USERS:
      return {
        ...state,
        users: [...action.payload]
      }
    case SET_USER:
      return {
        ...state,
        user: {
          ...state.user,
          authenticated: true,
          credentials: {...action.payload}
        }
      }
    case SET_USER_POSTS:
      return {
        ...state,
        user: {
          ...state.user,
          myPosts: action.payload
        }
      }
    case SET_OTHER_USER: 
    // console.log(action.payload);
    // console.log(action.payload.userPosts);
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          credentials: {...action.payload.user},
          posts: [...action.payload.userPosts]
        }
      }
    case FOLLOW_USER:
    case UNFOLLOW_USER:
      // console.log(action.payload)
      return {
        ...state,
        otherUser: {
          ...state.otherUser,
          credentials: {
              ...state.otherUser.credentials,
              followers: action.payload.followedUser.followers,
              // following: action.payload.foll
          }
        },
        user: {
          ...state.user,
          credentials: {
              ...state.user.credentials,
              following: action.payload.followingUser.following
          }
        }
      }
    case LOADING_DATA: 
      return {
        ...state,
        post: {
          ...state.post,
          loading: true
        }
      }
    case LOADING_UI:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: true
        }
      }
    case SET_ERRORS:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: false,
          errors: action.payload
        }
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        ui: {
          ...state.ui,
          loading: false,
          errors: null,
        }
      }
    case SET_POSTS:
      return {
        ...state,
        post: {
          ...state.post,
          posts: action.payload,
          loading: false
        }
      }
    case POST_POST:
      return {
        ...state,
        post: {
          ...state.post,
          posts: [
            action.payload,
            ...state.post.posts
          ]
        }
      }
    case LIKE_POST:
    case UNLIKE_POST: 
      const likeUpdatedPosts = state.post.posts.map(post => {
        if(post._id == action.payload._id){
          return post = action.payload;
        } else { return post } 
      })
      return {
        ...state,
        post: {
          ...state.post,
          posts: likeUpdatedPosts
        }
      }
    case SUBMIT_COMMENT:
      const commentUpdatedPosts = state.post.posts.map(post => {
        if(post._id == action.payload._id){
            return post = action.payload;
        } else {return post}
      })
      return {
        ...state,
        post: {
            ...state.post,
            posts: commentUpdatedPosts
        }
      }
    case DELETE_POST: 
      const deleteUpdatedPosts = state.post.posts.filter(post => post._id !== action.payload._id) 
      return {
        ...state,
        post: {
          ...state.post,
          posts: deleteUpdatedPosts
        }
      }
    case DELETE_COMMENT:
      console.log(action.payload)
      const commentDeleteUpdatedPosts = state.post.posts.map(post => {
        if(post._id == action.payload._id){
            return post = action.payload;
        } else { return post}
      })
      return {
        ...state,
        post: {
          ...state.post,
          posts: commentDeleteUpdatedPosts
        }
      }
    default:
      return state
  }
}

export const AppContextProvider = props => {
    const [state, dispatch] = useReducer(appReducer, initialState);

    return(
        <AppContext.Provider value={[state, dispatch]}>
            {props.children}
        </AppContext.Provider>
    )
}