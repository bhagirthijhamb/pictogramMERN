import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'; 

// MUI
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

// Components
import Navbar from './components/layout/Navbar';

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
      <Route>
        {/* <Home>
          
        </Home> */}
      </Route>
    </Switch>
  )
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className="app">
          <Navbar />
          <Routing />
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
