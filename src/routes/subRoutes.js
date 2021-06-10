import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import lazy from './LazyComponent';
import PrivateRoute from './PrivateRoute';

const Home = () => import('views/Home');
const NoMatch = () => import('../components/Layout/404.js');

const files = require.context('./models', false, /\.js$/);
const routeList = [];
files.keys().forEach(key => {
  const child = files(key).default;
  routeList.push(...child);
});

const SubRoute = () => {
  return (
    <Switch>
      <Route path="/app" render={() => <Redirect to="/app/home" />} exact key="first" />
      {routeList.map(route => {
        return (
          <PrivateRoute
            path={route.path}
            component={lazy(route.component)}
            exact
            key={route.path}
          />
        );
      })}
      <Route path="/app/home" component={lazy(Home)} exact key="home" />
      <Route component={lazy(NoMatch)} key="NoMatch" />
    </Switch>
  );
};

export default SubRoute;
