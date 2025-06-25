import axios from "axios"
import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider=(props) => {
    const [cartItems,setCartItems]=useState({});
    const url = import.meta.env.VITE_BACKEND_URL;
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems(prev=>({...prev,[itemId]:1}))
        }
        else{
            setCartItems(prev=>({...prev,[itemId]:prev[itemId]+1}))
        }
        if (token){
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
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

  const fetchFoodList = async () => {
    try {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    } catch (err) {
        console.error("Failed to fetch food list:", err);
    }
};


const loadCartData = async (token) => {
    try {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
    } catch (err) {
        console.error("Failed to load cart data:", err);
    }
};
 

    useEffect(() => {
    async function loadData() {
        await fetchFoodList();
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
            await loadCartData(storedToken);
        }
    }
    loadData();
}, []);


    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )

}
export default StoreContextProvider;