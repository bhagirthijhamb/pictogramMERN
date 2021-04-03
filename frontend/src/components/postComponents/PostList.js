import { useContext, useEffect, useCallback } from 'react';
import Post from './Post';
import { LOADING_DATA, SET_POSTS, LOADING_USER, SET_USER } from '../../context/types';
import { AppContext } from './../../context/appContext';

const PostList = (props) => {
    const [state, dispatch] = useContext(AppContext); 

    const refresh = useCallback( async() => {
        dispatch({ type: LOADING_DATA });
        try {
            const response = await fetch('/api/posts');
            const postRes = await response.json();
            console.log(postRes);
            dispatch({ type: SET_POSTS, payload: postRes })
        } catch(err) {
            console.log(err)
            dispatch({ type: SET_POSTS, payload: [] })
        }
    }, []);

    useEffect(() => {
        refresh(); 
    }, [refresh]);

    const postsMarkup = !state.post.loading ? (
        state.post.posts.map(post =>{
            return <Post key={post._id} post={post} />
        }
        )) : (<p>Loading...</p>)

    return (
        <div className="classes root">
          {postsMarkup}
        </div>
        
    )
} 

export default PostList;