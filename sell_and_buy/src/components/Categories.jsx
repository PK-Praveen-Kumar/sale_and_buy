import React from 'react'
import CategoryList from './CategoriesList'
import { useNavigate } from 'react-router-dom'
function categories(props) {
  const navigate = useNavigate()
  return (
    <div>
        {
           CategoryList && CategoryList.length > 0 && CategoryList.map((items , index) => {
            return(
                <button onClick={ () => navigate('/categorie/'+items) } key={index} > {items} </button>
            )
           })
        }
    </div>
  )
}

export default categories