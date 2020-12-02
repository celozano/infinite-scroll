import React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Users from '../pages/Users';
import AddUser from '../pages/AddUser';
import EditUser from '../pages/EditUser';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#32A3DE',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#F4F6F6',
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Users} />
          <Route exact path="/add-user" component={AddUser} />
          <Route exact path="/edit-user" component={EditUser} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
