import React from 'react'
import { Route } from 'react-router-dom'
import {ACCESSTOKEN, LOGIN_OUT} from "../utils/env";

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  let isPrivate = ACCESSTOKEN

  return (
    <Route
      {...rest}
      render={props =>
        isPrivate ? (
          <Component {...props} />
        ) : (
          LOGIN_OUT()
        )
      }
    />
  )
}
export default PrivateRoute
