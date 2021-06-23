import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Dashboard from './containers/Dashboard';
import Login from './containers/Login';

import './styles/index.scss';

function App() {

  const loggedIn = () => {
    //a function that checks if state says something like 'loggedIn: true' and allows us to conditionally choose whether to render the Login component or the Dashboard component.
    //This would be the one instance where I would consider application state (redux) but if we only have 2 pages we can just do this logic twice perhaps? Not the most elegant solution but certainly seems like the least amount of overhead for us.
  }
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
