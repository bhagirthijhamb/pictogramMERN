import React from 'react';
import UserCard from './../userComponents/UserCard';
import { useContext, useEffect, useCallback } from 'react';
import { AppContext } from './../../context/appContext';
import  { SET_USERS } from './../../context/types';

const FollowSuggestions = ( props ) => {
  const [ state, dispatch ] = useContext(AppContext);

  const refresh = useCallback( async() => {
    // dispatch({ type: LOADING_DATA });
    try {
        const response = await fetch('/api/users/');
        const usersRes = await response.json();
        // console.log(postRes);
        dispatch({ type: SET_USERS, payload: usersRes })
    } catch(err) {
        console.log(err)
        dispatch({ type: SET_USERS, payload: [] })
    }
  }, []);

  useEffect(() => {
      refresh(); 
  }, [refresh]);

  let otherUsers =[];

  state.users.map(eachUser => {
    if(state.user.credentials.following){
      if(!state.user.credentials.following.includes(eachUser._id)){
        if(eachUser._id !== state.user.credentials._id){
          otherUsers.push(eachUser)
        }
      };
    }
  })

   const usersMarkup = otherUsers.map(user =>{
        return <UserCard key={user._id} user={user} />
    }
    )

  return (
    <div className="classes root">
      {usersMarkup}
    </div>
  )
}

export default FollowSuggestions;