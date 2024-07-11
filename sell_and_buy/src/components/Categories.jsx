import React from 'react'
import CategoryList from './CategoriesList'
function categories(props) {
  return (
    <div>
        {
           CategoryList && CategoryList.length > 0 && CategoryList.map((items , index) => {
            return(
                <button onClick={() => { props.handleCategory(items) }} key={index} > {items } </button>
            )
           })
        }
    </div>
  )
}

export default categories