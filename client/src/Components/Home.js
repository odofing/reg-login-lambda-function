import { getUser, resetUserSession } from './service/AuthService'

const Crud = (props) => {
  const user = getUser()
  const name = user !== 'undefined' && user ? user.name : ''

  const logoutHandler = () => {
    resetUserSession()
    props.history.push('/login')
  }

  return (
    <div>
      Hello, {name}! <br />
      <input
        type='button'
        value='Logout'
        className='btn btn-dark mt-3'
        onClick={logoutHandler}
      />
    </div>
  )
}

export default Crud
