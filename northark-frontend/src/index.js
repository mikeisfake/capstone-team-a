import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ContextWrapper from './components/ContextWrapper';
import Table from './components/Transaction';


ReactDOM.render(
  <React.StrictMode>
    <ContextWrapper>
      <App />
    </ContextWrapper>
  </React.StrictMode>,
  document.getElementById('root')
);
