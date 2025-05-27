import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
import { Link } from 'react-router-dom'; // <-- add at the top


const FoodDisplay = ({category}) => {
    const {food_list}=useContext(StoreContext)
  
  return (
    <div className='food-display' id="food-display">
        <h2>Top Dishes near You</h2>
        <div className='food-display-list'>
          {food_list && food_list.map((item,index)=>{
            if(category==='All' || category===item.category){
             return (
  <Link to={`/food/${item._id}`} key={item._id || index} style={{ textDecoration: 'none', color: 'inherit' }}>
    <FoodItem
      id={item._id}
      name={item.name}
      price={item.price}
      description={item.description}
      image={item.image}
    />
  </Link>
);
            }
          })}
        </div>
    </div>
  )
}

export default FoodDisplay