import React, { useState } from 'react'
import axios from 'axios'
import { setUserSession } from '../Components/service/AuthService'

const url = 'https://0zgtrjibk1.execute-api.eu-west-2.amazonaws.com/prod'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const submitHandler = (event) => {
    event.preventDefault()
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('username and password are required')
      return
    }
    setErrorMessage(null)
    const requestConfig = {
      headers: {
        'x-api-key': 'R2pPxZSZrlaf9P47wLwA2ACzBUFzaicaZtJjz6c9',
      },
    }
    const requestBody = {
      username: username,
      password: password,
    }

    axios
      .post(`${url}/login`, requestBody, requestConfig)
      .then((response) => {
        // fetch user and token from session
        setUserSession(response.data.user, response.data.token)
        props.history.push('/home')
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setErrorMessage(error.response.data.message)
        } else {
          setErrorMessage(
            'sorry....the backend server is down. please try again later!!'
          )
        }
      })
  }

  return (
    <div>
      <section className='mt-5 '>
        <div className='container'>
          <div className='row'>
            {errorMessage && <p className='message'>{errorMessage}</p>}
            <form className='col-md-6 m-auto' onSubmit={submitHandler}>
              <div className='card p-4  bg-light'>
                <h2 className='card-title text-center text-danger'>Login</h2>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          name='username'
                          placeholder='Username'
                          value={username}
                          onChange={(event) => setUsername(event.target.value)}
                          required
                        />
                        <br />
                      </div>
                    </div>

                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <input
                          type='password'
                          className='form-control'
                          name='password'
                          placeholder='password'
                          value={password}
                          onChange={(event) => setPassword(event.target.value)}
                          required
                        />
                        <br />
                      </div>
                    </div>
                    <br />
                  </div>
                </div>

                <div className='col-lg-12 text-center'>
                  <div className='form-group'>
                    <button
                      type='submit'
                      className='btn btn-danger btn-lg col-12'
                    >
                      Login{' '}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Login
