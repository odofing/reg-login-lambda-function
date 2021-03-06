import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { getToken } from '../Components/service/AuthService'

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return !getToken() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home' }} />
        )
      }}
    />
  )
}

export default PublicRoute
