import logo from './logo.svg';
import './App.css';

import { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'; 

// Components
import Navbar from './components/layout/Navbar';

function App() {
  return (
    <div className="App">
      Welcome to pictogram
      <Navbar />
    </div>
  );
}

export default App;
