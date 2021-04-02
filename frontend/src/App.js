import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'; 

// MUI
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// App context
import { AppContextProvider } from './context/appContext';

// Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import PostList from './components/PostList';
import OtherUser from './components/OtherUser';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#B7D4DB",
      main: "#A5CAD2",
      dark: '#84A1A8',
      contrastText: "#333"
    },
    secondary: {
      light: "#FF94A1",
      main: "#FF7A89",
      dark: "#CC616E",
      contrastText: "#333"
    }
  },
  spacing: [0, 4, 8, 16, 32, 64]
})

const Routing = (props) => {
  console.log('inside routing')
  const history = useHistory();
  const { user, getUser, setUser } = props;

  useEffect(() => {
    if(user){
      history.push('/');
    } else {
      history.push('/login');
    }
  }, [user])

  return (
    <Switch>
      <Route exact path='/'>
        <Home user={user} {...props}>
          <PostList />
        </Home>
      </Route>
      <Route exact path='/signup'>
        <Signup getUser={getUser} updateUser={setUser} {...props} />
      </Route>
      <Route exact path='/login'>
        <Login getUser={getUser} {...props} />
      </Route>
      <Route exact path='/user/:userId' component={OtherUser} />
    </Switch>
  )
}

function App() {
  const [ user, setUser ] = useState(undefined);

  const getUser = useCallback(async function(){
    try {
      const response = await fetch('/api/users/me', {
        headers: {
          credentials: 'include'
        }
      })

      const json = await response.json();
      if(!response.ok){
        throw new Error(json.message);
      }
      setUser(json.data);
    } catch(err){
      setUser(undefined);
      console.log(err)
    }
  }, [])

  useEffect(() => {
    getUser();
  }, [getUser])

  return (
    <MuiThemeProvider theme={theme}>
      <AppContextProvider>
        <Router>
          <div className="app">
            {user && <Navbar updateUser={setUser} />}
            <Routing user={user} setUser={setUser} getUser={getUser} />
            {user && <Footer />}
          </div>
        </Router>
      </AppContextProvider>
    </MuiThemeProvider>
  );
}

export default App;
