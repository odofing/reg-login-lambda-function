import React, { useEffect, useState } from 'react'
import { NavLink, BrowserRouter, Switch } from 'react-router-dom'
import Register from './Components/Register'
import Home from './Components/Home'
import Login from './Components/Login'
import PublicRoute from './routes/PublicRoute'
import axios from 'axios'
import PrivateRoute from './routes/PrivateRoute'
import {
  getUser,
  getToken,
  setUserSession,
  resetUserSession,
} from './Components/service/AuthService'

const url = 'https://0zgtrjibk1.execute-api.eu-west-2.amazonaws.com/prod'

const App = () => {
  const [isAuthenicating, setAuthenicating] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (
      token === 'undefined' ||
      token === undefined ||
      token === null ||
      !token
    ) {
      return
    }

    const requestConfig = {
      headers: {
        'x-api-key': 'R2pPxZSZrlaf9P47wLwA2ACzBUFzaicaZtJjz6c9',
      },
    }
    const requestBody = {
      user: getUser(),
      token: token,
    }

    axios
      .post(`${url}/verify`, requestBody, requestConfig)
      .then((response) => {
        setUserSession(response.data.user, response.data.token)
        setAuthenicating(false)
      })
      .catch(() => {
        resetUserSession()
        setAuthenicating(false)
      })
  }, [])

  const token = getToken()
  if (isAuthenicating && token) {
    return <div className='content'>Authenicating...</div>
  }

  return (
    <div className='App'>
      <BrowserRouter>
        <div className='header'>
          <NavLink activeclass='active' to='/register'>
            Register
          </NavLink>
          <NavLink activeclass='active' to='/login'>
            login
          </NavLink>
          <NavLink activeclass='active' to='/Home'>
            Home
          </NavLink>
        </div>
        <div className='content'>
          <Switch>
            <PublicRoute path='/register' component={Register} />
            <PublicRoute path='/login' component={Login} />
            <PrivateRoute path='/Home' component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
