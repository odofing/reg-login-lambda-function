import React, { useState } from 'react'
import axios from 'axios'

const url = 'https://0zgtrjibk1.execute-api.eu-west-2.amazonaws.com/prod'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const submitHandler = (event) => {
    event.preventDefault()
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      name.trim() === '' ||
      password.trim() === ''
    ) {
      setMessage('All fields are required')
      return
    }
    setMessage(null)
    const requestConfig = {
      headers: {
        'X-api-key': 'R2pPxZSZrlaf9P47wLwA2ACzBUFzaicaZtJjz6c9',
      },
    }
    const requestBody = {
      username: username,
      email: email,
      name: name,
      password: password,
    }
    axios
      .post(`${url}/register`, requestBody, requestConfig)
      .then((response) => {
        setMessage('Registeration Successful')
      })
      .catch((error) => {
        if (error.response.status === 401 || error.response.status === 403) {
          setMessage(error.response.data.message)
        } else {
          setMessage(
            'sorry....the backend server is down!! please try again later'
          )
        }
      })
  }

  return (
    <div>
      <section className='mt-5 '>
        <div className='container'>
          <div className='row'>
            {message && <p className='message'>{message}</p>}
            <form className='col-md-6 m-auto' onSubmit={submitHandler}>
              <input type='hidden' name='form-name' value='contact' />
              <div className='card p-4  bg-light'>
                <h2 className='card-title text-center text-success'>
                  Register
                </h2>
                <div className='card-body'>
                  <div className='row'>
                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <input
                          type='text'
                          className='form-control'
                          placeholder='Name'
                          name='name'
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                          required
                        />
                        <br />
                      </div>
                    </div>
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
                          type='email'
                          className='form-control'
                          name='e-mail'
                          placeholder='Email'
                          value={email}
                          onChange={(event) => setEmail(event.target.value)}
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
                      className='btn btn-success btn-lg col-12'
                    >
                      Register{' '}
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
export default Register
