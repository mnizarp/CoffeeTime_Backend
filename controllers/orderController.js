import {Cart} from '../models/cartModel.js'
import { Order } from '../models/orderModel.js'

export const create_order=async(req,res)=>{
    try {
        const {userId}=req.body
        const cartitems=await Cart.find({user_id:userId}).populate('product_id')
        cartitems?.map(async(item)=>{
            const neworder=new Order({
                user_id:item.user_id,
                product_id:item.product_id._id,
                quantity:item.quantity,
                total:item.product_id.price*item.quantity,
                status:'Pending'
            })
            await neworder.save()
        })
        await Cart.deleteMany({user_id:userId})
        res.status(200).json({message:'Order placed'})
    } catch (error) {
        res.status(400).json({message:'Order placing failed'})
    }
}


export const get_orders=async(req,res)=>{
    try {
        const {userid}=req?.query
        if(userid){
            const allorders=await Order.find({user_id:userid}).sort({createdAt:-1}).populate('product_id')
            res.status(200).json({allorders})
        }else{
            const allorders=await Order.find({}).sort({createdAt:-1}).populate('product_id').populate('user_id')
            res.status(200).json({allorders})
        }
    } catch (error) {
        res.status(400).json({message:'Orders fetching failed'})
    }
}

export const cancel_order=async(req,res)=>{
    try {
        const {orderid}=req.body
        await Order.findByIdAndUpdate(orderid,{$set:{status:'Cancelled'}})
        res.status(200).json({message:'Order cancelled'})
    } catch (error) {
        res.status(400).json({message:'Order cancel failed'})
    }
}

export const update_order_status=async(req,res)=>{
    try{
        const {orderid,newstatus}=req.body
        await Order.findByIdAndUpdate(orderid,{$set:{status:newstatus}})
        res.status(200).json({message:'Order status updated'})
    }catch(error){
        res.status(400).json({message:'Order status updated'})
    }
}

export const delete_order=async(req,res)=>{
    try {
        const {orderid}=req?.params
        await Order.findByIdAndDelete(orderid)
        res.status(200).json({message:'Order deleted'})
    } catch (error) {
        res.status(400).json({message:'Order deletion failed'})
    }
}