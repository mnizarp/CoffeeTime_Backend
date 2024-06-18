import { Product } from "../models/productModel.js";
import cloudinary from "../utils/cloudinary.js";

export const add_product = async (req, res) => {
    try {
      const { productname,price,category, image,description } = req.body;
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "coffeetime",
      });
      const newproduct = new Product({
        productname,
        description,
        category,
        price,
        availability:true, 
        image: uploadResponse.url,
        isDeleted: false,
      });
  
      await newproduct.save();
      res.status(200).json({ message: "product added successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "product adding failed" });
    }
  };

  export const update_product = async (req, res) => {
    try {
      const { productname,price,category, image,description,availability,productid } = req.body;
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: "coffeetime",
      });
      
      await Product.findByIdAndUpdate(productid,{ $set:{productname,description,category,price,availability,image,isDeleted:false} })

      res.status(200).json({ message: "product updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "product adding failed" });
    }
  };

  export const get_product_details=async(req,res)=>{
    try {
      const {productid}=req?.params
      const product=await Product.findById(productid)
      res.status(200).json({product})
    } catch (error) {
      res.status(400).json({message:'Product details getting failed'})
    }
  }

  export const get_products = async (req, res) => {
    try {
      const category = req.query?.category;
      if (category) {
        const allproducts = await Product.find({category,isDeleted:false}).sort({createdAt:-1})
        res.status(200).json({ allproducts });
      } else {
        const allproducts = await Product.find({isDeleted:false}).sort({createdAt:-1}) 
        res.status(200).json({ allproducts });
      }
    } catch (error) {
      res.status(400).json({message:error})
    }
  };

  export const delete_product=async(req,res)=>{
    try{
      const productid=req.params.productid
      await Product.findByIdAndUpdate(productid,{$set:{isDeleted:true}})
      res.status(200).json({message:'product deleted'})
    }catch(error){
      res.status(400).json({message:error})
    }
  }
   

  export const searchProducts = async (req, res) => {
    try {
      const searchInput = req.query?.search;
      const regex = new RegExp(searchInput , "i");

      const products = await Product.find({
        isDeleted: false,
        $or: [
          { productname: { $regex: regex } },
          { category: { $regex: regex } }
        ]
      });

      res.status(200).send(products);
    } catch (error) {
      console.log(error);
      res.status(400);
    }
  };