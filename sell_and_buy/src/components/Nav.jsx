import React, { useState } from 'react'
import "../index.css"
import { Link } from 'react-router-dom'
const Nav = (props) => {
 const [loc , setloc] = useState('')
 let locations =[ {
    "latitude" : 28.6139,
    "longtitude" : 77.2090,
    "placeName" : "New Delhi , Delhi"
 },
 {
  "latitude" : 19.0760,
  "longtitude" : 72.8777,
  "placeName" : "mumbai , maharashtra"
}
]


  return (
 <div>
 <div className='nav'>
        
        <div className='nav-line'>
          <p>nav</p>
          <input type="text" placeholder='search'  value={props.search}
          onChange={(e) => props.handlesearch(e.target.value)}/>
          <button onClick={(e) => {props.handleclick( e.target.value)}}>search</button>
        </div>
        <div>
          <select value={loc} onChange={
            (e) => {
              localStorage.setItem('userLoc', e.target.value )
              setloc(e.target.value)
            }
          }>
          {
            locations.map((item , index) =>{
              return(
                <option key={index} value={`${item.latitude },${item.longtitude }`}>
                  {item.placeName}
                </option>
              )
            })
          } 
          </select>
        </div>
        <div className='nav-button'>

            <Link className='nav-link' to="/Home" >Products</Link>
       
            <Link className='nav-link' to="/Login" >Login</Link> 

            <Link className='nav-link' to="/Signup" >signup</Link>

            <Link className='' to="/Add_product" >add products</Link>

        
        </div>
        
        
        
    </div>
      
 </div>
   
  )
}

export default Nav