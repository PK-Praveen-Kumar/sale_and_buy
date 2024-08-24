import React, { useState } from 'react'
import Nav from './Nav'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Signup = () => {

   const [username , setusername] = useState('')
   const [password , setpassword] = useState('')
   const [mobileno , setmobileno] = useState('')
   const [email , setemail] = useState('')

   
   const handlecheck =() =>{
    if( username , password){
    console.log({username , password , mobileno , email })
    const url = 'http://localhost:4000/signup/'
    const Data = { username , password , mobileno , email }
    axios.post(url , Data) // install axios for connecting database script
    .then((res) =>{
      console.log(res.data)
      if(res.data.message){
        alert("data posted")
      }
    
   }).catch((err) => {
      console.log(err)
      alert('server err')
   })}
   else{
     alert('give data')
   }
   }

  return (
    <div>
    <Nav />

    <div>
   
     
      <input type="text" value={username} onChange={(e) => { setusername( e.target.value )}}  placeholder="username" /> <br />

      <input type="phone" value={mobileno} onChange={(e)=>{
        setmobileno(e.target.value)
      }
      } placeholder='Mobile No'  />
      <br />
      <input type="email" value={email} onChange={(e)=>{
        setemail(e.target.value)
      }
      } placeholder='email'  />
      <br />
      <input type="password" value={password} onChange={(e) => { setpassword( e.target.value)}}  placeholder="Password" /> <br />
      <button type='submite' onClick={handlecheck}>Signup</button>
    
        <Link to="./Login" >Login</Link>   
        </div>
    </div>
  )
}

export default Signup