import React, { useState } from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Signup = () => {

   const [username , setusername] = useState('')
   const [password , setpassword] = useState('')

   
   const handlecheck =() =>{
    console.log(username , password)
    const url = "http://localhost:4000/signup"
    const Data = { username , password }
    axios.post(url,Data).then(() =>{
      console.log(res)
    
   }).catch(() => {
      console.log(err)
   })
   }

  return (
    <div>
    <Nav />

    <div>
    <form class="login-form">
     
      <input type="text" value={username} onChange={(e) => { setusername( e.target.value )}}  placeholder="username" /> <br />
     
      <input type="password" value={password} onChange={(e) => { setpassword( e.target.value)}}  placeholder="Password" /> <br />
      <button type='submite' onClick={handlecheck}>Signup</button>
    </form>
        <Link to="./Login" >Login</Link>   
        </div>
    </div>
  )
}

export default Signup