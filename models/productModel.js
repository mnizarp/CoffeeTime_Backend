import mongoose from "mongoose"

const ProductSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true
    }, 
    category:{
        type:String,
        required:true
    },
    price:{
      type:Number,
      required:true
    },
    availability:{
       type:Boolean,
       default:true
    },
    description:{
      type:String,
      required:true
    },
    image:{
      type:String,
      required:true,
    },
    isDeleted:{
      type:Boolean,
      default:false
  }    
},{
  timestamps:true
})

export const Product=mongoose.model('products',ProductSchema)
