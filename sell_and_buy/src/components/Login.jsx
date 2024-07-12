import React,{ useState } from 'react'
import Nav from './Nav'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate()

  const [username , setusername] = useState('')
  const [password , setpassword] = useState('')

  
  const handlecheck =() =>{
    if(username , password){

      console.log({username , password })
      const url = 'http://localhost:4000/login'
      const Data = { username , password }
      axios.post(url , Data)
       .then((res) =>{
         console.log(res.data)
         if(res.data.message){
          if(res.data.token){
            localStorage.setItem('token' , res.data.token);
            localStorage.setItem('userId' , res.data.userId);

            navigate("/main_page")
          }
           alert(res.data.message)
          }
      
     }).catch((err) => {
        console.log(err)
        alert('server err')
     })
    }
    else{
      alert('enter username and password')
    }
  }

  return (
    <div>
    <Nav />

    <div>
   
     
      <input type="text" value={username} onChange={(e) => { setusername( e.target.value )}}  placeholder="username" /> <br />
     
      <input type="password" value={password} onChange={(e) => { setpassword( e.target.value)}}  placeholder="Password" /> <br />
      <button type='submite' onClick={handlecheck}>login</button>
    
        <Link to="./signup" >Signup</Link>   
        </div>
    </div>
  )
}

export default Login