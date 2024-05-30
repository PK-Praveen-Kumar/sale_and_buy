import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
const Main_page = () => {
     const navigate = useNavigate();
     useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/login')
        }
     },[])
     const handlelogout =() => {
          localStorage.removeItem('token')
          window.location.reload();
          
     }
  return (


    <div>
     
      Main_page
      
      <button type='submit' onClick={handlelogout} > Logout</button>
      </div>
  )
}

export default Main_page