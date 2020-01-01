import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import FrontPanelPage from './containers/FrontPanelPage';
import SystemPanelPage from './containers/SystemPanelPage';
import SweepPanelPage from './containers/SweepPanelPage';

export default () => (
  <App>
    <Switch>
      <Route path={routes.COUNTER} component={CounterPage} />
      <Route exact path={routes.HOME} component={HomePage} />
      <Route path={routes.FRONTPANEL} component={FrontPanelPage} />
      <Route path={routes.SYSTEMCONFIG} component={SystemPanelPage} />
      <Route path={routes.SWEEPCONFIG} component={SweepPanelPage} />
    </Switch>
  </App>
);
