import { createContext, useEffect } from "react";
import { food_list } from "../assets/assets";
import { useState } from "react";


export const StoreContext = createContext(null)

const StoreContextProvider=(props) => {
    const [cartItems,setCartItems]=useState({});

    const addToCart=(itemId)=>{
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }
        }
    const removeFromCart=(itemId)=>{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]-1})) 
    }
    const getTotalCartAmount=()=>{
        let total=0;
        for(let item in cartItems){
            if(cartItems[item]>0){
                let item_info=food_list.find((product)=>product._id===item);
                total+=item_info.price*cartItems[item]
            }
        }
        return total;
    }

    useEffect(()=>{
        console.log(cartItems);
    },[cartItems])   

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;