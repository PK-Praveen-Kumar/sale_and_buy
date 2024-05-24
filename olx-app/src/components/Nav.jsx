import React from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
const Nav = () => {
  return (
    <div>
        <ul className="shadow" >
        <div>
          <p>nav</p>
        </div>
        <div className='nav-button'>
       
        <Link to="/Home" >Home</Link>
    
      
        <Link to="/Login" >Login</Link>
        
        </div>
        
        </ul>
        <p>
          navigate to ...
          
        </p>
    </div>
  )
}

export default Nav