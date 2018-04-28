/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TodoApp from './components/js/TodoApp';


const App = () => (
  <MuiThemeProvider>
    <TodoApp />
  </MuiThemeProvider>
);


ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
