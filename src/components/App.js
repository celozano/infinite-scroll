import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Users from '../pages/Users';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Users} />
      </Switch>
    </Router>
  );
};

export default App;
