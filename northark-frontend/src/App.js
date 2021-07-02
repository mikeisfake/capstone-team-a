import { useState, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

import { UserContext } from './contexts/UserContext'

import './styles/index.scss';

function App() {
  const { user } = useContext(UserContext);

  return (
      <div className="App">
        {user ? <Dashboard /> : <Login />}
      </div>

  );
}

export default App;
