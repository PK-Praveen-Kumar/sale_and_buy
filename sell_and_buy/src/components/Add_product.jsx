import React, { useState , useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom'


const Add_product = () => {
    const navigate = useNavigate();
     useEffect(() => {
        if(!localStorage.getItem('token')){
          navigate('/login')
        }
     },[])

    const [pname , setpname] = useState('')
    const [pdescription , setpdescription] = useState('')
    const [pprice , setpprice] = useState('')
    const [pimage , setpimage] = useState('')

    const handleapi =() => {
        const formdata = new FormData();
        formdata.append("pname" , pname)
        formdata.append("pdescription" , pdescription)
        formdata.append("pprice" , pprice)
        formdata.append("pimage" , pimage)
        const url = 'http://localhost:4000/add-product'
        axios.post(url,formdata)
        .then((res) => {
                console.log(res)
        }) .catch((err) =>{
                console.log(err)
        })
    }

    
  return (
    <div>
        <div>
            <label htmlFor="pname">Product Name</label><br />
            <input type="text" name="product_name" id='pname' value={pname} onChange={(e) => {
                setpname(e.target.value)
            }} />
        </div>
        <div>
            <label htmlFor="pname">Product Description</label> <br />
            <input type="text" name="product_discription" id='pname' value={pdescription}  onChange={(e) => {
                setpdescription(e.target.value)
            }} />
        </div>
        <div>
            <label htmlFor="pname">Product Price</label><br />
            <input type="text" name="product_price" id='pname'  value={pprice}  onChange={(e) => {
                setpprice(e.target.value)
            }} />
        </div>
        <div>
            <label htmlFor="pname">Product Image</label><br />
            <input type="file" name="product_image" id='pname' onChange={ (e) => {
                setpimage(e.target.files[0])
            }}
                /> <br />
        </div>
        <div>
            <button type='submit'  onClick={handleapi}>Submit</button>
        </div>

        <div>
            <Link to="/Home">Product list</Link>
        </div>

    </div>
  )
}

export default Add_product