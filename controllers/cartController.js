import { Cart } from "../models/cartModel.js"

export const add_to_cart=async(req,res)=>{
    try {
        const {userId,productId}=req.body
        
        const oldcart=await Cart.find({user_id:userId,product_id:productId})

        if(oldcart.length!=0){
           res.status(208).json({message:'Item already in the cart'})
        }else{
            const newcart=new Cart({
                user_id:userId,
                product_id:productId,
                quantity:1
            })
            await newcart.save()
            res.status(200).json({message:'Item added to cart'})
        }
        
    } catch (error) {
        res.status(400).json({message:error})
    }
} 

export const get_cart_items=async(req,res)=>{
    try{
      const userId=req.query.userid
      const cartitems=await Cart.find({user_id:userId}).populate('product_id')
      res.status(200).json({cartitems})
    }catch(error){
        res.status(400).json({message:error})
    }

}


export const plus_quantity=async(req,res)=>{
    try{
      const {cartId}=req.body  
      await Cart.findByIdAndUpdate(cartId, { $inc: { quantity: 1 } });
      res.status(200).json({message:'cart quantity increment'})
    }catch(error){
        res.status(400).json({message:error})
    }
}

export const minus_quantity=async(req,res)=>{
    try{
      const {cartId}=req.body  
      await Cart.findByIdAndUpdate(cartId, { $inc: { quantity: -1 } });
      res.status(200).json({message:'cart quantity decrement'})
    }catch(error){
        res.status(400).json({message:error})
    }
}

export const remove_cart_item=async(req,res)=>{
    try{
        
      const {cartid}=req.params
      await Cart.findByIdAndDelete(cartid)
      res.status(200).json({message:'Cart item removed'})
    }catch(error){
        res.status(400).json({message:'Cart item removing failed'})
    }
}