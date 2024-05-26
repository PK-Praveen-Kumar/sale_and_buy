import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <Nav />

    <div>
    <form class="login-form">
         
         <input type="email" placeholder="Email" /> <br />
        <input type="password"  placeholder="Password" /> <br />
         <input type="submit" name="Login" value="Login"  />
    </form>
<Link to="./Signup" >Signup</Link>   
</div>
    </div>
  )
}

export default Login