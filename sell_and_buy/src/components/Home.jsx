import React from 'react'
import { useState , useEffect } from 'react'
import { Link , useLocation } from 'react-router-dom'
import axios from 'axios';
import Nav from '../components/Nav'
import Categories from './Categories';
const Home = () => {
   const [products , setproducts] = useState([])
   const [search , setsearch] = useState('')

   const location = useLocation();
  const isAboutPage = location.pathname === '/';

   useEffect(() => {
    const url = 'http://localhost:4000/get-product'
    axios.get(url)
        .then((res) => {
                console.log(res)
                if(res.data.product){
                  setproducts(res.data.product)
                }
        }) .catch((err) =>{
                console.log(err)
                alert( "server err")
        })
  },[])
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
  const refrush = () => {
    setsearch('')
    window.location.reload();
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

  return (
    <div>
      <Nav handlesearch={handlesearch} handleclick={handleclick} search={search} />
      <Categories handleCategory ={handleCategory}/>
    {!isAboutPage && (
          <li>
           <Link to="/">HOME</Link>
          </li>
        )}
    
     {products && products.length === 0 && (
      <div>
          <h1>Item not found</h1>
          <button onClick={() => refrush() }>refrush</button>
          </div >
        )}
    {products && products.length > 0 && products.map((item , index) => {
      return (
         <div key={index} >
          <img src={'http://localhost:4000/' + item.pimage} width="500px" />
          <p > NAME :{item.pname}</p>
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