import React, { useState } from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
const Nav = (props) => {

 


  return (
 <div>
 <div className='nav'>
        
        <div className='nav-line'>
          <p>nav</p>
          <input type="text" placeholder='search'  value={props.search}
          onChange={(e) => props.handlesearch(e.target.value)}/>
          <button onClick={(e) => {props.handleclick( e.target.value)}}>search</button>
        </div>
        <div className='nav-button'>

            <Link className='nav-link' to="/Home" >Products</Link>
       
            <Link className='nav-link' to="/Login" >Login</Link> 

            <Link className='nav-link' to="/Signup" >signup</Link>
        
        </div>
        
        
        
    </div>
      
 </div>
   
  )
}

export default Nav