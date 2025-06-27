import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import {StoreContext} from "../../context/StoreContext";
import { Link } from "react-router-dom"; // Import Link from react-router-dom


const FoodItem = ({ id, name, price, description, image}) => {
  const {cartItems,addToCart,removeFromCart,url}=useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt={name} />
        {
          !cartItems?.[id]
           ?<img className="add" onClick={()=>addToCart(id)} src={assets.add_icon_white||'/fallback.png'} alt=""/>
           :<div className="food-item-counter">
            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red||'/fallback.png'} alt="" />
            <p>{cartItems[id]}</p>
            <img onClick={()=>addToCart(id)}src={assets.add_icon_green||'/fallback.png'} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
       <div className="food-item-name-rating">
  <Link to={`/food/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
    <p>{name}</p>
  </Link>
  <img src={assets.rating_starts} alt="" />
</div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{"\u20B9"}{price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
