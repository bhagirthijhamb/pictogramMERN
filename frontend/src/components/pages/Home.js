import { useContext, useEffect, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';

import { SET_USER } from './../../context/types';
import { AppContext } from '../../context/appContext';

const Home = (props) => {
    const { user, children } = props;
    const [state, dispatch] = useContext(AppContext); 
    
    useEffect(() => {
        dispatch({ type: SET_USER, payload: props.user })
    },[user])

    return (
        <div className="classes root container">
           {/* {children} */}
            <Grid container spacing={4}>
                <Grid item sm={1} xs={12}>
                </Grid>
                <Grid item sm={7} xs={12}>
                    {/* {children[0]} */}
                    {children}
                </Grid>
                <Grid item sm={3} xs={12}>
                    <h3>You may follow...</h3>
                    {/* {children[1]} */}
                </Grid>
                <Grid item sm={1} xs={12}>
                </Grid>
            </Grid>
        </div> 
    )
} 


export default Home;