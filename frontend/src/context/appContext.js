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
          user: {
            ...state.user,
            authenticated: true,
            credentials: {...action.payload}
          }
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