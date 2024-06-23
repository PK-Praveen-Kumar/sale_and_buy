import React from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
 <div>
 <div className='nav'>
        
        <div className='nav-hline'>
          <p>nav</p>
        </div>
        <div className='nav-button'>

            <Link className='nav-link' to="/Home" >Home</Link>
       
            <Link className='nav-link' to="/Login" >Login</Link> 

            <Link className='nav-link' to="/Signup" >signup</Link>
        
        </div>
        
        
        
    </div>
    <p>
          navigate to ...
          
        </p>
 </div>
   
  )
}

export default Nav