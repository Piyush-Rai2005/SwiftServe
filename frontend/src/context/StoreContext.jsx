import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null)

const StoreContextProvider=(props) => {
    const [cartItems,setCartItems]=useState({});
    const url = "http://localhost:4000";
    const [token,setToken] = useState("");
    const [food_list,setFoodList] = useState([])

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

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    // useEffect(()=>{
    //     console.log(cartItems);
    // },[cartItems])   

    useEffect(()=>{
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                // await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])

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