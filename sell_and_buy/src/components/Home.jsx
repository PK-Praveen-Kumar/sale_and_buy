import React from 'react'
import { useState , useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
const Home = () => {
   const [products , setproducts] = useState([])
   

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

  return (
    <div>

    <h1>welcome home</h1>

    <Link to="/">HOME</Link>
    {products && products.length > 0 && products.map((item , index) => {
      return (
         <div >
          <img src={'http://localhost:4000/' + item.pimage} width="500px" />
          <p > NAME :{item.pname}</p>
          <p> DESCRIPTION :{item.pdescription}</p>
          <p> PRICE :{item.pprice}</p>
          </div>
      )
    })}

    </div>
  )
}

export default Home