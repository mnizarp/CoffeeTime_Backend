import mongoose from "mongoose"
import bcrypt from 'bcryptjs'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
      type:String,
      required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'User'
    },
    
},{
    timestamps:true
  })

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        next()
    }
    if(this.password){
        const salt=await bcrypt.genSalt(10)
        this.password=await bcrypt.hash(this.password,salt)
    }
    next()    
})

userSchema.methods.matchPasswords=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
 }


export const User=mongoose.model('users',userSchema)