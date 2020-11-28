import React from 'react';
import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Users from '../pages/Users';

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
        </Switch>
      </Router>
    </ThemeProvider>
  );
};

export default App;
