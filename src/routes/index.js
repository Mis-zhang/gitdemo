import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
// import la from './loadableComponent';
import lazy from './LazyComponent'
const BaseLayout = () => import('components/Layout/BaseLayout')

// const Home = () => import('../views/Home');
// const Demo = () => import('../views/Demo/Rematch')

export default () => (
  <Switch>
    <Route path="/" render={() => <Redirect to="/app/home" />} exact key="first" />
    <Route path="/app" component={lazy(BaseLayout)} key="app" />
  </Switch>
)
