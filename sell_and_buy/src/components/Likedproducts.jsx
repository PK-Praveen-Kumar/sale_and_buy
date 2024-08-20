import React from 'react'
import { useState , useEffect } from 'react'
import { Link , useLocation } from 'react-router-dom'
import axios from 'axios';
import Nav from '../components/Nav'
import Categories from './Categories';
import { AiFillLike } from 'react-icons/ai';


const Home = () => {
   const [products , setproducts] = useState([])
   const [search , setsearch] = useState('')
    const [items , setItems] = useState('')
    const location = useLocation();
    const isAboutPage = location.pathname === '/';

   

  
  console.log(items)
  const handlesearch = (e) => {
    setsearch(e)
  }


  const handleclick =() => {
    
    let filterproducts = products.filter((item) =>{
      if(item.pname.toLowerCase().includes(search.toLowerCase()) ){
        return item        
      }
      
     
    })
    setproducts(filterproducts)
  }
  

  const handleCategory = (value) => {
    console.log(value)
    let filterproducts = products.filter((item) =>{
      if(item.pcategory == value ){
        return item        
      }
    })
    setproducts(filterproducts)
  }

  const handleLike = (productId) => {
    let userId = localStorage.getItem('userId')
    console.log("liked" , productId , userId)
    const data = {userId , productId}
    const url = 'http://localhost:4000/like-product'
    axios.post(url , data)
        .then((res) => {
                console.log(res)
        }) .catch((err) =>{
                console.log(err)
                alert( "server err")
        })
  }
 

  console.log(products.pname)
  return (
    <div>
      <Nav handlesearch={handlesearch} handleclick={handleclick} search={search} />
      <Categories handleCategory ={handleCategory}/>
    {!isAboutPage && (
          <li>
           <Link to="/">HOME</Link>
          </li>
        )}
    
     
    {products && products.length > 0 && products.map((item , index) => {
      return (
         <div key={index} >
          <img src={'http://localhost:4000/' + item.pimage} width="500px" />
          <p > NAME :{item.pname}</p> 
          <AiFillLike onClick={()=>handleLike(item._id)} size="30" className='like-buton' />
          <p > CATEGORY :{item.pcategory}</p>
          <p> DESCRIPTION :{item.pdescription}</p>
          <p> PRICE :{item.pprice}</p>
          </div>
      )
    })}

    </div>
  )
}

export default Home