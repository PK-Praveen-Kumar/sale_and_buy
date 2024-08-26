import React, { useState , useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';
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
     const [pcategory , setpcategory] = useState('')
     const [pdescription , setpdescription] = useState('')
    const [pprice , setpprice] = useState('')
    const [pimage , setpimage] = useState('')

    
    const options = [
        'bike' , 'Electronics' , 'cloth' , 'sale' , 'mobiles','other~'
    ];
  
    
    const handleapi =() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const formdata = new FormData();
                formdata.append('Latitude', position.coords.latitude);
                formdata.append('Longitude', position.coords.longitude);
                formdata.append("pname" , pname)
                formdata.append("pcategory", pcategory)
                formdata.append("pdescription" , pdescription)
                formdata.append("pprice" , pprice)
                formdata.append("pimage" , pimage)
                formdata.append('userId' , localStorage.getItem('userId'))
                const url = 'http://localhost:4000/add-product'
                axios.post(url,formdata)
                .then((res) => {
                    console.log(res)
                }) .catch((err) =>{
                    console.log(err)
                })
                })
            }

        
        
    console.log(localStorage.getItem('userId'))

    const onOptionChangeHandler = (event) => {
        setpcategory(event.target.value);
        console.log(
            "User Selected Value - ",
            event.target.value
        );
    };

  return (
    <div>
        <div>
            <label htmlFor="pname">Product Name</label><br />
            <input type="text" name="product_name" id='pname' value={pname} onChange={(e) => {
                setpname(e.target.value)
            }} />
        </div>
        <div>
        <select onChange={onOptionChangeHandler } >
                <option>Product category</option>
                {options.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
        </div>
        <div>
            <label htmlFor="pdesc">Product Description</label> <br />
            <input type="text" name="product_discription" id='pdesc' value={pdescription}  onChange={(e) => {
                setpdescription(e.target.value)
            }} />
        </div>
        <div>
            <label htmlFor="pprice">Product Price</label><br />
            <input type="text" name="product_price" id='pprice'  value={pprice}  onChange={(e) => {
                setpprice(e.target.value)
            }} />
        </div>
        <div>
            <label htmlFor="pimage">Product Image</label><br />
            <input type="file" name="product_image" id='pimage' onChange={ (e) => {
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