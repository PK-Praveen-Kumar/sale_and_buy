import React from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div>
        <Nav />

    <div>
    <form class="login-form">
         
         <input type="email" class="login-username" autofocus="true" required="true" placeholder="Email" /> <br />
        <input type="password" class="login-password" required="true" placeholder="Password" /> <br />
         <input type="submit" name="Login" value="Login" class="login-submit" />
    </form>
<Link to="./Signup" >Signup</Link>   
</div>
    </div>
  )
}

export default Login