import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import axios from 'axios'
function ProductDetails() {
    const [products , setproducts] = useState('')
    const p = useParams()
    console.log(p)

    useEffect(() => {
        const url = 'http://localhost:4000/get-products/' + p.productId;
        axios.get(url)
            .then((res) => {
                    console.log(res)
                    if(res.data.product){
                        console.log(res.data.product)
                      setproducts(res.data.product)
                    }
            }) .catch((err) =>{
                    console.log(err)
                    alert( "server err")
            })
      },[])

      console.log(products.pname)

  return (
    <div>
        <div>ProductDetails</div>
     { products &&  
        
           <div >
            <img src={'http://localhost:4000/' + products.pimage} width="500px" />
            <p > NAME :{products.pname}</p> 
            <p > CATEGORY :{products.pcategory}</p>
            <p> DESCRIPTION :{products.pdescription}</p>
            <p> PRICE :{products.pprice}</p>
            </div>
        
      }

    </div>
    
    
  )
}

export default ProductDetails