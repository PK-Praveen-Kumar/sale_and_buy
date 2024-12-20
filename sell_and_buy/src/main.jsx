import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.jsx'
import './index.css';
import Nav from "./components/Nav.jsx"
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import Signup from './components/Signup.jsx';
import Main_page from './components/Main_page.jsx';
// import Add_product from './components/Add_product.jsx';
import Liked_products from './components/Likedproducts.jsx';
import ProductDetails from './components/ProductDetails.jsx';
import Categoriepage from './components/Categoriepage.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/categorie/:catname" element={<Categoriepage/>} />

        <Route path="/Login" element={<Login />} />
        <Route path='/Nav' element={<Nav />} />
        <Route path='/Home' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/main_page' element={<Main_page />} />
        {/* <Route path='/Add_product' element={<Add_product /> } /> */}
        <Route path='/liked_products' element={<Liked_products /> } />
        <Route path='/Product-details/:productId' element={<ProductDetails />} />


      </Routes>
    </BrowserRouter>
    
  </React.StrictMode>,
)
