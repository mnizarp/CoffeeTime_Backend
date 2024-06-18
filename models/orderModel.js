import mongoose from "mongoose"

const orderSchema=new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true
    },
   product_id:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'products',
    required:true
   },
   quantity:{
     type:Number,
     required:true
   },
   total:{
     type:Number,
     required:true
   },
   status:{
     type:String,
     required:true
   },
   
},{
    timestamps:true
})

export const Order=mongoose.model('orders',orderSchema)
