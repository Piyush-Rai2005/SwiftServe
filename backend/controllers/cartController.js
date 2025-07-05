import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (!cartData[req.body.itemId])
        {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


// remove items from user cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
        
    }
}

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);  // ✅ use req.userId set by authMiddleware

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, cartData: user.cartData });
  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, removeFromCart, getCart };