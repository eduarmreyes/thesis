
import React from "react"
import {
  Route,
  Redirect
} from "react-router-dom"

import store from "../../store"

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
   store.getState().mainReducer.auth.authorize ? (
     <Component {...props} handleUser={rest.user} />
   ) : (
     <Redirect to={{
       pathname: "/",
       state: { from: props.location }
     }} />
   )
  )} />
)

export default PrivateRoute
